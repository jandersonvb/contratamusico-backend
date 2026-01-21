import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InstrumentService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.instrument.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.instrument.findUnique({
      where: { slug },
    });
  }
}

