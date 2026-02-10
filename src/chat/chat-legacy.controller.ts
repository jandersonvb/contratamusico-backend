import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';

@ApiTags('Chat/Mensagens (legado)')
@Controller('chat')
@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class ChatLegacyController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({
    summary: 'Listar conversas (legado)',
    description: 'Compatibilidade para clientes que ainda usam GET /chat/conversations',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lista de conversas' })
  @Get('conversations')
  async findConversations(@Req() req: any) {
    return this.chatService.findConversations(req.user.id, req.user.userType);
  }

  @ApiOperation({
    summary: 'Detalhes da conversa (legado)',
    description: 'Compatibilidade para clientes que ainda usam GET /chat/conversations/:id',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'ID da conversa' })
  @ApiResponse({ status: 200, description: 'Detalhes da conversa' })
  @Get('conversations/:id')
  async findConversationById(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.chatService.findConversationById(id, req.user.id, req.user.userType);
  }

  @ApiOperation({
    summary: 'Mensagens da conversa (legado)',
    description: 'Compatibilidade para clientes que ainda usam GET /chat/conversations/:id/messages',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'ID da conversa' })
  @ApiQuery({ name: 'cursor', required: false, type: Number, description: 'Cursor de paginação' })
  @ApiQuery({ name: 'take', required: false, type: Number, description: 'Quantidade de mensagens' })
  @ApiResponse({ status: 200, description: 'Mensagens paginadas' })
  @Get('conversations/:id/messages')
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
    summary: 'Marcar mensagens como lidas (legado)',
    description: 'Compatibilidade para clientes que ainda usam PATCH /chat/conversations/:id/read',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'ID da conversa' })
  @ApiResponse({ status: 200, description: 'Mensagens marcadas como lidas' })
  @Patch('conversations/:id/read')
  @HttpCode(HttpStatus.OK)
  async markConversationAsRead(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.chatService.markAsRead(id, req.user.id, req.user.userType);
  }

  @ApiOperation({
    summary: 'Contador de não lidas por conversa (legado)',
    description: 'Compatibilidade para clientes que usam GET /chat/conversations/unread/count',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Total de mensagens não lidas' })
  @Get('conversations/unread/count')
  async unreadCountByConversations(@Req() req: any) {
    return this.chatService.getUnreadCount(req.user.id, req.user.userType);
  }

  @ApiOperation({
    summary: 'Enviar mensagem para usuário (legado)',
    description: 'Compatibilidade para clientes que ainda usam POST /chat/conversations/:recipientUserId/messages',
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'recipientUserId', type: Number, description: 'ID do usuário destinatário' })
  @ApiResponse({ status: 201, description: 'Mensagem enviada com sucesso' })
  @Post('conversations/:recipientUserId/messages')
  @HttpCode(HttpStatus.CREATED)
  async sendMessageToRecipient(
    @Req() req: any,
    @Param('recipientUserId', ParseIntPipe) recipientUserId: number,
    @Body() data: SendMessageDto,
  ) {
    return this.chatService.sendMessage(req.user.id, recipientUserId, data);
  }

  @ApiOperation({
    summary: 'Enviar mensagem (legado)',
    description: 'Compatibilidade para clientes que ainda usam POST /chat/messages',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Mensagem enviada com sucesso' })
  @Post('messages')
  @HttpCode(HttpStatus.CREATED)
  async sendMessage(@Req() req: any, @Body() data: SendMessageDto) {
    return this.chatService.sendMessageWithConversationSupport(req.user.id, data);
  }

  @ApiOperation({
    summary: 'Contador de não lidas (legado)',
    description: 'Compatibilidade para clientes que usam GET /chat/messages/unread-count',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Total de mensagens não lidas' })
  @Get('messages/unread-count')
  async unreadCount(@Req() req: any) {
    return this.chatService.getUnreadCount(req.user.id, req.user.userType);
  }

  @ApiOperation({
    summary: 'Marcar como lida (legado)',
    description: 'Compatibilidade para clientes que usam PATCH /chat/messages/read',
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Mensagens marcadas como lidas' })
  @Patch('messages/read')
  @HttpCode(HttpStatus.OK)
  async markAsRead(
    @Req() req: any,
    @Query('conversationId') conversationId?: string,
  ) {
    if (!conversationId || Number.isNaN(Number(conversationId))) {
      throw new BadRequestException('conversationId válido é obrigatório para marcar mensagens como lidas.');
    }

    return this.chatService.markAsRead(Number(conversationId), req.user.id, req.user.userType);
  }
}
