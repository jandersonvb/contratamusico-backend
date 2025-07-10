// src/auth/guards/jwt-auth.guard.ts
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Verifica se a rota possui o decorador @Public()
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // Se for pública, permite o acesso sem autenticação
    }
    // Caso contrário, executa a lógica padrão do JwtAuthGuard
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    // Você pode lançar uma exceção baseada em 'info' ou 'err'
    if (err || !user) {
      throw err || new UnauthorizedException('Token de autenticação inválido ou ausente.');
    }
    return user;
  }
}