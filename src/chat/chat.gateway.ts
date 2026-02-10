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
      if (!origin) return callback(null, true);
      callback(null, true);
    },
    credentials: true,
  },
  namespace: '/chat',
  transports: ['websocket'],
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');
  private onlineUsers = new Map<number, Set<string>>();

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  afterInit() {
    this.logger.log('Chat WebSocket Gateway inicializado');
  }

  async handleConnection(client: Socket) {
    try {
      const token = this.extractHandshakeToken(client);

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

      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, userType: true },
      });

      if (!user) {
        client.disconnect();
        return;
      }

      client.data.userId = userId;
      client.data.userType = user.userType;

      if (!this.onlineUsers.has(userId)) {
        this.onlineUsers.set(userId, new Set());
      }
      this.onlineUsers.get(userId)!.add(client.id);

      const conversations = await this.prisma.conversation.findMany({
        where: {
          OR: [{ userAId: userId }, { userBId: userId }],
        },
        select: { id: true },
      });

      for (const conv of conversations) {
        client.join(`conversation:${conv.id}`);
      }

      client.broadcast.emit('user:online', { userId });
      this.logger.log(`Usuário ${userId} conectado (socket: ${client.id}, conversas: ${conversations.length})`);
    } catch (error) {
      this.logger.error(`Erro na autenticação WebSocket: ${error.message}`);
      client.disconnect();
    }
  }

  private extractHandshakeToken(client: Socket): string | undefined {
    const handshake = client.handshake;

    return this.normalizeToken(
      handshake.auth?.token ||
        handshake.auth?.accessToken ||
        handshake.auth?.access_token ||
        handshake.headers?.authorization ||
        handshake.headers?.Authorization ||
        handshake.headers?.['x-access-token'] ||
        handshake.query?.token ||
        handshake.query?.accessToken ||
        handshake.query?.access_token,
    );
  }

  handleDisconnect(client: Socket) {
    const userId = client.data?.userId as number;
    if (userId) {
      const sockets = this.onlineUsers.get(userId);
      if (sockets) {
        sockets.delete(client.id);
        if (sockets.size === 0) {
          this.onlineUsers.delete(userId);
          client.broadcast.emit('user:offline', { userId });
        }
      }
      this.logger.log(`Usuário ${userId} desconectado (socket: ${client.id})`);
    }
  }

  @SubscribeMessage('message:send')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      conversationId?: number;
      recipientUserId?: number;
      musicianProfileId?: number;
      content: string;
    },
  ) {
    const senderId = client.data.userId as number;
    const conversationIdFromPayload = data.conversationId !== undefined ? Number(data.conversationId) : undefined;
    const recipientUserIdFromPayload = data.recipientUserId !== undefined ? Number(data.recipientUserId) : undefined;
    const musicianProfileIdFromPayload = data.musicianProfileId !== undefined ? Number(data.musicianProfileId) : undefined;

    if (!data.content?.trim() || data.content.length > 2000) {
      return { success: false, error: 'Mensagem inválida' };
    }

    if (
      (conversationIdFromPayload !== undefined && Number.isNaN(conversationIdFromPayload)) ||
      (recipientUserIdFromPayload !== undefined && Number.isNaN(recipientUserIdFromPayload)) ||
      (musicianProfileIdFromPayload !== undefined && Number.isNaN(musicianProfileIdFromPayload))
    ) {
      return { success: false, error: 'IDs inválidos no payload' };
    }

    try {
      let conversationId = conversationIdFromPayload;

      if (!conversationId) {
        let recipientUserId = recipientUserIdFromPayload;

        if (!recipientUserId && musicianProfileIdFromPayload) {
          const musician = await this.prisma.musicianProfile.findUnique({
            where: { id: musicianProfileIdFromPayload },
            select: { userId: true },
          });

          if (!musician) {
            return { success: false, error: 'Destinatário inválido' };
          }

          recipientUserId = musician.userId;
        }

        if (!recipientUserId) {
          return { success: false, error: 'recipientUserId ou conversationId é obrigatório' };
        }

        if (recipientUserId === senderId) {
          return { success: false, error: 'Você não pode enviar mensagens para si mesmo' };
        }

        const recipient = await this.prisma.user.findUnique({
          where: { id: recipientUserId },
          select: { id: true },
        });

        if (!recipient) {
          return { success: false, error: 'Destinatário inválido' };
        }

        const participants = this.getOrderedParticipants(senderId, recipientUserId);

        const conversation = await this.prisma.conversation.upsert({
          where: {
            userAId_userBId: {
              userAId: participants.userAId,
              userBId: participants.userBId,
            },
          },
          update: {},
          create: {
            userAId: participants.userAId,
            userBId: participants.userBId,
          },
        });

        conversationId = conversation.id;

        client.join(`conversation:${conversationId}`);
        const otherUserSockets = this.onlineUsers.get(recipientUserId);
        if (otherUserSockets) {
          otherUserSockets.forEach(socketId => {
            this.server.in(socketId).socketsJoin(`conversation:${conversationId}`);
          });
          this.emitToUser(recipientUserId, 'conversation:new', {
            conversationId,
          });
        }
      }

      if (!conversationId) {
        return { success: false, error: 'conversationId é obrigatório' };
      }

      const conversation = await this.prisma.conversation.findUnique({
        where: { id: conversationId },
      });

      if (!conversation) {
        return { success: false, error: 'Conversa não encontrada' };
      }

      const hasAccess = conversation.userAId === senderId || conversation.userBId === senderId;

      if (!hasAccess) {
        return { success: false, error: 'Sem acesso à conversa' };
      }

      const [message] = await Promise.all([
        this.prisma.message.create({
          data: {
            conversationId,
            senderId,
            content: data.content,
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
        }),
        this.prisma.conversation.update({
          where: { id: conversationId },
          data: { lastMessageAt: new Date() },
        }),
      ]);

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

      this.server.to(`conversation:${conversationId}`).emit('message:new', messagePayload);
      this.server.to(`conversation:${conversationId}`).emit('conversation:updated', {
        conversationId,
        lastMessageAt: message.createdAt,
      });

      return { success: true, data: messagePayload };
    } catch (error) {
      this.logger.error(`Erro ao enviar mensagem: ${error.message}`);
      return { success: false, error: 'Erro interno ao enviar mensagem' };
    }
  }

  private normalizeToken(rawToken: unknown): string | undefined {
    const value = Array.isArray(rawToken) ? rawToken[0] : rawToken;

    if (typeof value !== 'string') return undefined;

    const token = value.trim();
    if (!token) return undefined;

    return token.startsWith('Bearer ') ? token.slice(7).trim() : token;
  }

  @SubscribeMessage('typing:start')
  handleTypingStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number },
  ) {
    if (!data.conversationId) return;

    void this.emitTypingIfAllowed(client, data.conversationId, 'typing:start');
  }

  @SubscribeMessage('typing:stop')
  handleTypingStop(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number },
  ) {
    if (!data.conversationId) return;

    void this.emitTypingIfAllowed(client, data.conversationId, 'typing:stop');
  }

  @SubscribeMessage('message:read')
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number },
  ) {
    const userId = client.data.userId as number;

    if (!data.conversationId) return;

    try {
      const conversation = await this.prisma.conversation.findUnique({
        where: { id: data.conversationId },
      });

      if (!conversation) return;

      const hasAccess = conversation.userAId === userId || conversation.userBId === userId;

      if (!hasAccess) return;

      const result = await this.prisma.message.updateMany({
        where: {
          conversationId: data.conversationId,
          senderId: { not: userId },
          isRead: false,
        },
        data: { isRead: true },
      });

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

  @SubscribeMessage('conversation:join')
  async handleJoinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number },
  ) {
    if (!data.conversationId) return;

    const userId = client.data.userId as number;

    const conversation = await this.prisma.conversation.findUnique({
      where: { id: data.conversationId },
    });

    if (!conversation) return;

    const hasAccess = conversation.userAId === userId || conversation.userBId === userId;

    if (hasAccess) {
      client.join(`conversation:${data.conversationId}`);
    }
  }

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

  emitToUser(userId: number, event: string, payload: any) {
    const sockets = this.onlineUsers.get(userId);
    if (sockets) {
      for (const socketId of sockets) {
        this.server.to(socketId).emit(event, payload);
      }
    }
  }

  addUserToConversationRoom(userId: number, conversationId: number) {
    const sockets = this.onlineUsers.get(userId);
    if (!sockets) return;

    for (const socketId of sockets) {
      this.server.in(socketId).socketsJoin(`conversation:${conversationId}`);
    }
  }

  emitNewMessage(messagePayload: {
    id: number;
    conversationId: number;
    content: string;
    senderId: number;
    sender: {
      id: number;
      firstName: string;
      lastName: string;
      profileImageKey: string | null;
    };
    isRead: boolean;
    createdAt: Date;
  }) {
    this.server
      .to(`conversation:${messagePayload.conversationId}`)
      .emit('message:new', messagePayload);

    this.server
      .to(`conversation:${messagePayload.conversationId}`)
      .emit('conversation:updated', {
        conversationId: messagePayload.conversationId,
        lastMessageAt: messagePayload.createdAt,
      });
  }

  private async emitTypingIfAllowed(
    client: Socket,
    conversationId: number,
    event: 'typing:start' | 'typing:stop',
  ) {
    const userId = client.data.userId as number;

    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) return;

    const hasAccess = conversation.userAId === userId || conversation.userBId === userId;

    if (!hasAccess) return;

    client.to(`conversation:${conversationId}`).emit(event, {
      userId,
      conversationId,
    });
  }

  private getOrderedParticipants(userOneId: number, userTwoId: number) {
    return {
      userAId: Math.min(userOneId, userTwoId),
      userBId: Math.max(userOneId, userTwoId),
    };
  }
}
