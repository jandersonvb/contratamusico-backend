import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Req,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Avaliações')
@Controller('musicians/:musicianId/reviews')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ 
    summary: 'Criar avaliação',
    description: 'Cria uma avaliação para um músico. Apenas clientes autenticados podem avaliar' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'musicianId', type: Number, description: 'ID do músico' })
  @ApiResponse({ status: 201, description: 'Avaliação criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req: any,
    @Param('musicianId', ParseIntPipe) musicianId: number,
    @Body() data: CreateReviewDto,
  ) {
    return this.reviewService.create(req.user.id, musicianId, data);
  }

  @ApiOperation({ 
    summary: 'Listar avaliações de um músico',
    description: 'Retorna lista paginada de avaliações de um músico específico' 
  })
  @ApiParam({ name: 'musicianId', type: Number, description: 'ID do músico' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Página (padrão: 1)' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Itens por página (padrão: 10)' })
  @ApiResponse({ status: 200, description: 'Lista de avaliações' })
  @Get()
  async findAll(
    @Param('musicianId', ParseIntPipe) musicianId: number,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedPage = page ? parseInt(page, 10) : 1;
    const parsedLimit = limit ? parseInt(limit, 10) : 10;
    return this.reviewService.findByMusicianId(
      musicianId,
      parsedPage,
      parsedLimit,
    );
  }

  @ApiOperation({ 
    summary: 'Estatísticas de avaliações',
    description: 'Retorna estatísticas de avaliações de um músico (média, total, distribuição)' 
  })
  @ApiParam({ name: 'musicianId', type: Number, description: 'ID do músico' })
  @ApiResponse({ status: 200, description: 'Estatísticas das avaliações' })
  @Get('stats')
  async getStats(@Param('musicianId', ParseIntPipe) musicianId: number) {
    return this.reviewService.getStats(musicianId);
  }
}

