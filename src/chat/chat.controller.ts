import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Patch,
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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
import { SendMediaMessageDto } from './dto/send-media-message.dto';
import { StartConversationDto } from './dto/start-conversation.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Chat/Mensagens')
@Controller('conversations')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({
    summary: 'Listar minhas conversas',
    description: 'Retorna lista de conversas do usuário logado (cliente ou músico)',
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
          type: 'musician',
        },
        lastMessage: {
          content: 'Olá!',
          createdAt: '2024-01-15T10:30:00Z',
          isRead: false,
        },
        lastMessageAt: '2024-01-15T10:30:00Z',
      }],
    },
  })
  @Get()
  async findAll(@Req() req: any) {
    return this.chatService.findConversations(req.user.id, req.user.userType);
  }

  @ApiOperation({
    summary: 'Contar mensagens não lidas',
    description: 'Retorna o número total de mensagens não lidas do usuário',
  })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Contador de não lidas',
    schema: {
      example: { count: 3 },
    },
  })
  @Get('unread/count')
  async getUnreadCount(@Req() req: any) {
    return this.chatService.getUnreadCount(req.user.id, req.user.userType);
  }

  @ApiOperation({
    summary: 'Iniciar conversa sem mensagem',
    description: 'Cria (ou recupera) a conversa entre usuário logado e destinatário sem enviar mensagem automática.',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Conversa iniciada com sucesso' })
  @Post('start')
  @HttpCode(HttpStatus.CREATED)
  async startConversation(@Req() req: any, @Body() data: StartConversationDto) {
    return this.chatService.startConversation(req.user.id, data);
  }

  @ApiOperation({
    summary: 'Enviar mensagem',
    description: 'Envia uma mensagem para qualquer usuário (CLIENT ou MUSICIAN). Cria uma nova conversa se necessário',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'recipientUserId', type: Number, description: 'ID do usuário destinatário' })
  @ApiResponse({ status: 201, description: 'Mensagem enviada com sucesso' })
  @ApiResponse({ status: 404, description: 'Destinatário não encontrado' })
  @ApiResponse({ status: 400, description: 'Não pode enviar mensagem para si mesmo' })
  @Post(':recipientUserId/messages')
  @HttpCode(HttpStatus.CREATED)
  async sendMessage(
    @Req() req: any,
    @Param('recipientUserId', ParseIntPipe) recipientUserId: number,
    @Body() data: SendMessageDto,
  ) {
    return this.chatService.sendMessage(req.user.id, recipientUserId, data);
  }

  @ApiOperation({
    summary: 'Enviar mídia',
    description: 'Envia imagem, vídeo ou áudio para um usuário. Aceita legenda opcional no campo content.',
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo de mídia (imagem, vídeo ou áudio)',
        },
        content: {
          type: 'string',
          description: 'Legenda opcional',
        },
      },
    },
  })
  @ApiParam({ name: 'recipientUserId', type: Number, description: 'ID do usuário destinatário' })
  @ApiResponse({ status: 201, description: 'Mídia enviada com sucesso' })
  @Post(':recipientUserId/media')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async sendMediaMessage(
    @Req() req: any,
    @Param('recipientUserId', ParseIntPipe) recipientUserId: number,
    @Body() data: SendMediaMessageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo de mídia é obrigatório.');
    }

    return this.chatService.sendMediaMessage(req.user.id, recipientUserId, data, file);
  }

  @ApiOperation({
    summary: 'Mensagens paginadas',
    description:
      'Retorna mensagens de uma conversa com paginação por cursor (infinite scroll). Envie o cursor para carregar mensagens mais antigas.',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'ID da conversa' })
  @ApiQuery({ name: 'cursor', required: false, type: Number, description: 'ID da mensagem mais antiga carregada (para paginação)' })
  @ApiQuery({ name: 'take', required: false, type: Number, description: 'Quantidade de mensagens (padrão: 50)' })
  @ApiResponse({
    status: 200,
    description: 'Mensagens paginadas',
    schema: {
      example: {
        messages: [{ id: 1, content: 'Olá!', senderId: 1, isRead: true, createdAt: '2024-01-15T10:30:00Z' }],
        hasMore: true,
        nextCursor: 1,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Conversa não encontrada' })
  @ApiResponse({ status: 403, description: 'Sem permissão' })
  @Get(':id/messages')
  async findMessages(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Query('cursor') cursor?: number,
    @Query('take') take?: number,
  ) {
    return this.chatService.findMessages(
      id,
      req.user.id,
      req.user.userType,
      cursor ? Number(cursor) : undefined,
      take ? Number(take) : 50,
    );
  }

  @ApiOperation({
    summary: 'Detalhes da conversa',
    description: 'Retorna uma conversa específica com todas as mensagens',
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
    summary: 'Marcar mensagens como lidas',
    description: 'Marca todas as mensagens não lidas de uma conversa como lidas',
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
}
