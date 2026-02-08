import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
    origin: (origin: string, callback: (err: Error | null, allow?: boolean) => void) => {
      // Permite conexões sem origin (mobile, Postman, etc)
      if (!origin) return callback(null, true);
      callback(null, true); // O CORS real é validado pelo token JWT
    },
    credentials: true,
  },
  namespace: '/chat',
  transports: ['websocket', 'polling'],
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  // Mapa de userId -> Set<socketId> para rastrear usuários online (suporta múltiplas abas)
  private onlineUsers = new Map<number, Set<string>>();

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  afterInit() {
    this.logger.log('Chat WebSocket Gateway inicializado');
  }

  // ─── Conexão: autenticar via JWT ───────────────────────────────
  async handleConnection(client: Socket) {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization?.replace('Bearer ', '');

      if (!token) {
        this.logger.warn(`Conexão rejeitada: sem token (socket: ${client.id})`);
        client.disconnect();
        return;
      }

      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = this.jwtService.verify(token, { secret });
      const userId = Number(payload.sub);

      if (isNaN(userId)) {
        client.disconnect();
        return;
      }

      // Verificar se o usuário existe
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, userType: true },
      });

      if (!user) {
        client.disconnect();
        return;
      }

      // Salvar dados no socket para uso posterior
      client.data.userId = userId;
      client.data.userType = user.userType;

      // Adicionar ao mapa de usuários online
      if (!this.onlineUsers.has(userId)) {
        this.onlineUsers.set(userId, new Set());
      }
      this.onlineUsers.get(userId).add(client.id);

      // Entrar nas "rooms" de todas as conversas do usuário
      const conversations = await this.prisma.conversation.findMany({
        where:
          user.userType === 'CLIENT'
            ? { clientId: userId }
            : { musicianProfile: { userId } },
        select: { id: true },
      });

      for (const conv of conversations) {
        client.join(`conversation:${conv.id}`);
      }

      // Notificar outros usuários que este ficou online
      client.broadcast.emit('user:online', { userId });

      this.logger.log(`Usuário ${userId} conectado (socket: ${client.id}, conversas: ${conversations.length})`);
    } catch (error) {
      this.logger.error(`Erro na autenticação WebSocket: ${error.message}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data?.userId as number;
    if (userId) {
      const sockets = this.onlineUsers.get(userId);
      if (sockets) {
        sockets.delete(client.id);
        if (sockets.size === 0) {
          this.onlineUsers.delete(userId);
          // Notificar que o usuário ficou offline
          client.broadcast.emit('user:offline', { userId });
        }
      }
      this.logger.log(`Usuário ${userId} desconectado (socket: ${client.id})`);
    }
  }

  // ─── Enviar Mensagem ──────────────────────────────────────────
  @SubscribeMessage('message:send')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      conversationId?: number;
      musicianProfileId?: number;
      content: string;
    },
  ) {
    const senderId = client.data.userId as number;

    if (!data.content?.trim()) {
      return { success: false, error: 'Mensagem não pode estar vazia' };
    }

    if (data.content.length > 2000) {
      return { success: false, error: 'Mensagem não pode ter mais de 2000 caracteres' };
    }

    try {
      let conversationId = data.conversationId;

      // Se não tem conversationId, buscar/criar via musicianProfileId
      if (!conversationId && data.musicianProfileId) {
        const musician = await this.prisma.musicianProfile.findUnique({
          where: { id: data.musicianProfileId },
          select: { id: true, userId: true },
        });

        if (!musician) {
          return { success: false, error: 'Músico não encontrado' };
        }

        if (musician.userId === senderId) {
          return { success: false, error: 'Você não pode enviar mensagens para si mesmo' };
        }

        // Buscar ou criar conversa
        let conversation = await this.prisma.conversation.findUnique({
          where: {
            clientId_musicianProfileId: {
              clientId: senderId,
              musicianProfileId: data.musicianProfileId,
            },
          },
        });

        const isNewConversation = !conversation;

        if (!conversation) {
          conversation = await this.prisma.conversation.create({
            data: {
              clientId: senderId,
              musicianProfileId: data.musicianProfileId,
            },
          });
        }

        conversationId = conversation.id;

        // Entrar na room da conversa
        client.join(`conversation:${conversationId}`);

        // O outro participante também precisa entrar na room
        const otherUserSockets = this.onlineUsers.get(musician.userId);
        if (otherUserSockets) {
          for (const socketId of otherUserSockets) {
            this.server.in(socketId).socketsJoin(`conversation:${conversationId}`);
          }
        }

        // Se é conversa nova, notificar o outro usuário
        if (isNewConversation) {
          this.emitToUser(musician.userId, 'conversation:new', {
            conversationId,
          });
        }
      }

      if (!conversationId) {
        return { success: false, error: 'conversationId ou musicianProfileId é obrigatório' };
      }

      // Verificar se o usuário pertence à conversa
      const conversation = await this.prisma.conversation.findUnique({
        where: { id: conversationId },
        include: { musicianProfile: { select: { userId: true } } },
      });

      if (!conversation) {
        return { success: false, error: 'Conversa não encontrada' };
      }

      const hasAccess =
        conversation.clientId === senderId ||
        conversation.musicianProfile.userId === senderId;

      if (!hasAccess) {
        return { success: false, error: 'Sem permissão para esta conversa' };
      }

      // Criar mensagem no banco
      const message = await this.prisma.message.create({
        data: {
          conversationId,
          senderId,
          content: data.content.trim(),
        },
        include: {
          sender: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImageKey: true,
            },
          },
        },
      });

      // Atualizar lastMessageAt da conversa
      await this.prisma.conversation.update({
        where: { id: conversationId },
        data: { lastMessageAt: new Date() },
      });

      const messagePayload = {
        id: message.id,
        conversationId,
        content: message.content,
        senderId: message.senderId,
        sender: {
          id: message.sender.id,
          firstName: message.sender.firstName,
          lastName: message.sender.lastName,
          profileImageKey: message.sender.profileImageKey,
        },
        isRead: false,
        createdAt: message.createdAt,
      };

      // Emitir para todos na room da conversa
      this.server
        .to(`conversation:${conversationId}`)
        .emit('message:new', messagePayload);

      return { success: true, data: messagePayload };
    } catch (error) {
      this.logger.error(`Erro ao enviar mensagem: ${error.message}`);
      return { success: false, error: 'Erro interno ao enviar mensagem' };
    }
  }

  // ─── Indicador de Digitação ───────────────────────────────────
  @SubscribeMessage('typing:start')
  handleTypingStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number },
  ) {
    if (!data.conversationId) return;

    client.to(`conversation:${data.conversationId}`).emit('typing:start', {
      userId: client.data.userId,
      conversationId: data.conversationId,
    });
  }

  @SubscribeMessage('typing:stop')
  handleTypingStop(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number },
  ) {
    if (!data.conversationId) return;

    client.to(`conversation:${data.conversationId}`).emit('typing:stop', {
      userId: client.data.userId,
      conversationId: data.conversationId,
    });
  }

  // ─── Marcar Mensagens como Lidas ──────────────────────────────
  @SubscribeMessage('message:read')
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number },
  ) {
    const userId = client.data.userId as number;

    if (!data.conversationId) return;

    try {
      // Marcar mensagens não lidas (enviadas pelo outro usuário) como lidas
      const result = await this.prisma.message.updateMany({
        where: {
          conversationId: data.conversationId,
          senderId: { not: userId },
          isRead: false,
        },
        data: { isRead: true },
      });

      // Se alguma mensagem foi marcada, notificar o remetente
      if (result.count > 0) {
        client.to(`conversation:${data.conversationId}`).emit('message:read', {
          conversationId: data.conversationId,
          readBy: userId,
        });
      }
    } catch (error) {
      this.logger.error(`Erro ao marcar como lido: ${error.message}`);
    }
  }

  // ─── Entrar em uma Conversa (room) ────────────────────────────
  @SubscribeMessage('conversation:join')
  async handleJoinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number },
  ) {
    if (!data.conversationId) return;

    const userId = client.data.userId as number;

    // Verificar se o usuário pertence à conversa
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: data.conversationId },
      include: { musicianProfile: { select: { userId: true } } },
    });

    if (!conversation) return;

    const hasAccess =
      conversation.clientId === userId ||
      conversation.musicianProfile.userId === userId;

    if (hasAccess) {
      client.join(`conversation:${data.conversationId}`);
    }
  }

  // ─── Verificar Usuários Online ────────────────────────────────
  @SubscribeMessage('users:online')
  handleGetOnlineUsers(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { userIds: number[] },
  ) {
    if (!data.userIds?.length) return;

    const onlineStatus = data.userIds.map((id) => ({
      userId: id,
      isOnline: this.onlineUsers.has(id),
    }));

    client.emit('users:online', onlineStatus);
  }

  // ─── Utilitário: emitir para um usuário específico ────────────
  private emitToUser(userId: number, event: string, payload: any) {
    const sockets = this.onlineUsers.get(userId);
    if (sockets) {
      for (const socketId of sockets) {
        this.server.to(socketId).emit(event, payload);
      }
    }
  }
}
