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
  transports: ['websocket'],
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('ChatGateway');

  // Mapa de userId -> Set<socketId> para rastrear usuários online (suporta múltiplas abas)
  private onlineUsers = new Map<number, Set<string>>();

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) { }

  afterInit() {
    this.logger.log('Chat WebSocket Gateway inicializado');
  }

  // ─── Conexão: autenticar via JWT ───────────────────────────────
  async handleConnection(client: Socket) {
    try {
      const token = this.normalizeToken(
        client.handshake.auth?.token ||
        client.handshake.headers?.authorization ||
        client.handshake.query?.token,
      );

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
    const senderType = client.data.userType as string;
    const conversationIdFromPayload =
      data.conversationId !== undefined
        ? Number(data.conversationId)
        : undefined;
    const musicianProfileIdFromPayload =
      data.musicianProfileId !== undefined
        ? Number(data.musicianProfileId)
        : undefined;


    if (!data.content?.trim() || data.content.length > 2000) {
      return { success: false, error: 'Mensagem inválida' };
    }

    if (
      (conversationIdFromPayload !== undefined && Number.isNaN(conversationIdFromPayload)) ||
      (musicianProfileIdFromPayload !== undefined && Number.isNaN(musicianProfileIdFromPayload))
    ) {
      return { success: false, error: 'IDs inválidos no payload' };
    }

    try {
      let conversationId = conversationIdFromPayload;

      // Se não tem conversationId, buscar/criar via musicianProfileId
      if (!conversationId && musicianProfileIdFromPayload) {
        if (senderType !== 'CLIENT') {
          return { success: false, error: 'Apenas clientes podem iniciar conversa' };
        }

        const musician = await this.prisma.musicianProfile.findUnique({
          where: { id: musicianProfileIdFromPayload },
          select: { userId: true },
        });

        if (!musician || musician.userId === senderId) {
          return { success: false, error: 'Destinatário inválido' };
        }

        // Buscar ou criar conversa
        const conversation = await this.prisma.conversation.upsert({
          where: {
            clientId_musicianProfileId: {
              clientId: senderId,
              musicianProfileId: musicianProfileIdFromPayload,
            },
          },
          update: {},
          create: {
            clientId: senderId,
            musicianProfileId: musicianProfileIdFromPayload,
          },
        });

        conversationId = conversation.id;

        // Entrar na room da conversa
        client.join(`conversation:${conversationId}`);

        // O outro participante também precisa entrar na room
        const otherUserSockets = this.onlineUsers.get(musician.userId);
        if (otherUserSockets) {
          otherUserSockets.forEach(socketId => {
            this.server.in(socketId).socketsJoin(`conversation:${conversationId}`);
          });
          this.emitToUser(musician.userId, 'conversation:new', {
            conversationId,
          });
        }
      }

      if (!conversationId) {
        return { success: false, error: 'conversationId é obrigatório' };
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
        return { success: false, error: 'Sem acesso à conversa' };
      }

      const [message] = await Promise.all([
        this.prisma.message.create({
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
        }),
        this.prisma.conversation.update({
          where: { id: conversationId },
          data: { lastMessageAt: new Date() },
        }).catch(err => {
          this.logger.error(`Erro ao atualizar lastMessageAt da conversa: ${err.message}`);
          return null;
        })
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

      // Emite a nova mensagem para todos na room (inclui o outro participante)
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
    if (typeof rawToken !== 'string') return undefined;

    const token = rawToken.trim();
    if (!token) return undefined;

    return token.startsWith('Bearer ') ? token.slice(7).trim() : token;
  }

  // ─── Indicador de Digitação ───────────────────────────────────
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

  // ─── Marcar Mensagens como Lidas ──────────────────────────────
  @SubscribeMessage('message:read')
  async handleMarkAsRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversationId: number },
  ) {
    const userId = client.data.userId as number;

    if (!data.conversationId) return;

    try {
      // Verificar se o usuário pertence à conversa
      const conversation = await this.prisma.conversation.findUnique({
        where: { id: data.conversationId },
        include: { musicianProfile: { select: { userId: true } } },
      });

      if (!conversation) return;

      const hasAccess =
        conversation.clientId === userId ||
        conversation.musicianProfile.userId === userId;

      if (!hasAccess) return;

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
      include: { musicianProfile: { select: { userId: true } } },
    });

    if (!conversation) return;

    const hasAccess =
      conversation.clientId === userId ||
      conversation.musicianProfile.userId === userId;

    if (!hasAccess) return;

    client.to(`conversation:${conversationId}`).emit(event, {
      userId,
      conversationId,
    });
  }
}
