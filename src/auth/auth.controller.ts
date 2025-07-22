import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './decorators/public.decorator'; // Manter Public decorator
import { AuthResponseDto } from './dto/auth-response.dto'; // Manter para a resposta de login
import { User, AccountType } from '../users/entities/user.entity'; // Importar User e AccountType para tipagem da resposta

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  @Public() // Esta rota é pública pois é para cadastro
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const newUser = await this.authService.signup(createUserDto);

    return newUser;
  }


  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<AuthResponseDto> {
    const user = await this.authService.validateUser(loginUserDto.email, loginUserDto.password);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.');
    }
    // Retorna os dados do usuário para o NextAuth.js
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      accountType: user.accountType,
      picture: user.picture, // Incluir imagem, se existir
    };
  }

  @Public()
  @Post('social-login-callback')
  @HttpCode(HttpStatus.OK)
  async socialLoginCallback(
    @Body('email') email: string,
    @Body('fullName') fullName: string,
    @Body('socialId') socialId: string,
    @Body('provider') provider: 'google' | 'facebook',
    @Body('picture') picture?: string, // Opcional: receber URL da imagem do provedor
  ): Promise<Omit<User, 'password'>> {
    if (!email || !fullName || !socialId || !provider) {
      throw new BadRequestException('Dados do provedor social incompletos.');
    }
    const user = await this.authService.findOrCreateOAuthUser(email, fullName, socialId, provider);
    return user;
  }
}