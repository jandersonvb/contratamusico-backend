/* eslint-disable @typescript-eslint/no-unused-vars */
// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

export interface JwtPayload {
  sub: string; // ID do usuário
  email: string;
}


type SafeUser = Omit<Prisma.UserGetPayload<{ include: { musicianProfile: true } }>, 'passwordHash'>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // O NestJS passa o resultado desta função para o request (@Req().user)
  async validate(payload: JwtPayload): Promise<SafeUser> {
    if (!payload?.sub) {
      throw new UnauthorizedException();
    }

    const userId = Number(payload.sub);

    if (Number.isNaN(userId)) {
      throw new UnauthorizedException();
    }

    const user = await this.prismaService.user.findUnique({
        where: { id: userId },
        include: {
          musicianProfile: true,
        },
    });
    
    if (!user) {
        throw new UnauthorizedException();
    }
    
    // Retorna o usuário sem o hash da senha
    const { passwordHash, ...result } = user;
    return result;
  }
}