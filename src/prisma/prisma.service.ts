import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  type INestApplication,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit() { // Conecta ao banco de dados quando o módulo é inicializado
    await this.$connect();
  }

  async onModuleDestroy() { // Desconecta do banco de dados quando o módulo é destruído
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
