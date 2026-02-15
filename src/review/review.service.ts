import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UserType } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Criar avaliação para um músico
   */
  async create(
    clientId: number,
    musicianProfileId: number,
    data: CreateReviewDto,
  ) {
    // Verificar se o usuário é um cliente
    const client = await this.prisma.user.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    if (client.userType !== UserType.CLIENT) {
      throw new ForbiddenException('Apenas clientes podem criar avaliações.');
    }

    // Verificar se o músico existe
    const musician = await this.prisma.musicianProfile.findUnique({
      where: { id: musicianProfileId },
    });

    if (!musician) {
      throw new NotFoundException('Músico não encontrado.');
    }

    // Verificar se o cliente já avaliou este músico
    const existingReview = await this.prisma.review.findFirst({
      where: {
        clientId,
        musicianProfileId,
      },
    });

    if (existingReview) {
      throw new BadRequestException('Você já avaliou este músico.');
    }

    // Formatar data atual
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR');

    // Criar avaliação
    const review = await this.prisma.review.create({
      data: {
        clientId,
        musicianProfileId,
        rating: data.rating,
        content: data.content,
        event: data.event,
        date: dateStr,
      },
      include: {
        client: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Atualizar rating médio do músico
    await this.updateMusicianRating(musicianProfileId);

    return this.formatReview(review);
  }

  /**
   * Listar avaliações de um músico (público)
   */
  async findByMusicianId(musicianProfileId: number, page = 1, limit = 10) {
    // Verificar se o músico existe
    const musician = await this.prisma.musicianProfile.findUnique({
      where: { id: musicianProfileId },
    });

    if (!musician) {
      throw new NotFoundException('Músico não encontrado.');
    }

    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { musicianProfileId },
        include: {
          client: {
            select: {
              firstName: true,
              lastName: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.review.count({ where: { musicianProfileId } }),
    ]);

    return {
      data: reviews.map(this.formatReview),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + reviews.length < total,
      },
    };
  }

  /**
   * Obter estatísticas de avaliação de um músico
   */
  async getStats(musicianProfileId: number) {
    const musician = await this.prisma.musicianProfile.findUnique({
      where: { id: musicianProfileId },
      select: { userId: true },
    });

    if (!musician) {
      throw new NotFoundException('Músico não encontrado.');
    }

    const subscription = await this.prisma.subscription.findUnique({
      where: { userId: musician.userId },
      include: { plan: true },
    });

    const hasStatisticsAccess = !!subscription
      && (subscription.status === 'active' || subscription.status === 'trialing')
      && subscription.plan.hasStatistics;

    if (!hasStatisticsAccess) {
      throw new ForbiddenException(
        'O plano atual do músico não inclui estatísticas.'
      );
    }

    const isPremiumPlan = subscription.plan.title.trim().toLowerCase() === 'premium';

    const reviews = await this.prisma.review.findMany({
      where: { musicianProfileId },
      select: { rating: true },
    });

    if (reviews.length === 0) {
      const basicStats = {
        averageRating: 0,
        totalReviews: 0,
      };

      if (!isPremiumPlan) {
        return basicStats;
      }

      return {
        ...basicStats,
        ratingDistribution: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
        },
      };
    }

    const totalReviews = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = Math.round((sum / totalReviews) * 10) / 10;

    const ratingDistribution = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };

    reviews.forEach((r) => {
      ratingDistribution[r.rating as 1 | 2 | 3 | 4 | 5]++;
    });

    const basicStats = {
      averageRating,
      totalReviews,
    };

    if (!isPremiumPlan) {
      return basicStats;
    }

    return {
      ...basicStats,
      ratingDistribution,
    };
  }

  /**
   * Atualizar rating médio do músico
   */
  private async updateMusicianRating(musicianProfileId: number) {
    const reviews = await this.prisma.review.findMany({
      where: { musicianProfileId },
      select: { rating: true },
    });

    const totalReviews = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = totalReviews > 0 ? sum / totalReviews : 0;

    await this.prisma.musicianProfile.update({
      where: { id: musicianProfileId },
      data: {
        rating: Math.round(averageRating * 10) / 10,
        ratingCount: totalReviews,
      },
    });
  }

  /**
   * Formatar resposta da avaliação
   */
  private formatReview(review: any) {
    return {
      id: review.id,
      rating: review.rating,
      content: review.content,
      date: review.date,
      event: review.event,
      clientName: `${review.client.firstName} ${review.client.lastName}`,
      createdAt: review.createdAt,
    };
  }
}

