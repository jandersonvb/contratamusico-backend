import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Req,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Agendamentos')
@Controller('bookings')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ 
    summary: 'Criar solicitação de contratação',
    description: 'Cria uma nova solicitação de contratação para um músico. Pode ser usado por usuários autenticados ou não' 
  })
  @ApiResponse({ status: 201, description: 'Solicitação criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: any, @Body() data: CreateBookingDto) {
    // Se tiver usuário autenticado, usa o ID dele
    const clientId = req.user?.id || null;
    return this.bookingService.create(clientId, data);
  }

  @ApiOperation({ 
    summary: 'Listar meus agendamentos',
    description: 'Retorna lista de agendamentos do usuário logado (músico vê solicitações recebidas, cliente vê enviadas)' 
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lista de agendamentos' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req: any) {
    return this.bookingService.findByUserId(req.user.id, req.user.userType);
  }

  @ApiOperation({ 
    summary: 'Obter detalhes de um agendamento',
    description: 'Retorna detalhes completos de um agendamento específico' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'ID do agendamento' })
  @ApiResponse({ status: 200, description: 'Detalhes do agendamento' })
  @ApiResponse({ status: 404, description: 'Agendamento não encontrado' })
  @ApiResponse({ status: 403, description: 'Sem permissão para acessar este agendamento' })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findById(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    return this.bookingService.findById(id, req.user.id, req.user.userType);
  }

  @ApiOperation({ 
    summary: 'Atualizar status do agendamento',
    description: 'Atualiza o status de um agendamento (pendente, confirmado, cancelado, etc.)' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'ID do agendamento' })
  @ApiResponse({ status: 200, description: 'Status atualizado com sucesso' })
  @ApiResponse({ status: 403, description: 'Sem permissão para atualizar este agendamento' })
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateStatus(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBookingStatusDto,
  ) {
    return this.bookingService.updateStatus(
      id,
      req.user.id,
      req.user.userType,
      data,
    );
  }
}

