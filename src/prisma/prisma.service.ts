import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  type INestApplication,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    super();
  }

  async onModuleInit() { // Conecta ao banco de dados quando o módulo é inicializado
    try {
      await this.$connect();
      this.logger.log('Prisma connected to database.');
    } catch (error) {
      this.logger.error(
        'Could not connect to database during startup. The app will keep running and retry on incoming queries.',
        error instanceof Error ? error.stack : String(error),
      );
    }
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
