
import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { UserService, UserWithProfile } from '../user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from '../user/dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
// Garante que os DTOs sejam validados automaticamente
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  // POST /auth/register
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    // 1. Cria o usuário (hash da senha e perfil de músico, se for o caso)
    // A validação de terms é feita no UserService.create()
    const newUser = await this.userService.create(registerDto);

    // 2. Gera e retorna o token de acesso para o frontend
    return this.authService.generateToken(newUser as unknown as UserWithProfile, false);
  }

  // POST /auth/login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    // 1. Valida o usuário e a senha
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    if (!user) {
        throw new BadRequestException('E-mail ou senha inválidos.');
    }

    // 2. Gera e retorna o token de acesso e os dados do usuário
    // Passa rememberMe para ajustar o tempo de expiração do token
    return this.authService.generateToken(user, loginDto.rememberMe);
  }
}
