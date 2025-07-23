import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Torna o ConfigModule global, acessível em todo o aplicativo
      load: [configuration], // Carrega nossa configuração personalizada
      envFilePath: '.env', // Incdica o caminho do seu arquivo .env
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Importa o ConfigModule para acessar as variáveis de ambiente
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get<string>('DATABASE_TYPE') as 'postgres', // Tipo de banco de dados, padrão é postgres
        host: configService.get<string>('DATABASE_HOST'), // Host do banco de dados, padrão é localhost
        port: configService.get<number>('DATABASE_PORT'), // Porta do banco de dados, padrão é 5432
        username: configService.get<string>('DATABASE_USERNAME'), // Usuário do banco de dados, padrão é postgres
        password: configService.get<string>('DATABASE_PASSWORD'), // Senha do banco de dados, padrão é password
        database: configService.get<string>('DATABASE_NAME'), // Nome do banco de dados, padrão é mydatabase
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Localização das entidades
        synchronize: false, // Apenas para desenvolvimento: sincroniza o schema do DB com suas entidades.
        // Em produção, use migrações!

      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
