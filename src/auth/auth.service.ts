// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto'; // DTO para signup
import type { AuthResponseDto } from './dto/auth-response.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  /**
   * Valida as credenciais do usuário para login.
   * @param email O e-mail do usuário.
   * @param password A senha em texto claro.
   * @returns O usuário validado (sem a senha) ou null se as credenciais forem inválidas.
   */
  async validateUser(email: string, pass: string): Promise<Omit<CreateUserDto, 'password'> | null> {
    const user = await this.usersService.findOneByEmailWithPassword(email); // Busca com a senha
    if (user && await bcrypt.compare(pass, user.password)) {
      // Remove a senha antes de retornar
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Realiza o login do usuário, gerando um JWT.
   * @param user O objeto de usuário validado.
   * @returns Um objeto contendo o token de acesso e os dados do usuário.
   */
  async login(user: any): Promise<AuthResponseDto> {
    const payload = { email: user.email, sub: user.id, accountType: user.accountType };
    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        accountType: user.accountType,
      },
    };
  }

  /**
   * Registra um novo usuário.
   * @param createUserDto Dados do novo usuário.
   * @returns Um objeto contendo o token de acesso e os dados do usuário.
   */
  async signup(createUserDto: CreateUserDto): Promise<AuthResponseDto> {
    const newUser = await this.usersService.create(createUserDto); // O service já faz o hash e valida duplicidade

    // Loga o usuário imediatamente após o cadastro
    return this.login(newUser);
  }
}