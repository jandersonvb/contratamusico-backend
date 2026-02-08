import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadService } from '../upload/upload.service';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';
import { UpdatePortfolioItemDto } from './dto/update-portfolio-item.dto';

@Injectable()
export class PortfolioService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) { }

  /**
   * Criar item de portfólio para o músico logado
   */
  async create(userId: number, data: CreatePortfolioItemDto) {
    await this.checkPlanLimits(userId, data.type); // Verificar limites de plano para adicionar itens no portfólio

    const profile = await this.getMusicianProfile(userId);

    const item = await this.prisma.portfolioItem.create({
      data: {
        musicianProfileId: profile.id,
        type: data.type,
        fileKey: data.url, // Salvar como fileKey (nome mantido para compatibilidade de DTO)
        title: data.title,
        description: data.description,
        date: data.date,
        location: data.location,
        genre: data.genre,
      },
    });

    // Gerar URL assinada para retorno
    const url = await this.uploadService.getSignedUrl(item.fileKey);
    return { ...item, url };
  }

  /**
   * Listar itens do portfólio de um músico (público)
   */
  async findByMusicianId(musicianProfileId: number) {
    // Verificar se o perfil existe
    const profile = await this.prisma.musicianProfile.findUnique({
      where: { id: musicianProfileId },
    });

    if (!profile) {
      throw new NotFoundException('Músico não encontrado.');
    }

    const items = await this.prisma.portfolioItem.findMany({
      where: { musicianProfileId },
      orderBy: { createdAt: 'desc' },
    });

    // Gerar URLs assinadas para todos os itens
    return Promise.all(
      items.map(async (item) => {
        const url = await this.uploadService.getSignedUrl(item.fileKey);
        return { ...item, url };
      })
    );
  }

  /**
   * Listar itens do portfólio do músico logado
   */
  async findByUserId(userId: number) {
    const profile = await this.getMusicianProfile(userId);

    const items = await this.prisma.portfolioItem.findMany({
      where: { musicianProfileId: profile.id },
      orderBy: { createdAt: 'desc' },
    });

    // Gerar URLs assinadas para todos os itens
    return Promise.all(
      items.map(async (item) => {
        const url = await this.uploadService.getSignedUrl(item.fileKey);
        return { ...item, url };
      })
    );
  }

  /**
   * Atualizar item do portfólio
   */
  async update(userId: number, itemId: number, data: UpdatePortfolioItemDto) {
    const profile = await this.getMusicianProfile(userId);

    // Verificar se o item existe e pertence ao músico
    const item = await this.prisma.portfolioItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('Item do portfólio não encontrado.');
    }

    if (item.musicianProfileId !== profile.id) {
      throw new ForbiddenException(
        'Você não tem permissão para editar este item.',
      );
    }

    const updated = await this.prisma.portfolioItem.update({
      where: { id: itemId },
      data: {
        type: data.type,
        fileKey: data.url, // Salvar como fileKey (nome mantido para compatibilidade de DTO)
        title: data.title,
        description: data.description,
        date: data.date,
        location: data.location,
        genre: data.genre,
      },
    });

    // Gerar URL assinada para retorno
    const url = await this.uploadService.getSignedUrl(updated.fileKey);
    return { ...updated, url };
  }

  /**
   * Upload de arquivo e criação de item no portfólio
   */
  async uploadFile(
    userId: number,
    file: Express.Multer.File,
    metadata: {
      title: string;
      description?: string;
      date?: string;
      location?: string;
      genre?: string;
    },
  ) {
    const fileType = file.mimetype.startsWith('video') ? 'VIDEO' : 'IMAGE';

    await this.checkPlanLimits(userId, fileType); // Verificar limites de plano para adicionar itens no portfólio

    if (!file) {
      throw new BadRequestException('Nenhum arquivo enviado.');
    }

    const profile = await this.getMusicianProfile(userId);

    // Fazer upload do arquivo para S3
    const { key, type } = await this.uploadService.uploadPortfolioFile(
      file,
      profile.id,
    );

    // Criar item no portfólio (salvando a key)
    const item = await this.prisma.portfolioItem.create({
      data: {
        musicianProfileId: profile.id,
        type: type,
        fileKey: key,
        title: metadata.title,
        description: metadata.description,
        date: metadata.date,
        location: metadata.location,
        genre: metadata.genre,
      },
    });

    // Se for uma imagem e o usuário não tiver foto de perfil, usar esta imagem automaticamente
    if (type === 'IMAGE') {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        select: { profileImageKey: true },
      });

      if (!user?.profileImageKey) {
        await this.prisma.user.update({
          where: { id: userId },
          data: { profileImageKey: key },
        });
      }
    }

    // Gerar URL assinada para retorno
    const url = await this.uploadService.getSignedUrl(item.fileKey);

    return {
      message: 'Arquivo enviado e item criado com sucesso!',
      item: { ...item, url },
    };
  }

  /**
   * Remover item do portfólio
   */
  async remove(userId: number, itemId: number) {
    const profile = await this.getMusicianProfile(userId);

    // Verificar se o item existe e pertence ao músico
    const item = await this.prisma.portfolioItem.findUnique({
      where: { id: itemId },
    });

    if (!item) {
      throw new NotFoundException('Item do portfólio não encontrado.');
    }

    if (item.musicianProfileId !== profile.id) {
      throw new ForbiddenException(
        'Você não tem permissão para remover este item.',
      );
    }

    await this.prisma.portfolioItem.delete({
      where: { id: itemId },
    });

    return { message: 'Item removido com sucesso.' };
  }

  /**
   * Helper: Obter perfil do músico pelo userId
   */
  private async getMusicianProfile(userId: number) {
    const profile = await this.prisma.musicianProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException(
        'Perfil de músico não encontrado para este usuário.',
      );
    }

    return profile;
  }

  // Verificar limites de plano para adicionar itens no portfólio
  private async checkPlanLimits(userId: number, type: 'IMAGE' | 'VIDEO' | 'AUDIO') {
    // 1. Buscar a assinatura ativa do usuário e o plano associado
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
      include: { plan: true },
    });

    // Se não tiver assinatura, assumimos que é o plano Básico (ou lançamos erro, depende da sua regra)
    // Aqui vou assumir que se não tem sub, buscamos o plano com title 'Básico' ou usamos defaults
    let plan = subscription?.plan;

    if (!plan) {
      // Fallback: Busca o plano Básico no banco
      plan = await this.prisma.plan.findUnique({ where: { title: 'Básico' } });
      if (!plan) throw new BadRequestException('Plano básico não configurado no sistema.');
    }

    // 2. Contar quantos itens desse tipo o usuário já tem
    // Precisamos do ID do perfil do músico
    const profile = await this.prisma.musicianProfile.findUnique({ where: { userId } });
    if (!profile) throw new NotFoundException('Perfil não encontrado');

    const currentCount = await this.prisma.portfolioItem.count({
      where: {
        musicianProfileId: profile.id,
        type: type // IMAGE, VIDEO ou AUDIO
      }
    });

    // 3. Verificar limites
    if (type === 'IMAGE') {
      // Se maxPhotos for null, é ilimitado. Se não, checa a quantidade.
      if (plan.maxPhotos !== null && currentCount >= plan.maxPhotos) {
        throw new ForbiddenException(
          `Seu plano atual permite apenas ${plan.maxPhotos} fotos. Faça upgrade para adicionar mais.`
        );
      }
    } else if (type === 'VIDEO') {
      if (plan.maxVideos !== null && currentCount >= plan.maxVideos) {
        throw new ForbiddenException(
          `Seu plano atual permite apenas ${plan.maxVideos} vídeos. Faça upgrade para adicionar mais.`
        );
      }
    }
  }
}

