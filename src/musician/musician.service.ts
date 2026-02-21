import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { Prisma, UserType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { SearchMusiciansDto } from './dto/search-musicians.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UploadService } from 'src/upload/upload.service';

// Include completo: Agora trazemos a assinatura para verificar permissões
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
      // NOVO: Trazer dados do plano para regra de visibilidade
      subscription: {
        where: { status: { in: ['active', 'trialing'] } }, // Assinaturas com benefícios ativos
        select: {
          plan: {
            select: {
              hasWhatsapp: true,
              title: true,
            },
          },
        },
      },
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

// Include simplificado para listagem (não mudou, pois listagem não mostra telefone)
const musicianListInclude = {
  user: {
    select: {
      id: true,
      firstName: true,
      lastName: true,
      city: true,
      state: true,
      profileImageKey: true,
      subscription: {
        where: { status: { in: ['active', 'trialing'] } },
        select: {
          plan: {
            select: {
              title: true,
            },
          },
        },
      },
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

type PublicSearchItem = {
  id: number;
  userId: number;
  userType: UserType;
  badgeLabel: 'Músico' | 'Contratante';
  name: string;
  profileImageUrl?: string;
  category: string | null;
  location: string | null;
  priceFrom: number | null;
  rating: number | null;
  ratingCount: number;
  eventsCount: number;
  isFeatured: boolean;
  isVerified: boolean;
  genres: Array<{ id: number; name: string; slug: string }>;
  instruments: Array<{ id: number; name: string; slug: string }>;
  createdAt: Date;
};

@Injectable()
export class MusicianService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) { }

  /**
   * Busca músicos com filtros e paginação
   */
  async search(query: SearchMusiciansDto, excludeUserId?: number | null) {
    const {
      userType = 'musician',
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

    const normalizedUserType = this.normalizeSearchUserType(userType);
    const where: Prisma.MusicianProfileWhereInput = {};
    const hasMusicianOnlyFilters = Boolean(
      (genres && genres.length > 0) ||
      (instruments && instruments.length > 0) ||
      priceMin !== undefined ||
      priceMax !== undefined ||
      rating !== undefined,
    );

    if (excludeUserId) {
      where.userId = { not: excludeUserId };
    }

    if (genres?.length) {
      where.musicianGenres = {
        some: {
          genre: {
            slug: { in: genres },
          },
        },
      };
    }

    if (instruments?.length) {
      where.musicianInstruments = {
        some: {
          instrument: {
            slug: { in: instruments },
          },
        },
      };
    }

    if (city) {
      where.OR = [
        { location: { contains: city } },
        { user: { city: { contains: city } } },
      ];
    }

    if (state) {
      where.user = {
        ...(where.user as Prisma.UserWhereInput),
        AND: [
          ...(where.user && (where.user as Prisma.UserWhereInput).AND ? (where.user as Prisma.UserWhereInput).AND as Prisma.UserWhereInput[] : []),
          { state: state }
        ],
      };
    }

    if (priceMin !== undefined || priceMax !== undefined) {
      where.priceFrom = {};
      if (priceMin !== undefined) where.priceFrom.gte = priceMin;
      if (priceMax !== undefined) where.priceFrom.lte = priceMax;
    }

    if (rating !== undefined) {
      where.rating = { gte: rating };
    }

    if (search) {
      const searchConditions: Prisma.MusicianProfileWhereInput[] = [
        { bio: { contains: search } },
        { category: { contains: search } },
        { user: { firstName: { contains: search } } },
        { user: { lastName: { contains: search } } },
      ];

      if (where.OR) {
        where.AND = [{ OR: where.OR }, { OR: searchConditions }];
        delete where.OR;
      } else {
      where.OR = searchConditions;
      }
    }

    const orderBy: Prisma.MusicianProfileOrderByWithRelationInput = {};
    if (sortBy === 'rating') orderBy.rating = sortOrder;
    else if (sortBy === 'priceFrom') orderBy.priceFrom = sortOrder;
    else if (sortBy === 'eventsCount') orderBy.eventsCount = sortOrder;
    else if (sortBy === 'createdAt') orderBy.createdAt = sortOrder;

    const skip = (page - 1) * limit;

    if (normalizedUserType === UserType.CLIENT) {
      return this.searchClients({
        city,
        state,
        search,
        page,
        limit,
        sortBy,
        sortOrder,
        excludeUserId,
      });
    }

    if (normalizedUserType === 'ALL') {
      return this.searchAllUsers(
        {
          city,
          state,
          search,
          page,
          limit,
          sortBy,
          sortOrder,
          excludeUserId,
          includeClients: !hasMusicianOnlyFilters,
        },
        {
          where,
        },
      );
    }

    if (sortBy === 'verified') {
      const musicians = await this.prisma.musicianProfile.findMany({
        where,
        include: musicianListInclude,
      });

      const sortedMusicians = [...musicians].sort((a: any, b: any) => {
        const aVerified = this.isPremiumVerified(a.user.subscription);
        const bVerified = this.isPremiumVerified(b.user.subscription);

        if (aVerified !== bVerified) {
          return aVerified ? -1 : 1; // Verificados sempre primeiro
        }

        // Critério secundário: rating (asc/desc conforme sortOrder)
        const aRating = a.rating ?? 0;
        const bRating = b.rating ?? 0;
        return sortOrder === 'asc' ? aRating - bRating : bRating - aRating;
      });

      const paginated = sortedMusicians.slice(skip, skip + limit);
      const total = sortedMusicians.length;

      return {
        data: await Promise.all(paginated.map((m) => this.formatMusicianForList(m))),
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          hasMore: skip + paginated.length < total,
        },
      };
    }

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

    // TRUE = Perfil Público (aplica regras de ocultar telefone)
    return this.formatMusicianProfile(musician, true);
  }

  /**
   * Buscar perfil do músico logado (Dashboard/Edição)
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

    // FALSE = Perfil Privado (o dono sempre vê seu telefone)
    return this.formatMusicianProfile(musician, false);
  }

  /**
   * Atualizar perfil do músico
   */
  async updateProfile(userId: number, data: UpdateProfileDto) {
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

    // Sincronizar foto de perfil se necessário
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
        updated.user.profileImageKey = firstImage.fileKey;
      }
    }

    return this.formatMusicianProfile(updated, false);
  }

  /**
   * Atualizar gêneros do músico
   */
  async updateGenres(userId: number, genreSlugs: string[]) {
    const profile = await this.prisma.musicianProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        'Perfil de músico não encontrado para este usuário.',
      );
    }

    const genres = await this.prisma.genre.findMany({
      where: { slug: { in: genreSlugs } },
    });

    if (genres.length !== genreSlugs.length) {
      throw new BadRequestException('Um ou mais gêneros são inválidos.');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.musicianGenre.deleteMany({
        where: { musicianProfileId: profile.id },
      });

      if (genres.length > 0) {
        await tx.musicianGenre.createMany({
          data: genres.map((genre) => ({
            musicianProfileId: profile.id,
            genreId: genre.id,
          })),
        });
      }
    });

    return this.findByUserId(userId);
  }

  /**
   * Atualizar instrumentos do músico
   */
  async updateInstruments(userId: number, instrumentSlugs: string[]) {
    const profile = await this.prisma.musicianProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        'Perfil de músico não encontrado para este usuário.',
      );
    }

    const instruments = await this.prisma.instrument.findMany({
      where: { slug: { in: instrumentSlugs } },
    });

    if (instruments.length !== instrumentSlugs.length) {
      throw new BadRequestException('Um ou mais instrumentos são inválidos.');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.musicianInstrument.deleteMany({
        where: { musicianProfileId: profile.id },
      });

      if (instruments.length > 0) {
        await tx.musicianInstrument.createMany({
          data: instruments.map((instrument) => ({
            musicianProfileId: profile.id,
            instrumentId: instrument.id,
          })),
        });
      }
    });

    return this.findByUserId(userId);
  }

  // ==================== HELPERS ====================

  private normalizeSearchUserType(
    userType: SearchMusiciansDto['userType'],
  ): UserType | 'ALL' {
    if (!userType || userType === 'musician') {
      return UserType.MUSICIAN;
    }

    if (userType === 'client') {
      return UserType.CLIENT;
    }

    return 'ALL';
  }

  private buildClientWhere(params: {
    city?: string;
    state?: string;
    search?: string;
    excludeUserId?: number | null;
  }): Prisma.UserWhereInput {
    const conditions: Prisma.UserWhereInput[] = [{ userType: UserType.CLIENT }];

    if (params.excludeUserId) {
      conditions.push({ id: { not: params.excludeUserId } });
    }

    if (params.city) {
      conditions.push({ city: { contains: params.city } });
    }

    if (params.state) {
      conditions.push({ state: params.state });
    }

    if (params.search) {
      conditions.push({
        OR: [
          { firstName: { contains: params.search } },
          { lastName: { contains: params.search } },
          { city: { contains: params.search } },
          { state: { contains: params.search } },
        ],
      });
    }

    return { AND: conditions };
  }

  private async searchClients(params: {
    city?: string;
    state?: string;
    search?: string;
    page: number;
    limit: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
    excludeUserId?: number | null;
  }) {
    const { page, limit, sortBy, sortOrder, city, state, search, excludeUserId } = params;
    const skip = (page - 1) * limit;
    const where = this.buildClientWhere({ city, state, search, excludeUserId });
    const orderBy: Prisma.UserOrderByWithRelationInput =
      sortBy === 'createdAt' ? { createdAt: sortOrder } : { createdAt: 'desc' };

    const [clients, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          city: true,
          state: true,
          profileImageKey: true,
          createdAt: true,
        },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      data: await Promise.all(clients.map((client) => this.formatClientForList(client))),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + clients.length < total,
      },
    };
  }

  private async searchAllUsers(
    sharedParams: {
      city?: string;
      state?: string;
      search?: string;
      page: number;
      limit: number;
      sortBy: string;
      sortOrder: 'asc' | 'desc';
      excludeUserId?: number | null;
      includeClients: boolean;
    },
    musicianParams: {
      where: Prisma.MusicianProfileWhereInput;
    },
  ) {
    const { city, state, search, page, limit, sortBy, sortOrder, excludeUserId, includeClients } = sharedParams;
    const { where } = musicianParams;
    const skip = (page - 1) * limit;

    const musicianOrderBy: Prisma.MusicianProfileOrderByWithRelationInput = {};
    if (sortBy === 'rating') musicianOrderBy.rating = sortOrder;
    else if (sortBy === 'priceFrom') musicianOrderBy.priceFrom = sortOrder;
    else if (sortBy === 'eventsCount') musicianOrderBy.eventsCount = sortOrder;
    else if (sortBy === 'createdAt') musicianOrderBy.createdAt = sortOrder;
    const shouldApplyMusicianOrderBy =
      sortBy !== 'verified' && Object.keys(musicianOrderBy).length > 0;

    const [musiciansRaw, clientsRaw] = await Promise.all([
      this.prisma.musicianProfile.findMany({
        where,
        include: musicianListInclude,
        ...(shouldApplyMusicianOrderBy ? { orderBy: musicianOrderBy } : {}),
      }),
      includeClients
        ? this.prisma.user.findMany({
            where: this.buildClientWhere({ city, state, search, excludeUserId }),
            select: {
              id: true,
              firstName: true,
              lastName: true,
              city: true,
              state: true,
              profileImageKey: true,
              createdAt: true,
            },
          })
        : Promise.resolve([]),
    ]);

    const musiciansSorted =
      sortBy === 'verified'
        ? [...musiciansRaw].sort((a: any, b: any) => {
            const aVerified = this.isPremiumVerified(a.user.subscription);
            const bVerified = this.isPremiumVerified(b.user.subscription);

            if (aVerified !== bVerified) {
              return aVerified ? -1 : 1;
            }

            const aRating = a.rating ?? 0;
            const bRating = b.rating ?? 0;
            return sortOrder === 'asc' ? aRating - bRating : bRating - aRating;
          })
        : musiciansRaw;

    const [musicianItems, clientItems] = await Promise.all([
      Promise.all(musiciansSorted.map((m) => this.formatMusicianForList(m))),
      Promise.all(clientsRaw.map((c) => this.formatClientForList(c))),
    ]);

    const allItems = this.sortCombinedSearchItems(
      [...musicianItems, ...clientItems],
      sortBy,
      sortOrder,
    );

    const paginated = allItems.slice(skip, skip + limit);
    const total = allItems.length;

    return {
      data: paginated,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + paginated.length < total,
      },
    };
  }

  private sortCombinedSearchItems(
    items: PublicSearchItem[],
    sortBy: string,
    sortOrder: 'asc' | 'desc',
  ): PublicSearchItem[] {
    const sorted = [...items];
    const direction = sortOrder === 'asc' ? 1 : -1;

    sorted.sort((a, b) => {
      if (sortBy === 'createdAt') {
        return (a.createdAt.getTime() - b.createdAt.getTime()) * direction;
      }

      // Para métricas específicas de músicos, músicos vêm primeiro.
      if (a.userType !== b.userType) {
        return a.userType === UserType.MUSICIAN ? -1 : 1;
      }

      if (sortBy === 'verified') {
        if (a.isVerified !== b.isVerified) {
          return a.isVerified ? -1 : 1;
        }
        return ((a.rating ?? 0) - (b.rating ?? 0)) * direction;
      }

      if (sortBy === 'rating') {
        return ((a.rating ?? 0) - (b.rating ?? 0)) * direction;
      }

      if (sortBy === 'priceFrom') {
        return this.compareNullableNumber(a.priceFrom, b.priceFrom, sortOrder);
      }

      if (sortBy === 'eventsCount') {
        return (a.eventsCount - b.eventsCount) * direction;
      }

      return (a.createdAt.getTime() - b.createdAt.getTime()) * direction;
    });

    return sorted;
  }

  private compareNullableNumber(
    a: number | null,
    b: number | null,
    sortOrder: 'asc' | 'desc',
  ): number {
    if (a === null && b === null) {
      return 0;
    }

    if (a === null) {
      return 1;
    }

    if (b === null) {
      return -1;
    }

    return sortOrder === 'asc' ? a - b : b - a;
  }

  private async formatClientForList(client: {
    id: number;
    firstName: string;
    lastName: string;
    city: string | null;
    state: string | null;
    profileImageKey: string | null;
    createdAt: Date;
  }): Promise<PublicSearchItem> {
    let profileImageUrl: string | undefined;
    if (client.profileImageKey) {
      try {
        profileImageUrl = await this.uploadService.getSignedUrl(client.profileImageKey);
      } catch {
        profileImageUrl = undefined;
      }
    }

    const location =
      client.city || client.state
        ? `${client.city || ''}${client.city && client.state ? ', ' : ''}${client.state || ''}`
        : null;

    return {
      id: client.id,
      userId: client.id,
      userType: UserType.CLIENT,
      badgeLabel: 'Contratante',
      name: `${client.firstName} ${client.lastName}`,
      profileImageUrl,
      category: 'Contratante',
      location,
      priceFrom: null,
      rating: null,
      ratingCount: 0,
      eventsCount: 0,
      isFeatured: false,
      isVerified: false,
      genres: [],
      instruments: [],
      createdAt: client.createdAt,
    };
  }

  /**
   * Formatar músico para listagem
   */
  private async formatMusicianForList(musician: any): Promise<PublicSearchItem> {
    let profileImageUrl: string | undefined;
    if (musician.user.profileImageKey) {
      try {
        profileImageUrl = await this.uploadService.getSignedUrl(
          musician.user.profileImageKey
        );
      } catch {
        profileImageUrl = undefined;
      }
    }

    const isVerified = this.isPremiumVerified(musician.user.subscription);

    return {
      id: musician.id,
      userId: musician.user.id,
      userType: UserType.MUSICIAN,
      badgeLabel: 'Músico',
      name: `${musician.user.firstName} ${musician.user.lastName}`,
      profileImageUrl,
      category: musician.category || null,
      location:
        musician.location ||
        (musician.user.city || musician.user.state
          ? `${musician.user.city || ''}${musician.user.city && musician.user.state ? ', ' : ''}${musician.user.state || ''}`
          : null),
      priceFrom: musician.priceFrom ?? null,
      rating: musician.rating ?? 0,
      ratingCount: musician.ratingCount,
      eventsCount: musician.eventsCount,
      isFeatured: musician.isFeatured,
      isVerified,
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
      createdAt: musician.createdAt,
    };
  }

  /**
   * Formatar perfil completo do músico
   * @param isPublicProfile Se for true, aplica regras de privacidade baseadas no plano
   */
  private async formatMusicianProfile(musician: any, isPublicProfile = false) {
    let profileImageUrl: string | undefined;

    if (musician.user.profileImageKey) {
      try {
        profileImageUrl = await this.uploadService.getSignedUrl(
          musician.user.profileImageKey
        );
      } catch {
        profileImageUrl = undefined;
      }
    }

    // LÓGICA DE PRIVACIDADE DO TELEFONE
    let phone = musician.user.phone;
    
    if (isPublicProfile) {
      // Verifica se tem assinatura ativa E se o plano permite WhatsApp
      const hasWhatsappFeature = musician.user.subscription?.plan?.hasWhatsapp;
      
      // Se não tiver a feature (ex: plano Básico), esconde o telefone
      if (!hasWhatsappFeature) {
        phone = null;
      }
    }

    const portfolioWithUrls = await Promise.all(
      (musician.portfolio || []).map(async (item: any) => {
        try {
          // Transforma o fileKey (ex: "portfolio/1/abc.jpg") em URL completa
          const url = await this.uploadService.getSignedUrl(item.fileKey);
          return { ...item, url, type: item.type };
        } catch (error) {
          console.error(`Erro ao gerar URL para item ${item.id}:`, error);
          return { ...item, url: null }; // Retorna null se falhar, para não quebrar tudo
        }
      })
    );

    const isVerified = this.isPremiumVerified(musician.user.subscription);

    return {
      id: musician.id,
      userId: musician.userId,
      name: `${musician.user.firstName} ${musician.user.lastName}`,
      profileImageUrl,
      email: musician.user.email,
      phone: phone, // Usa a variável com a lógica aplicada
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
      isVerified,
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
      portfolio: portfolioWithUrls,
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

  private isPremiumVerified(subscription: any): boolean {
    const resolvedSubscription = Array.isArray(subscription) ? subscription[0] : subscription;
    const planTitle = resolvedSubscription?.plan?.title;
    return typeof planTitle === 'string' && planTitle.trim().toLowerCase() === 'premium';
  }
}
