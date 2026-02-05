import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SearchMusiciansDto } from './dto/search-musicians.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UploadService } from 'src/upload/upload.service';

// Include completo para retornar dados do músico
const musicianInclude = {
  user: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      city: true,
      state: true,
      profileImageKey: true,
      createdAt: true,
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
  portfolio: {
    orderBy: {
      createdAt: 'desc' as const,
    },
    take: 10,
  },
  reviewsReceived: {
    include: {
      client: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc' as const,
    },
    take: 5,
  },
} satisfies Prisma.MusicianProfileInclude;

// Include simplificado para listagem
const musicianListInclude = {
  user: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      city: true,
      state: true,
      profileImageKey: true,
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
} satisfies Prisma.MusicianProfileInclude;

@Injectable()
export class MusicianService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) { }

  /**
   * Busca músicos com filtros e paginação
   */
  async search(query: SearchMusiciansDto) {
    const {
      genres,
      instruments,
      city,
      state,
      priceMin,
      priceMax,
      rating,
      search,
      page = 1,
      limit = 12,
      sortBy = 'rating',
      sortOrder = 'desc',
    } = query;

    // Construir condições WHERE
    const where: Prisma.MusicianProfileWhereInput = {};

    // Filtro por gêneros (múltiplos - OR)
    if (genres?.length) {
      where.musicianGenres = {
        some: {
          genre: {
            slug: { in: genres },
          },
        },
      };
    }

    // Filtro por instrumentos (múltiplos - OR)
    if (instruments?.length) {
      where.musicianInstruments = {
        some: {
          instrument: {
            slug: { in: instruments },
          },
        },
      };
    }

    // Filtro por cidade (do User ou do MusicianProfile)
    if (city) {
      where.OR = [
        { location: { contains: city } },
        { user: { city: { contains: city } } },
      ];
    }

    // Filtro por estado
    if (state) {
      where.user = {
        ...(where.user as Prisma.UserWhereInput),
        AND: [
          ...(where.user && (where.user as Prisma.UserWhereInput).AND ? (where.user as Prisma.UserWhereInput).AND as Prisma.UserWhereInput[] : []),
          { state: state }
        ],
      };
    }

    // Filtro por faixa de preço
    if (priceMin !== undefined || priceMax !== undefined) {
      where.priceFrom = {};
      if (priceMin !== undefined) {
        where.priceFrom.gte = priceMin;
      }
      if (priceMax !== undefined) {
        where.priceFrom.lte = priceMax;
      }
    }

    // Filtro por rating mínimo
    if (rating !== undefined) {
      where.rating = {
        gte: rating,
      };
    }

    // Busca textual
    if (search) {
      const searchConditions: Prisma.MusicianProfileWhereInput[] = [
        { bio: { contains: search } },
        { category: { contains: search } },
        { user: { firstName: { contains: search } } },
        { user: { lastName: { contains: search } } },
      ];

      if (where.OR) {
        // Se já tem OR, precisamos combinar
        where.AND = [{ OR: where.OR }, { OR: searchConditions }];
        delete where.OR;
      } else {
        where.OR = searchConditions;
      }
    }

    // Construir ordenação
    const orderBy: Prisma.MusicianProfileOrderByWithRelationInput = {};
    if (sortBy === 'rating') {
      orderBy.rating = sortOrder;
    } else if (sortBy === 'priceFrom') {
      orderBy.priceFrom = sortOrder;
    } else if (sortBy === 'eventsCount') {
      orderBy.eventsCount = sortOrder;
    } else if (sortBy === 'createdAt') {
      orderBy.createdAt = sortOrder;
    }

    // Calcular offset
    const skip = (page - 1) * limit;

    // Executar queries em paralelo
    const [musicians, total] = await Promise.all([
      this.prisma.musicianProfile.findMany({
        where,
        include: musicianListInclude,
        orderBy,
        skip,
        take: limit,
      }),
      this.prisma.musicianProfile.count({ where }),
    ]);

    // Formatar resposta
    return {
      data: await Promise.all(musicians.map(m => this.formatMusicianForList(m))),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + musicians.length < total,
      },
    };
  }

  /**
   * Listar músicos em destaque
   */
  async findFeatured(limit = 6) {
    const musicians = await this.prisma.musicianProfile.findMany({
      where: {
        isFeatured: true,
      },
      include: musicianListInclude,
      orderBy: {
        rating: 'desc',
      },
      take: limit,
    });

    return await Promise.all(musicians.map(m => this.formatMusicianForList(m)));
  }

  /**
   * Buscar perfil público do músico por ID
   */
  async findById(id: number) {
    const musician = await this.prisma.musicianProfile.findUnique({
      where: { id },
      include: musicianInclude,
    });

    if (!musician) {
      throw new NotFoundException('Músico não encontrado.');
    }

    return this.formatMusicianProfile(musician);
  }

  /**
   * Buscar perfil do músico logado
   */
  async findByUserId(userId: number) {
    const musician = await this.prisma.musicianProfile.findUnique({
      where: { userId },
      include: musicianInclude,
    });

    if (!musician) {
      throw new NotFoundException(
        'Perfil de músico não encontrado para este usuário.',
      );
    }

    return this.formatMusicianProfile(musician);
  }

  /**
   * Atualizar perfil do músico
   */
  async updateProfile(userId: number, data: UpdateProfileDto) {
    // Verificar se o perfil existe
    const existing = await this.prisma.musicianProfile.findUnique({
      where: { userId },
    });

    if (!existing) {
      throw new NotFoundException(
        'Perfil de músico não encontrado para este usuário.',
      );
    }

    const updated = await this.prisma.musicianProfile.update({
      where: { userId },
      data: {
        category: data.category,
        bio: data.bio,
        location: data.location,
        priceFrom: data.priceFrom,
        experience: data.experience,
        equipment: data.equipment,
        availability: data.availability,
      },
      include: musicianInclude,
    });

    // Verificar se usuário tem foto de perfil, se não, usar primeira imagem do portfólio
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { profileImageKey: true },
    });

    if (!user?.profileImageKey) {
      const firstImage = await this.prisma.portfolioItem.findFirst({
        where: {
          musicianProfileId: updated.id,
          type: 'IMAGE',
        },
        orderBy: { createdAt: 'asc' },
      });

      if (firstImage) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { profileImageKey: firstImage.fileKey },
        });
        // Atualizar o objeto para refletir a mudança na resposta
        updated.user.profileImageKey = firstImage.fileKey;
      }
    }

    return this.formatMusicianProfile(updated);
  }

  /**
   * Atualizar gêneros do músico
   */
  async updateGenres(userId: number, genreSlugs: string[]) {
    // Verificar se o perfil existe
    const profile = await this.prisma.musicianProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        'Perfil de músico não encontrado para este usuário.',
      );
    }

    // Buscar os gêneros pelos slugs
    const genres = await this.prisma.genre.findMany({
      where: { slug: { in: genreSlugs } },
    });

    if (genres.length !== genreSlugs.length) {
      throw new BadRequestException('Um ou mais gêneros são inválidos.');
    }

    // Usar transação para atualizar
    await this.prisma.$transaction(async (tx) => {
      // Remover gêneros existentes
      await tx.musicianGenre.deleteMany({
        where: { musicianProfileId: profile.id },
      });

      // Adicionar novos gêneros
      if (genres.length > 0) {
        await tx.musicianGenre.createMany({
          data: genres.map((genre) => ({
            musicianProfileId: profile.id,
            genreId: genre.id,
          })),
        });
      }
    });

    // Retornar perfil atualizado
    return this.findByUserId(userId);
  }

  /**
   * Atualizar instrumentos do músico
   */
  async updateInstruments(userId: number, instrumentSlugs: string[]) {
    // Verificar se o perfil existe
    const profile = await this.prisma.musicianProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        'Perfil de músico não encontrado para este usuário.',
      );
    }

    // Buscar os instrumentos pelos slugs
    const instruments = await this.prisma.instrument.findMany({
      where: { slug: { in: instrumentSlugs } },
    });

    if (instruments.length !== instrumentSlugs.length) {
      throw new BadRequestException('Um ou mais instrumentos são inválidos.');
    }

    // Usar transação para atualizar
    await this.prisma.$transaction(async (tx) => {
      // Remover instrumentos existentes
      await tx.musicianInstrument.deleteMany({
        where: { musicianProfileId: profile.id },
      });

      // Adicionar novos instrumentos
      if (instruments.length > 0) {
        await tx.musicianInstrument.createMany({
          data: instruments.map((instrument) => ({
            musicianProfileId: profile.id,
            instrumentId: instrument.id,
          })),
        });
      }
    });

    // Retornar perfil atualizado
    return this.findByUserId(userId);
  }

  // ==================== HELPERS ====================

  /**
   * Formatar músico para listagem (dados resumidos)
   */
  private async formatMusicianForList(musician: any) {
    let profileImageUrl: string | undefined;
    if (musician.user.profileImageKey) {
      try {
        profileImageUrl = await this.uploadService.getSignedUrl(
          musician.user.profileImageKey
        );
      } catch (error) {
        profileImageUrl = undefined;
      }
    }


    return {
      id: musician.id,
      name: `${musician.user.firstName} ${musician.user.lastName}`,
      profileImageUrl,
      category: musician.category,  
      location: musician.location || `${musician.user.city}, ${musician.user.state}`,
      priceFrom: musician.priceFrom,
      rating: musician.rating,
      ratingCount: musician.ratingCount,
      eventsCount: musician.eventsCount,
      isFeatured: musician.isFeatured,
      genres: musician.musicianGenres.map((mg: any) => ({
        id: mg.genre.id,
        name: mg.genre.name,
        slug: mg.genre.slug,
      })),
      instruments: musician.musicianInstruments.map((mi: any) => ({
        id: mi.instrument.id,
        name: mi.instrument.name,
        slug: mi.instrument.slug,
      })),
    };
  }

  /**
   * Formatar perfil completo do músico
   */
  private async formatMusicianProfile(musician: any) {
    let profileImageUrl: string | undefined;
    if (musician.user.profileImageKey) {
      try {
        profileImageUrl = await this.uploadService.getSignedUrl(
          musician.user.profileImageKey
        );
      } catch (error) {
        profileImageUrl = undefined;
      }
    }

    return {
      id: musician.id,
      userId: musician.userId,
      name: `${musician.user.firstName} ${musician.user.lastName}`,
      profileImageUrl,
      email: musician.user.email,
      phone: musician.user.phone,
      category: musician.category,
      bio: musician.bio,
      location: musician.location || `${musician.user.city}, ${musician.user.state}`,
      priceFrom: musician.priceFrom,
      experience: musician.experience,
      equipment: musician.equipment,
      availability: musician.availability,
      rating: musician.rating,
      ratingCount: musician.ratingCount,
      eventsCount: musician.eventsCount,
      satisfactionRate: musician.satisfactionRate,
      responseTime: musician.responseTime,
      isFeatured: musician.isFeatured,
      genres: musician.musicianGenres.map((mg: any) => ({
        id: mg.genre.id,
        name: mg.genre.name,
        slug: mg.genre.slug,
      })),
      instruments: musician.musicianInstruments.map((mi: any) => ({
        id: mi.instrument.id,
        name: mi.instrument.name,
        slug: mi.instrument.slug,
      })),
      portfolio: musician.portfolio || [],
      reviews: (musician.reviewsReceived || []).map((review: any) => ({
        id: review.id,
        rating: review.rating,
        content: review.content,
        date: review.date,
        event: review.event,
        clientName: `${review.client.firstName} ${review.client.lastName}`,
      })),
      createdAt: musician.createdAt,
      updatedAt: musician.updatedAt,
    };
  }
}

