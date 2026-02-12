import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
  type INestApplication,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const RAILWAY_PROXY_HOST_FRAGMENT = '.proxy.rlwy.net';

const stripSurroundingQuotes = (value: string): string =>
  value.replace(/^['\"]+|['\"]+$/g, '');

const normalizeMySqlConnectionUrl = (value: string): string => {
  const normalizedValue = stripSurroundingQuotes(value.trim());

  if (!normalizedValue) {
    return normalizedValue;
  }

  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(normalizedValue)) {
    return normalizedValue;
  }

  return `mysql://${normalizedValue}`;
};

const resolveDatabaseUrl = (): string | undefined => {
  const databaseUrl = process.env.DATABASE_URL?.trim();
  const mysqlUrl = process.env.MYSQL_URL?.trim();
  const databasePrivateUrl = process.env.DATABASE_PRIVATE_URL?.trim();
  const mysqlPrivateUrl = process.env.MYSQL_PRIVATE_URL?.trim();
  const mysqlPublicUrl = process.env.MYSQL_PUBLIC_URL?.trim();

  // Railway: prefira URL privada interna para comunicação entre serviços.
  const preferredUrl =
    mysqlPrivateUrl || databasePrivateUrl || mysqlUrl || databaseUrl || mysqlPublicUrl;

  // Se DATABASE_URL estiver apontando para proxy público, substitui automaticamente pela privada.
  if (
    databaseUrl?.includes(RAILWAY_PROXY_HOST_FRAGMENT) &&
    preferredUrl &&
    !preferredUrl.includes(RAILWAY_PROXY_HOST_FRAGMENT)
  ) {
    return normalizeMySqlConnectionUrl(preferredUrl);
  }

  return preferredUrl ? normalizeMySqlConnectionUrl(preferredUrl) : undefined;
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const resolvedDatabaseUrl = resolveDatabaseUrl();

    super(
      resolvedDatabaseUrl
        ? {
            datasources: {
              db: {
                url: resolvedDatabaseUrl,
              },
            },
          }
        : undefined,
    );

    if (!resolvedDatabaseUrl) {
      this.logger.warn(
        'No database URL found. Configure DATABASE_URL or Railway MYSQL_URL/MYSQL_PRIVATE_URL.',
      );
      return;
    }

    if (
      process.env.DATABASE_URL?.includes(RAILWAY_PROXY_HOST_FRAGMENT) &&
      !resolvedDatabaseUrl.includes(RAILWAY_PROXY_HOST_FRAGMENT)
    ) {
      this.logger.warn(
        'DATABASE_URL was pointing to Railway public proxy; Prisma is now using private/internal MySQL URL.',
      );
    }
  }

  async onModuleInit() {
    const maxAttempts = 5;

    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        await this.$connect();
        this.logger.log(`Prisma connected to database on attempt ${attempt}/${maxAttempts}.`);
        return;
      } catch (error) {
        this.logger.error(
          `Database connection failed on attempt ${attempt}/${maxAttempts}.`,
          error instanceof Error ? error.stack : String(error),
        );

        if (attempt < maxAttempts) {
          await wait(2000 * attempt);
        }
      }
    }

    this.logger.error(
      'Could not connect to database during startup. API will keep running and retry on incoming Prisma queries.',
    );
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
