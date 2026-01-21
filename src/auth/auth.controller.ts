
import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { UserService, UserWithProfile } from '../user/user.service';
import { AuthService } from './auth.service';
import { RegisterDto } from '../user/dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Autenticação')
@Controller('auth')
// Garante que os DTOs sejam validados automaticamente
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ 
    summary: 'Registrar novo usuário',
    description: 'Cria uma nova conta de cliente ou músico e retorna o token JWT' 
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Usuário criado com sucesso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 1,
          email: 'usuario@exemplo.com',
          firstName: 'João',
          lastName: 'Silva',
          userType: 'CLIENT'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    // 1. Cria o usuário (hash da senha e perfil de músico, se for o caso)
    // A validação de terms é feita no UserService.create()
    const newUser = await this.userService.create(registerDto);

    // 2. Gera e retorna o token de acesso para o frontend
    return this.authService.generateToken(newUser as unknown as UserWithProfile, false);
  }

  @ApiOperation({ 
    summary: 'Login de usuário',
    description: 'Autentica usuário com email e senha, retornando token JWT' 
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Login realizado com sucesso',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: 1,
          email: 'usuario@exemplo.com',
          firstName: 'João',
          lastName: 'Silva',
          userType: 'CLIENT'
        }
      }
    }
  })
  @ApiResponse({ status: 400, description: 'E-mail ou senha inválidos' })
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

  @ApiOperation({ 
    summary: 'Solicitar recuperação de senha',
    description: 'Envia email com link para redefinir senha. Rate limit: 3 requisições a cada 15 minutos' 
  })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Email enviado se o endereço estiver cadastrado',
    schema: {
      example: {
        message: 'Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.'
      }
    }
  })
  @Throttle({ default: { limit: 3, ttl: 900000 } })
  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @ApiOperation({ 
    summary: 'Redefinir senha',
    description: 'Redefine a senha usando token recebido por email. Rate limit: 5 requisições a cada 15 minutos' 
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({ 
    status: 200, 
    description: 'Senha redefinida com sucesso',
    schema: {
      example: {
        message: 'Senha redefinida com sucesso!'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Token inválido ou expirado' })
  @Throttle({ default: { limit: 5, ttl: 900000 } })
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.token,
      resetPasswordDto.password,
    );
  }
}
