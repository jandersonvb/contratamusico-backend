// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // O token deve expirar
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    // O payload é o que foi assinado no JWT (id do usuário, email, accountType)
    // Aqui você pode adicionar lógica para buscar o usuário no DB
    // e retornar um objeto mais completo se necessário.
    // Por exemplo: const user = await this.usersService.findOneById(payload.sub);
    // Mas para este caso, o payload já contém informações suficientes.
    return { id: payload.sub, email: payload.email, accountType: payload.accountType, fullName: payload.fullName };
  }
}