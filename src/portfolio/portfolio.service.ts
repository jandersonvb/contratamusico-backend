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
  ) {}

  /**
   * Criar item de portfólio para o músico logado
   */
  async create(userId: number, data: CreatePortfolioItemDto) {
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
}

