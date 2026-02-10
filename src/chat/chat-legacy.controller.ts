import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
