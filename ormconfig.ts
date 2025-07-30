import { User } from './src/users/entities/user.entity'; // Importe suas entidades aqui
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

// Carrega as variáveis de ambiente do .env (útil para o CLI local)
dotenv.config();

// Define a configuração do banco de dados de forma adaptável para o ambiente local e de produção.
// Para Railway, ele injeta PGHOST, PGPORT, etc. Se não definidos, usamos os do .env ou fallbacks.
const dbHost = process.env.PGHOST || process.env.DATABASE_HOST || 'localhost';
const dbPort = parseInt(process.env.PGPORT || process.env.DATABASE_PORT || '5432', 10);
const dbUser = process.env.PGUSER || process.env.DATABASE_USERNAME;
const dbPass = process.env.PGPASSWORD || process.env.DATABASE_PASSWORD;
const dbName = process.env.PGDATABASE || process.env.DATABASE_NAME;
const dbType = (process.env.DATABASE_TYPE || 'postgres') as 'postgres'; // O TypeORM CLI precisa do tipo


const config: DataSourceOptions = {
  type: dbType,
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPass,
  database: dbName,

  synchronize: false, // MUITO IMPORTANTE: Sempre false aqui para migrações!
  logging: true, // Para ver logs SQL durante as migrações (útil para depuração)

  entities: [
    'src/**/*.entity{.ts,.js}', // Caminho para suas entidades (serão transpiladas para .js em produção)
  ],
  migrations: [
    'src/database/migrations/*.ts', // Caminho onde suas migrações serão geradas
    // No ambiente de produção do Railway, elas serão transpiladas para JS e estarão em 'dist'
    'dist/database/migrations/*.js',
  ],
  subscribers: [], // Subscrevers opcionais
};

// Exporta uma instância de DataSource, como o TypeORM CLI espera.
const dataSource = new DataSource(config);
export default dataSource;