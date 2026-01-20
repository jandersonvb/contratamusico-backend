/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { UserService, UserWithProfile } from 'src/user/user.service';
import { JwtPayload } from './strategies/jwt.strategy';
import { EmailService } from '../email/email.service';
import { PrismaService } from '../prisma/prisma.service';

type SafeUser = Omit<UserWithProfile, 'passwordHash'>;

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly emailService: EmailService,
    private readonly prismaService: PrismaService,
  ) { }

  // 1. Valida o e-mail e a senha
  async validateUser(email: string, pass: string): Promise<SafeUser | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    // Compara a senha enviada com o hash no banco
    const isMatch = await bcrypt.compare(pass, user.passwordHash);

    if (isMatch) {
      // Retorna o objeto de usuário sem a senha
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }

  // 2. Geração do Token JWT
  async generateToken(user: SafeUser, rememberMe?: boolean) {
    const payload: JwtPayload = { email: user.email, sub: user.id.toString() };
    
    // Define tempo de expiração baseado em rememberMe
    // rememberMe: true -> 30 dias
    // rememberMe: false ou undefined -> 1 dia
    const expiresIn = rememberMe ? '30d' : '1d';
    
    return {
      access_token: this.jwtService.sign(payload, { expiresIn }),
      user: user,
    };
  }

  // 3. Solicitar recuperação de senha
  async forgotPassword(email: string): Promise<{ message: string }> {
    // Buscar usuário pelo email
    const user = await this.userService.findByEmail(email);

    if (!user) {
      // Por segurança, não informar que o email não existe
      // Retornar sucesso mesmo se o email não estiver cadastrado
      return {
        message: 'Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.',
      };
    }

    // Gerar token único para recuperação
    const resetToken = randomBytes(32).toString('hex');

    // Definir expiração do token (1 hora)
    const resetTokenExpiry = new Date();
    resetTokenExpiry.setHours(resetTokenExpiry.getHours() + 1);

    // Salvar token no banco de dados
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // Enviar email com link de recuperação
    try {
      await this.emailService.sendPasswordResetEmail(
        user.email,
        resetToken,
        user.firstName,
      );
    } catch (error) {
      // Se houver erro ao enviar email, limpar o token
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          resetToken: null,
          resetTokenExpiry: null,
        },
      });
      throw new BadRequestException('Erro ao enviar e-mail de recuperação.');
    }

    return {
      message: 'Se o e-mail estiver cadastrado, você receberá instruções para redefinir sua senha.',
    };
  }

  // 4. Redefinir senha com token
  async resetPassword(token: string, newPassword: string): Promise<{ message: string }> {
    // Buscar usuário pelo token
    const user = await this.prismaService.user.findUnique({
      where: { resetToken: token },
    });

    if (!user) {
      throw new BadRequestException('Token inválido ou expirado.');
    }

    // Verificar se o token expirou
    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      // Limpar token expirado
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          resetToken: null,
          resetTokenExpiry: null,
        },
      });
      throw new BadRequestException('Token inválido ou expirado.');
    }

    // Hash da nova senha
    const passwordHash = await bcrypt.hash(newPassword, this.saltRounds);

    // Atualizar senha e limpar token
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    return {
      message: 'Senha redefinida com sucesso!',
    };
  }

}
