// src/auth/auth.service.ts
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto'; // DTO para signup
import type { AuthResponseDto } from './dto/auth-response.dto';
import { AccountType, type User } from 'src/users/entities/user.entity';
import type { UpdateUserDto } from 'src/users/dto/update-user.dto';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
  ) { }

  async validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByEmailWithPasswordAndSocial(email); // Busca com a senha e IDs sociais

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas.'); // Lança exceção se usuário não encontrado
    }

    const isPasswordValid = await bcrypt.compare(pass, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas.'); // Lança exceção se senha inválida
    }

    // Retorna o usuário sem a senha para o NextAuth.js consumir
    const { password, ...result } = user;
    return result;
  }

  async signup(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    // A lógica de verificação de e-mail duplicado e hash de senha já está no UsersService.create
    try {
      const newUser = await this.usersService.create(createUserDto);
      return newUser; // Retorna o usuário criado. O login será feito separadamente pelo NextAuth.js
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error; // Re-lança se for conflito de e-mail
      }
      console.error('Erro no AuthService.signup:', error);
      throw new InternalServerErrorException('Erro ao registrar usuário.');
    }
  }


  async findOrCreateOAuthUser(
    email: string,
    fullName: string,
    socialId: string,
    provider: 'google' | 'facebook',
    picture?: string,
  ): Promise<Omit<User, 'password'>> { // <-- O retorno DEVE ser Omit<User, 'password'>
    // 1. Tenta encontrar o usuário pelo email (com senha e IDs sociais)
    const foundUserWithPassword: User | null = await this.usersService.findOneByEmailWithPasswordAndSocial(email);

    let userToReturn: Omit<User, 'password'>; // Declaramos o tipo final que será retornado

    if (foundUserWithPassword) {
      // Usuário existe. Vincular o socialId se ainda não estiver vinculado.
      // E atualizar foto de perfil se for nova ou ausente.
      const updateData: UpdateUserDto = {};
      let needsUpdate = false;

      if (provider === 'google' && !foundUserWithPassword.googleId) {
        updateData.googleId = socialId;
        needsUpdate = true;
      } else if (provider === 'facebook' && !foundUserWithPassword.facebookId) {
        updateData.facebookId = socialId;
        needsUpdate = true;
      }

      if (picture && foundUserWithPassword.picture !== picture) {
        updateData.picture = picture;
        needsUpdate = true;
      }

      if (needsUpdate) {
        // Se precisa atualizar, chame usersService.update
        const updatedUser = await this.usersService.update(foundUserWithPassword.id, updateData);
        userToReturn = updatedUser; // update já retorna Omit<User, 'password'>
      } else {
        // Se não precisa atualizar, desestruture a senha do usuário existente
        const { password, ...result } = foundUserWithPassword;
        userToReturn = result;
      }
    } else {
      // 2. Usuário não existe, cadastrar novo usuário
      const generatedPassword = this.generateRandomPassword();
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      // Primeiro, crie o DTO que usersService.create espera
      const createUserDtoForSocial: CreateUserDto = {
        email: email,
        password: generatedPassword, // Passe a senha gerada (texto puro) para o DTO
        fullName: fullName,
        accountType: AccountType.CONTRACTOR,
      };

      // Use usersService.create para criar o usuário base
      // Ele vai lidar com o hash da senha e salvar.
      const createdBaseUser = await this.usersService.create(createUserDtoForSocial);

      // Agora, atualize este usuário com os dados sociais
      const updateData: UpdateUserDto = {};
      if (provider === 'google') updateData.googleId = socialId;
      else if (provider === 'facebook') updateData.facebookId = socialId;
      if (picture) updateData.picture = picture;

      // Chame usersService.update para adicionar os IDs sociais e a foto
      const finalUser = await this.usersService.update(createdBaseUser.id, updateData);
      userToReturn = finalUser; // finalUser já é Omit<User, 'password'>

    }
    return userToReturn; // Apenas retorne userToReturn (já é uma Promise se veio de await)
  }
  private generateRandomPassword(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < 16; i++) { // Gerar uma senha de 16 caracteres
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }
}


