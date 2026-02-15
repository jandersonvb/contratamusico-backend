import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ChatMessageType, UserType } from '@prisma/client';
import { SendMessageDto } from './dto/send-message.dto';
import { SendMediaMessageDto } from './dto/send-media-message.dto';
import { UploadService } from '../upload/upload.service';
import { ChatGateway } from './chat.gateway';

@Injectable()
export class ChatService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
    private readonly chatGateway: ChatGateway,
  ) {}

  /**
   * Listar conversas do usuário logado
   */
  async findConversations(userId: number, _userType: UserType) {
    void _userType;
    const conversations = await this.prisma.conversation.findMany({
      where: {
        OR: [{ userAId: userId }, { userBId: userId }],
      },
      include: {
        userA: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImageKey: true,
            userType: true,
          },
        },
        userB: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImageKey: true,
            userType: true,
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { lastMessageAt: 'desc' },
    });

    return Promise.all(conversations.map((conv) => this.formatConversation(conv, userId)));
  }

  /**
   * Obter detalhes de uma conversa com mensagens
   */
  async findConversationById(conversationId: number, userId: number, _userType: UserType) {
    void _userType;
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        userA: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImageKey: true,
            userType: true,
          },
        },
        userB: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImageKey: true,
            userType: true,
          },
        },
        messages: {
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
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException('Conversa não encontrada.');
    }

    if (!this.hasConversationAccess(conversation, userId)) {
      throw new ForbiddenException('Você não tem acesso a esta conversa.');
    }

    return this.formatConversationWithMessages(conversation, userId);
  }

  /**
   * Obter mensagens paginadas de uma conversa (infinite scroll)
   */
  async findMessages(
    conversationId: number,
    userId: number,
    _userType: UserType,
    cursor?: number,
    take = 50,
  ) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversa não encontrada.');
    }

    if (!this.hasConversationAccess(conversation, userId)) {
      throw new ForbiddenException('Você não tem acesso a esta conversa.');
    }

    const messages = await this.prisma.message.findMany({
      where: { conversationId },
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
      take,
      orderBy: { createdAt: 'desc' },
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

    const formattedMessages = await Promise.all(
      messages.map(async (msg) => {
        let senderImageUrl: string | undefined;
        if (msg.sender.profileImageKey) {
          try {
            senderImageUrl = await this.uploadService.getSignedUrl(msg.sender.profileImageKey);
          } catch {
            senderImageUrl = undefined;
          }
        }

        return {
          id: msg.id,
          content: msg.content,
          type: msg.type,
          media: await this.resolveMedia(msg),
          senderId: msg.senderId,
          sender: {
            id: msg.sender.id,
            name: `${msg.sender.firstName} ${msg.sender.lastName}`,
            profileImageUrl: senderImageUrl,
          },
          isRead: msg.isRead,
          isMine: msg.senderId === userId,
          createdAt: msg.createdAt,
        };
      }),
    );

    formattedMessages.reverse();

    return {
      messages: formattedMessages,
      hasMore: messages.length === take,
      nextCursor: messages.length === take ? messages[messages.length - 1].id : null,
    };
  }

  async sendMessageWithConversationSupport(senderId: number, data: SendMessageDto) {
    if (data.conversationId) {
      const conversation = await this.prisma.conversation.findUnique({
        where: { id: data.conversationId },
      });

      if (!conversation) {
        throw new NotFoundException('Conversa não encontrada.');
      }

      if (!this.hasConversationAccess(conversation, senderId)) {
        throw new ForbiddenException('Você não tem acesso a esta conversa.');
      }

      const recipientUserId = conversation.userAId === senderId ? conversation.userBId : conversation.userAId;
      return this.sendMessage(senderId, recipientUserId, data);
    }

    let recipientUserId = data.recipientUserId;

    if (!recipientUserId && data.musicianProfileId) {
      const musician = await this.prisma.musicianProfile.findUnique({
        where: { id: data.musicianProfileId },
        select: { userId: true },
      });

      if (!musician) {
        throw new NotFoundException('Perfil de músico não encontrado.');
      }

      recipientUserId = musician.userId;
    }

    if (!recipientUserId) {
      throw new BadRequestException('recipientUserId ou musicianProfileId é obrigatório.');
    }

    return this.sendMessage(senderId, recipientUserId, data);
  }

  async sendMediaMessageWithConversationSupport(
    senderId: number,
    data: SendMediaMessageDto,
    file: Express.Multer.File,
  ) {
    if (data.conversationId) {
      const conversation = await this.prisma.conversation.findUnique({
        where: { id: data.conversationId },
      });

      if (!conversation) {
        throw new NotFoundException('Conversa não encontrada.');
      }

      if (!this.hasConversationAccess(conversation, senderId)) {
        throw new ForbiddenException('Você não tem acesso a esta conversa.');
      }

      const recipientUserId = conversation.userAId === senderId ? conversation.userBId : conversation.userAId;
      return this.sendMediaMessage(senderId, recipientUserId, data, file);
    }

    let recipientUserId = data.recipientUserId;

    if (!recipientUserId && data.musicianProfileId) {
      const musician = await this.prisma.musicianProfile.findUnique({
        where: { id: data.musicianProfileId },
        select: { userId: true },
      });

      if (!musician) {
        throw new NotFoundException('Perfil de músico não encontrado.');
      }

      recipientUserId = musician.userId;
    }

    if (!recipientUserId) {
      throw new BadRequestException('recipientUserId ou musicianProfileId é obrigatório.');
    }

    return this.sendMediaMessage(senderId, recipientUserId, data, file);
  }

  /**
   * Enviar mensagem para outro usuário
   */
  async sendMessage(senderId: number, recipientUserId: number, data: SendMessageDto) {
    if (recipientUserId === senderId) {
      throw new BadRequestException('Você não pode enviar mensagens para si mesmo.');
    }

    const recipient = await this.prisma.user.findUnique({
      where: { id: recipientUserId },
      select: { id: true },
    });

    if (!recipient) {
      throw new NotFoundException('Destinatário não encontrado.');
    }

    const { userAId, userBId } = this.getOrderedParticipants(senderId, recipientUserId);

    const conversation = await this.prisma.conversation.upsert({
      where: {
        userAId_userBId: {
          userAId,
          userBId,
        },
      },
      update: {},
      create: {
        userAId,
        userBId,
      },
    });

    const message = await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId,
        content: data.content,
        type: ChatMessageType.TEXT,
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

    await this.prisma.conversation.update({
      where: { id: conversation.id },
      data: { lastMessageAt: new Date() },
    });

    const messagePayload = {
      id: message.id,
      conversationId: conversation.id,
      content: message.content,
      type: message.type,
      media: null,
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

    this.chatGateway.addUserToConversationRoom(senderId, conversation.id);
    this.chatGateway.addUserToConversationRoom(recipientUserId, conversation.id);
    this.chatGateway.emitToUser(recipientUserId, 'conversation:new', {
      conversationId: conversation.id,
    });
    this.chatGateway.emitNewMessage(messagePayload);

    return {
      message: 'Mensagem enviada com sucesso!',
      data: message,
    };
  }

  async sendMediaMessage(
    senderId: number,
    recipientUserId: number,
    data: SendMediaMessageDto,
    file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Arquivo de mídia é obrigatório.');
    }

    if (recipientUserId === senderId) {
      throw new BadRequestException('Você não pode enviar mensagens para si mesmo.');
    }

    const recipient = await this.prisma.user.findUnique({
      where: { id: recipientUserId },
      select: { id: true },
    });

    if (!recipient) {
      throw new NotFoundException('Destinatário não encontrado.');
    }

    const upload = await this.uploadService.uploadChatMedia(file, senderId);
    const { userAId, userBId } = this.getOrderedParticipants(senderId, recipientUserId);

    const conversation = await this.prisma.conversation.upsert({
      where: {
        userAId_userBId: {
          userAId,
          userBId,
        },
      },
      update: {},
      create: {
        userAId,
        userBId,
      },
    });

    const message = await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId,
        content: data.content?.trim() || '',
        type: upload.type as ChatMessageType,
        mediaKey: upload.key,
        mediaMimeType: file.mimetype,
        mediaSize: file.size,
        mediaFileName: file.originalname,
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

    await this.prisma.conversation.update({
      where: { id: conversation.id },
      data: { lastMessageAt: new Date() },
    });

    const messagePayload = {
      id: message.id,
      conversationId: conversation.id,
      content: message.content,
      type: message.type,
      media: {
        key: upload.key,
        url: upload.url,
        mimeType: message.mediaMimeType,
        size: message.mediaSize,
        fileName: message.mediaFileName,
      },
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

    this.chatGateway.addUserToConversationRoom(senderId, conversation.id);
    this.chatGateway.addUserToConversationRoom(recipientUserId, conversation.id);
    this.chatGateway.emitToUser(recipientUserId, 'conversation:new', {
      conversationId: conversation.id,
    });
    this.chatGateway.emitNewMessage(messagePayload);

    return {
      message: 'Mídia enviada com sucesso!',
      data: {
        ...message,
        mediaUrl: upload.url,
      },
    };
  }

  /**
   * Marcar mensagens como lidas
   */
  async markAsRead(conversationId: number, userId: number, _userType: UserType) {
    void _userType;
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException('Conversa não encontrada.');
    }

    if (!this.hasConversationAccess(conversation, userId)) {
      throw new ForbiddenException('Você não tem acesso a esta conversa.');
    }

    await this.prisma.message.updateMany({
      where: {
        conversationId,
        senderId: { not: userId },
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return { message: 'Mensagens marcadas como lidas.' };
  }

  /**
   * Contar mensagens não lidas
   */
  async getUnreadCount(userId: number, _userType: UserType) {
    void _userType;
    const count = await this.prisma.message.count({
      where: {
        OR: [{ conversation: { userAId: userId } }, { conversation: { userBId: userId } }],
        senderId: { not: userId },
        isRead: false,
      },
    });

    return { count };
  }

  /**
   * Formatar conversa para resposta
   */
  private async formatConversation(conversation: any, currentUserId: number) {
    const lastMessage = conversation.messages[0];
    const otherUser = conversation.userAId === currentUserId ? conversation.userB : conversation.userA;

    let profileImageUrl: string | undefined;
    if (otherUser.profileImageKey) {
      try {
        profileImageUrl = await this.uploadService.getSignedUrl(otherUser.profileImageKey);
      } catch {
        profileImageUrl = undefined;
      }
    }

    return {
      id: conversation.id,
      userAId: conversation.userAId,
      userBId: conversation.userBId,
      otherParty: {
        id: otherUser.id,
        name: `${otherUser.firstName} ${otherUser.lastName}`,
        profileImageUrl,
        type: String(otherUser.userType || '').toLowerCase() || 'user',
      },
      lastMessage: lastMessage
        ? {
            content: lastMessage.content,
            type: lastMessage.type,
            media: await this.resolveMedia(lastMessage),
            createdAt: lastMessage.createdAt,
            isRead: lastMessage.isRead,
          }
        : null,
      lastMessageAt: conversation.lastMessageAt,
      createdAt: conversation.createdAt,
    };
  }

  /**
   * Formatar conversa com mensagens para resposta
   */
  private async formatConversationWithMessages(conversation: any, currentUserId: number) {
    const otherUser = conversation.userAId === currentUserId ? conversation.userB : conversation.userA;

    let profileImageUrl: string | undefined;
    if (otherUser.profileImageKey) {
      try {
        profileImageUrl = await this.uploadService.getSignedUrl(otherUser.profileImageKey);
      } catch {
        profileImageUrl = undefined;
      }
    }

    const messages = await Promise.all(
      conversation.messages.map(async (msg: any) => {
        let senderImageUrl: string | undefined;
        if (msg.sender.profileImageKey) {
          try {
            senderImageUrl = await this.uploadService.getSignedUrl(msg.sender.profileImageKey);
          } catch {
            senderImageUrl = undefined;
          }
        }

        return {
          id: msg.id,
          content: msg.content,
          type: msg.type,
          media: await this.resolveMedia(msg),
          senderId: msg.senderId,
          sender: {
            id: msg.sender.id,
            name: `${msg.sender.firstName} ${msg.sender.lastName}`,
            profileImageUrl: senderImageUrl,
          },
          isRead: msg.isRead,
          isMine: msg.senderId === currentUserId,
          createdAt: msg.createdAt,
        };
      }),
    );

    return {
      id: conversation.id,
      userAId: conversation.userAId,
      userBId: conversation.userBId,
      otherParty: {
        id: otherUser.id,
        name: `${otherUser.firstName} ${otherUser.lastName}`,
        profileImageUrl,
        type: String(otherUser.userType || '').toLowerCase() || 'user',
      },
      messages,
      createdAt: conversation.createdAt,
    };
  }

  private hasConversationAccess(conversation: { userAId: number; userBId: number }, userId: number) {
    return conversation.userAId === userId || conversation.userBId === userId;
  }

  private getOrderedParticipants(userOneId: number, userTwoId: number) {
    return {
      userAId: Math.min(userOneId, userTwoId),
      userBId: Math.max(userOneId, userTwoId),
    };
  }

  private async resolveMedia(msg: {
    mediaKey?: string | null;
    mediaMimeType?: string | null;
    mediaSize?: number | null;
    mediaFileName?: string | null;
  }) {
    if (!msg.mediaKey) {
      return null;
    }

    let url: string | null = null;
    try {
      url = await this.uploadService.getSignedUrl(msg.mediaKey);
    } catch {
      url = null;
    }

    return {
      key: msg.mediaKey,
      url,
      mimeType: msg.mediaMimeType || null,
      size: msg.mediaSize || null,
      fileName: msg.mediaFileName || null,
    };
  }
}
