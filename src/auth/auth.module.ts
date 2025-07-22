// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Importa UsersModule para usar UsersService
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Para gerenciar configurações e JWT Secret

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
    AuthService
  ],
  controllers: [AuthController],
})
export class AuthModule { }