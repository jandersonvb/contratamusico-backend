// contratamusico-backend/ormconfig.ts
import { User } from './src/users/entities/user.entity'; // Importe suas entidades aqui
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm'; // <-- Importe DataSource e DataSourceOptions

// Carrega as variáveis de ambiente do .env
dotenv.config();

// Defina o objeto de configuração do TypeORM
const config: DataSourceOptions = {
  type: (process.env.DATABASE_TYPE || 'postgres') as 'postgres',
  host: process.env.DATABASE_HOST || process.env.PGHOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT || process.env.PGPORT || '5432', 10),
  username: process.env.DATABASE_USERNAME || process.env.PGUSER,
  password: process.env.DATABASE_PASSWORD || process.env.PGPASSWORD,
  database: process.env.DATABASE_NAME || process.env.PGDATABASE,

  synchronize: false,
  logging: true, // Para ver logs SQL das migrações

  entities: [
    'src/**/*.entity{.ts,.js}', // Caminho para suas entidades
  ],
  migrations: [
    'src/database/migrations/*.ts', // Caminho onde suas migrações serão geradas
  ],
  subscribers: [],
};

// *** MUITO IMPORTANTE: Exporte uma instância de DataSource ***
const dataSource = new DataSource(config);
export default dataSource; // Exporte a instância default