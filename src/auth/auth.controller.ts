// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto'; // DTO para signup
import { Public } from './decorators/public.decorator';
import type { AuthResponseDto } from './dto/auth-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Public() // Marca a rota como pública, pois o guard global não deve protegê-la
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    return this.authService.signup(createUserDto);
  }

  @Public() // Marca a rota como pública
  @UseGuards(LocalAuthGuard) // Usa o guard de autenticação local (email/senha)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: any): Promise<AuthResponseDto> {
    // req.user é populado pelo LocalAuthGuard após validação bem-sucedida
    return this.authService.login(req.user);
  }

  // Exemplo de rota protegida para testar o JWT
  @Post('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Request() req: any) {
    return req.user; // Retorna o payload do JWT do usuário logado
  }
}