import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma, UserType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';

// Include para retornar dados completos do booking
const bookingInclude = {
  musicianProfile: {
    include: {
      user: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
        },
      },
    },
  },
  client: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
  },
} satisfies Prisma.BookingInclude;

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Criar solicitação de contratação
   */
  async create(clientId: number | null, data: CreateBookingDto) {
    // Verificar se o músico existe
    const musician = await this.prisma.musicianProfile.findUnique({
      where: { id: data.musicianProfileId },
    });

    if (!musician) {
      throw new NotFoundException('Músico não encontrado.');
    }

    // Se o usuário está logado, verificar se não é o próprio músico
    if (clientId) {
      if (musician.userId === clientId) {
        throw new BadRequestException(
          'Você não pode criar uma solicitação para si mesmo.',
        );
      }
    }

    const booking = await this.prisma.booking.create({
      data: {
        musicianProfileId: data.musicianProfileId,
        clientId,
        eventDate: new Date(data.eventDate),
        eventType: data.eventType,
        message: data.message,
        status: 'pendente',
      },
      include: bookingInclude,
    });

    return this.formatBooking(booking);
  }

  /**
   * Listar bookings do usuário logado
   */
  async findByUserId(userId: number, userType: UserType) {
    let where: Prisma.BookingWhereInput = {};

    if (userType === UserType.CLIENT) {
      // Cliente vê seus próprios bookings
      where = { clientId: userId };
    } else {
      // Músico vê bookings para ele
      const profile = await this.prisma.musicianProfile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new NotFoundException('Perfil de músico não encontrado.');
      }

      where = { musicianProfileId: profile.id };
    }

    const bookings = await this.prisma.booking.findMany({
      where,
      include: bookingInclude,
      orderBy: { createdAt: 'desc' },
    });

    return bookings.map(this.formatBooking);
  }

  /**
   * Obter detalhes de um booking
   */
  async findById(bookingId: number, userId: number, userType: UserType) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: bookingInclude,
    });

    if (!booking) {
      throw new NotFoundException('Solicitação não encontrada.');
    }

    // Verificar permissão
    const hasAccess = await this.checkAccess(booking, userId, userType);
    if (!hasAccess) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar esta solicitação.',
      );
    }

    return this.formatBooking(booking);
  }

  /**
   * Atualizar status do booking
   */
  async updateStatus(
    bookingId: number,
    userId: number,
    userType: UserType,
    data: UpdateBookingStatusDto,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: bookingInclude,
    });

    if (!booking) {
      throw new NotFoundException('Solicitação não encontrada.');
    }

    // Verificar permissão
    const hasAccess = await this.checkAccess(booking, userId, userType);
    if (!hasAccess) {
      throw new ForbiddenException(
        'Você não tem permissão para atualizar esta solicitação.',
      );
    }

    // Validar transições de status
    this.validateStatusTransition(booking.status, data.status, userType);

    const updated = await this.prisma.booking.update({
      where: { id: bookingId },
      data: { status: data.status },
      include: bookingInclude,
    });

    // Se o booking foi concluído, incrementar contador de eventos do músico
    if (data.status === 'concluido' && booking.status !== 'concluido') {
      await this.prisma.musicianProfile.update({
        where: { id: booking.musicianProfileId },
        data: {
          eventsCount: { increment: 1 },
        },
      });
    }

    return this.formatBooking(updated);
  }

  /**
   * Verificar se o usuário tem acesso ao booking
   */
  private async checkAccess(
    booking: any,
    userId: number,
    userType: UserType,
  ): Promise<boolean> {
    if (userType === UserType.CLIENT) {
      return booking.clientId === userId;
    }

    // Músico
    const profile = await this.prisma.musicianProfile.findUnique({
      where: { userId },
    });

    return profile?.id === booking.musicianProfileId;
  }

  /**
   * Validar transições de status permitidas
   */
  private validateStatusTransition(
    currentStatus: string,
    newStatus: string,
    userType: UserType,
  ) {
    const allowedTransitions: Record<string, string[]> = {
      pendente: ['negociando', 'cancelado'],
      negociando: ['confirmado', 'cancelado'],
      confirmado: ['concluido', 'cancelado'],
      concluido: [],
      cancelado: [],
    };

    if (!allowedTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(
        `Não é possível alterar o status de "${currentStatus}" para "${newStatus}".`,
      );
    }

    // Somente o músico pode confirmar ou concluir
    if (
      (newStatus === 'confirmado' || newStatus === 'concluido') &&
      userType !== UserType.MUSICIAN
    ) {
      throw new ForbiddenException(
        'Apenas o músico pode confirmar ou concluir a solicitação.',
      );
    }
  }

  /**
   * Formatar resposta do booking
   */
  private formatBooking(booking: any) {
    return {
      id: booking.id,
      eventDate: booking.eventDate,
      eventType: booking.eventType,
      message: booking.message,
      status: booking.status,
      musician: {
        id: booking.musicianProfile.id,
        name: `${booking.musicianProfile.user.firstName} ${booking.musicianProfile.user.lastName}`,
        email: booking.musicianProfile.user.email,
        phone: booking.musicianProfile.user.phone,
      },
      client: booking.client
        ? {
            id: booking.client.id,
            name: `${booking.client.firstName} ${booking.client.lastName}`,
            email: booking.client.email,
            phone: booking.client.phone,
          }
        : null,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  }
}

