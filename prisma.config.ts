import { defineConfig, env } from 'prisma/config';
import 'dotenv/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL') || 'mysql://dummy:dummy@localhost:3306/dummy',
  },
  migrations: {
    seed: 'ts-node prisma/seed.ts',
  },
});

