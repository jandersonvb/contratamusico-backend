import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserType } from '@prisma/client';
import { SendMessageDto } from './dto/send-message.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Listar conversas do usuário logado
   */
  async findConversations(userId: number, userType: UserType) {
    const where = userType === UserType.CLIENT
      ? { clientId: userId }
      : { musicianProfile: { userId } };

    const conversations = await this.prisma.conversation.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImageUrl: true,
          },
        },
        musicianProfile: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImageUrl: true,
              },
            },
          },
        },
        messages: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { lastMessageAt: 'desc' },
    });

    return conversations.map(conv => this.formatConversation(conv, userId));
  }

  /**
   * Obter detalhes de uma conversa com mensagens
   */
  async findConversationById(conversationId: number, userId: number, userType: UserType) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        client: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImageUrl: true,
          },
        },
        musicianProfile: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImageUrl: true,
              },
            },
          },
        },
        messages: {
          include: {
            sender: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImageUrl: true,
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

    // Verificar permissão
    const hasAccess = userType === UserType.CLIENT
      ? conversation.clientId === userId
      : conversation.musicianProfile.userId === userId;

    if (!hasAccess) {
      throw new ForbiddenException('Você não tem acesso a esta conversa.');
    }

    return this.formatConversationWithMessages(conversation, userId);
  }

  /**
   * Enviar mensagem para um músico
   */
  async sendMessage(
    senderId: number,
    musicianProfileId: number,
    data: SendMessageDto,
  ) {
    // Verificar se o músico existe
    const musician = await this.prisma.musicianProfile.findUnique({
      where: { id: musicianProfileId },
      include: { user: true },
    });

    if (!musician) {
      throw new NotFoundException('Músico não encontrado.');
    }

    // Não pode enviar mensagem para si mesmo
    if (musician.userId === senderId) {
      throw new BadRequestException('Você não pode enviar mensagens para si mesmo.');
    }

    // Buscar ou criar conversa
    let conversation = await this.prisma.conversation.findUnique({
      where: {
        clientId_musicianProfileId: {
          clientId: senderId,
          musicianProfileId,
        },
      },
    });

    if (!conversation) {
      conversation = await this.prisma.conversation.create({
        data: {
          clientId: senderId,
          musicianProfileId,
        },
      });
    }

    // Criar mensagem
    const message = await this.prisma.message.create({
      data: {
        conversationId: conversation.id,
        senderId,
        content: data.content,
      },
      include: {
        sender: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImageUrl: true,
          },
        },
      },
    });

    // Atualizar lastMessageAt da conversa
    await this.prisma.conversation.update({
      where: { id: conversation.id },
      data: { lastMessageAt: new Date() },
    });

    return {
      message: 'Mensagem enviada com sucesso!',
      data: message,
    };
  }

  /**
   * Marcar mensagens como lidas
   */
  async markAsRead(conversationId: number, userId: number, userType: UserType) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { musicianProfile: true },
    });

    if (!conversation) {
      throw new NotFoundException('Conversa não encontrada.');
    }

    // Verificar permissão
    const hasAccess = userType === UserType.CLIENT
      ? conversation.clientId === userId
      : conversation.musicianProfile.userId === userId;

    if (!hasAccess) {
      throw new ForbiddenException('Você não tem acesso a esta conversa.');
    }

    // Marcar mensagens não lidas (que não foram enviadas pelo usuário) como lidas
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
  async getUnreadCount(userId: number, userType: UserType) {
    const where = userType === UserType.CLIENT
      ? { conversation: { clientId: userId } }
      : { conversation: { musicianProfile: { userId } } };

    const count = await this.prisma.message.count({
      where: {
        ...where,
        senderId: { not: userId },
        isRead: false,
      },
    });

    return { count };
  }

  /**
   * Formatar conversa para resposta
   */
  private formatConversation(conversation: any, currentUserId: number) {
    const lastMessage = conversation.messages[0];
    const otherParty = conversation.clientId === currentUserId
      ? {
          id: conversation.musicianProfile.user.id,
          name: `${conversation.musicianProfile.user.firstName} ${conversation.musicianProfile.user.lastName}`,
          profileImageUrl: conversation.musicianProfile.user.profileImageUrl,
          type: 'musician',
        }
      : {
          id: conversation.client.id,
          name: `${conversation.client.firstName} ${conversation.client.lastName}`,
          profileImageUrl: conversation.client.profileImageUrl,
          type: 'client',
        };

    return {
      id: conversation.id,
      otherParty,
      lastMessage: lastMessage ? {
        content: lastMessage.content,
        createdAt: lastMessage.createdAt,
        isRead: lastMessage.isRead,
      } : null,
      lastMessageAt: conversation.lastMessageAt,
      createdAt: conversation.createdAt,
    };
  }

  /**
   * Formatar conversa com mensagens para resposta
   */
  private formatConversationWithMessages(conversation: any, currentUserId: number) {
    const otherParty = conversation.clientId === currentUserId
      ? {
          id: conversation.musicianProfile.user.id,
          name: `${conversation.musicianProfile.user.firstName} ${conversation.musicianProfile.user.lastName}`,
          profileImageUrl: conversation.musicianProfile.user.profileImageUrl,
          type: 'musician',
        }
      : {
          id: conversation.client.id,
          name: `${conversation.client.firstName} ${conversation.client.lastName}`,
          profileImageUrl: conversation.client.profileImageUrl,
          type: 'client',
        };

    return {
      id: conversation.id,
      otherParty,
      messages: conversation.messages.map((msg: any) => ({
        id: msg.id,
        content: msg.content,
        senderId: msg.senderId,
        sender: {
          id: msg.sender.id,
          name: `${msg.sender.firstName} ${msg.sender.lastName}`,
          profileImageUrl: msg.sender.profileImageUrl,
        },
        isRead: msg.isRead,
        isMine: msg.senderId === currentUserId,
        createdAt: msg.createdAt,
      })),
      createdAt: conversation.createdAt,
    };
  }
}

