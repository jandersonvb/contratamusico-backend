import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Adicionar músico aos favoritos
   */
  async addFavorite(userId: number, musicianProfileId: number) {
    // Verificar se o músico existe
    const musician = await this.prisma.musicianProfile.findUnique({
      where: { id: musicianProfileId },
    });

    if (!musician) {
      throw new NotFoundException('Músico não encontrado.');
    }

    // Verificar se já está favoritado
    const existing = await this.prisma.favorite.findUnique({
      where: {
        userId_musicianProfileId: {
          userId,
          musicianProfileId,
        },
      },
    });

    if (existing) {
      throw new ConflictException('Músico já está nos favoritos.');
    }

    // Adicionar aos favoritos
    const favorite = await this.prisma.favorite.create({
      data: {
        userId,
        musicianProfileId,
      },
      include: {
        musicianProfile: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                city: true,
                state: true,
                profileImageUrl: true,
              },
            },
            musicianGenres: {
              include: {
                genre: true,
              },
            },
          },
        },
      },
    });

    return {
      message: 'Músico adicionado aos favoritos!',
      favorite: this.formatFavorite(favorite),
    };
  }

  /**
   * Remover músico dos favoritos
   */
  async removeFavorite(userId: number, musicianProfileId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_musicianProfileId: {
          userId,
          musicianProfileId,
        },
      },
    });

    if (!favorite) {
      throw new NotFoundException('Favorito não encontrado.');
    }

    await this.prisma.favorite.delete({
      where: {
        id: favorite.id,
      },
    });

    return {
      message: 'Músico removido dos favoritos.',
    };
  }

  /**
   * Listar favoritos do usuário
   */
  async findByUserId(userId: number) {
    const favorites = await this.prisma.favorite.findMany({
      where: { userId },
      include: {
        musicianProfile: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                city: true,
                state: true,
                profileImageUrl: true,
              },
            },
            musicianGenres: {
              include: {
                genre: true,
              },
            },
            musicianInstruments: {
              include: {
                instrument: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return favorites.map(this.formatFavorite);
  }

  /**
   * Verificar se um músico está nos favoritos
   */
  async isFavorite(userId: number, musicianProfileId: number) {
    const favorite = await this.prisma.favorite.findUnique({
      where: {
        userId_musicianProfileId: {
          userId,
          musicianProfileId,
        },
      },
    });

    return {
      isFavorite: !!favorite,
    };
  }

  /**
   * Contar favoritos de um usuário
   */
  async countByUserId(userId: number) {
    const count = await this.prisma.favorite.count({
      where: { userId },
    });

    return { count };
  }

  /**
   * Formatar favorito para resposta
   */
  private formatFavorite(favorite: any) {
    return {
      id: favorite.id,
      musicianProfileId: favorite.musicianProfileId,
      musician: {
        id: favorite.musicianProfile.id,
        name: `${favorite.musicianProfile.user.firstName} ${favorite.musicianProfile.user.lastName}`,
        category: favorite.musicianProfile.category,
        location: favorite.musicianProfile.location || `${favorite.musicianProfile.user.city}, ${favorite.musicianProfile.user.state}`,
        priceFrom: favorite.musicianProfile.priceFrom,
        rating: favorite.musicianProfile.rating,
        ratingCount: favorite.musicianProfile.ratingCount,
        profileImageUrl: favorite.musicianProfile.user.profileImageUrl,
        genres: favorite.musicianProfile.musicianGenres.map((mg: any) => ({
          id: mg.genre.id,
          name: mg.genre.name,
          slug: mg.genre.slug,
        })),
        instruments: favorite.musicianProfile.musicianInstruments?.map((mi: any) => ({
          id: mi.instrument.id,
          name: mi.instrument.name,
          slug: mi.instrument.slug,
        })) || [],
      },
      createdAt: favorite.createdAt,
    };
  }
}

