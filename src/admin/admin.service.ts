import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Dashboard com métricas gerais
   */
  async getDashboard() {
    const [
      totalUsers,
      totalMusicians,
      totalClients,
      totalBookings,
      activeSubscriptions,
      totalRevenue,
      recentSignups,
      recentBookings,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({ where: { userType: 'MUSICIAN' } }),
      this.prisma.user.count({ where: { userType: 'CLIENT' } }),
      this.prisma.booking.count(),
      this.prisma.subscription.count({ where: { status: 'active' } }),
      this.getTotalRevenue(),
      this.prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          userType: true,
          createdAt: true,
        },
      }),
      this.prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          client: {
            select: { firstName: true, lastName: true },
          },
          musicianProfile: {
            include: {
              user: {
                select: { firstName: true, lastName: true },
              },
            },
          },
        },
      }),
    ]);

    return {
      totalUsers,
      totalMusicians,
      totalClients,
      totalBookings,
      activeSubscriptions,
      monthlyRevenue: totalRevenue,
      recentSignups,
      recentBookings: recentBookings.map(b => ({
        id: b.id,
        client: `${b.client?.firstName || 'Anônimo'} ${b.client?.lastName || ''}`,
        musician: `${b.musicianProfile.user.firstName} ${b.musicianProfile.user.lastName}`,
        eventType: b.eventType,
        eventDate: b.eventDate,
        status: b.status,
        createdAt: b.createdAt,
      })),
    };
  }

  /**
   * Listar usuários com paginação
   */
  async getUsers(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          userType: true,
          role: true,
          city: true,
          state: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      data: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Listar músicos com paginação
   */
  async getMusicians(page: number = 1, limit: number = 20) {
    const skip = (page - 1) * limit;

    const [musicians, total] = await Promise.all([
      this.prisma.musicianProfile.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              city: true,
              state: true,
            },
          },
        },
      }),
      this.prisma.musicianProfile.count(),
    ]);

    return {
      data: musicians.map(m => ({
        id: m.id,
        userId: m.userId,
        name: `${m.user.firstName} ${m.user.lastName}`,
        email: m.user.email,
        category: m.category,
        location: `${m.user.city}, ${m.user.state}`,
        rating: m.rating,
        ratingCount: m.ratingCount,
        eventsCount: m.eventsCount,
        isFeatured: m.isFeatured,
        createdAt: m.createdAt,
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Destacar/remover destaque de músico
   */
  async toggleFeaturedMusician(musicianId: number) {
    const musician = await this.prisma.musicianProfile.findUnique({
      where: { id: musicianId },
    });

    if (!musician) {
      throw new Error('Músico não encontrado');
    }

    const updated = await this.prisma.musicianProfile.update({
      where: { id: musicianId },
      data: { isFeatured: !musician.isFeatured },
    });

    return {
      message: updated.isFeatured ? 'Músico destacado com sucesso' : 'Destaque removido',
      isFeatured: updated.isFeatured,
    };
  }

  /**
   * Calcular receita total
   */
  private async getTotalRevenue(): Promise<number> {
    const result = await this.prisma.paymentHistory.aggregate({
      where: {
        status: 'succeeded',
      },
      _sum: {
        amount: true,
      },
    });

    return result._sum.amount || 0;
  }
}

