// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Importa UsersModule para usar UsersService
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Para gerenciar configurações e JWT Secret
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // Importa o guard JWT padrão

@Module({
  imports: [
    UsersModule, // Necessário para AuthService interagir com usuários
    PassportModule,
    JwtModule.registerAsync({ // Configuração assíncrona para pegar o SECRET do ConfigService
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' }, // Token expira em 1 hora
      }),
      inject: [ConfigService],
    }),
    ConfigModule, // Para injetar ConfigService
  ],
  providers: [
    AuthService,
    LocalStrategy, // Adiciona a estratégia local
    JwtStrategy,   // Adiciona a estratégia JWT
    {
      provide: APP_GUARD, // Define JwtAuthGuard como um guard global
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule { }