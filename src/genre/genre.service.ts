import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.genre.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.genre.findUnique({
      where: { slug },
    });
  }
}

