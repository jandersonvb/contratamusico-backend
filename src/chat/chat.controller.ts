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
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Chat/Mensagens')
@Controller('conversations')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({ 
    summary: 'Listar minhas conversas',
    description: 'Retorna lista de conversas do usuário logado (cliente ou músico)' 
  })
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de conversas',
    schema: {
      example: [{
        id: 1,
        otherParty: {
          id: 5,
          name: 'João Silva',
          profileImageUrl: 'https://...',
          type: 'musician'
        },
        lastMessage: {
          content: 'Olá!',
          createdAt: '2024-01-15T10:30:00Z',
          isRead: false
        },
        lastMessageAt: '2024-01-15T10:30:00Z'
      }]
    }
  })
  @Get()
  async findAll(@Req() req: any) {
    return this.chatService.findConversations(req.user.id, req.user.userType);
  }

  @ApiOperation({ 
    summary: 'Detalhes da conversa',
    description: 'Retorna uma conversa específica com todas as mensagens' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'ID da conversa' })
  @ApiResponse({ status: 200, description: 'Detalhes da conversa' })
  @ApiResponse({ status: 404, description: 'Conversa não encontrada' })
  @ApiResponse({ status: 403, description: 'Sem permissão para acessar esta conversa' })
  @Get(':id')
  async findById(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.chatService.findConversationById(id, req.user.id, req.user.userType);
  }

  @ApiOperation({ 
    summary: 'Enviar mensagem',
    description: 'Envia uma mensagem para um músico. Cria uma nova conversa se necessário' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'musicianId', type: Number, description: 'ID do perfil do músico' })
  @ApiResponse({ status: 201, description: 'Mensagem enviada com sucesso' })
  @ApiResponse({ status: 404, description: 'Músico não encontrado' })
  @ApiResponse({ status: 400, description: 'Não pode enviar mensagem para si mesmo' })
  @Post(':musicianId/messages')
  @HttpCode(HttpStatus.CREATED)
  async sendMessage(
    @Req() req: any,
    @Param('musicianId', ParseIntPipe) musicianId: number,
    @Body() data: SendMessageDto,
  ) {
    return this.chatService.sendMessage(req.user.id, musicianId, data);
  }

  @ApiOperation({ 
    summary: 'Marcar mensagens como lidas',
    description: 'Marca todas as mensagens não lidas de uma conversa como lidas' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'ID da conversa' })
  @ApiResponse({ status: 200, description: 'Mensagens marcadas como lidas' })
  @ApiResponse({ status: 404, description: 'Conversa não encontrada' })
  @Patch(':id/read')
  @HttpCode(HttpStatus.OK)
  async markAsRead(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.chatService.markAsRead(id, req.user.id, req.user.userType);
  }

  @ApiOperation({ 
    summary: 'Contar mensagens não lidas',
    description: 'Retorna o número total de mensagens não lidas do usuário' 
  })
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Contador de não lidas',
    schema: {
      example: { count: 3 }
    }
  })
  @Get('unread/count')
  async getUnreadCount(@Req() req: any) {
    return this.chatService.getUnreadCount(req.user.id, req.user.userType);
  }
}

