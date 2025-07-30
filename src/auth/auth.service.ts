// src/auth/auth.service.ts
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto'; // DTO para signup
import type { AuthResponseDto } from './dto/auth-response.dto';
import { AccountType, User } from 'src/users/entities/user.entity';
import type { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User) private usersRepository: Repository<User>, // Injetar aqui para findOrCreateOAuthUser
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
  ): Promise<Omit<User, 'password'>> {
    const foundUserWithPassword = await this.usersService.findOneByEmailWithPasswordAndSocial(email);

    if (foundUserWithPassword) {
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
        const updatedUser = await this.usersService.update(foundUserWithPassword.id, updateData);
        return updatedUser;
      } else {
        const { password, ...result } = foundUserWithPassword;
        return result;
      }
    } else {
      const generatedPassword = this.generateRandomPassword();
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      // Criar a entidade User diretamente para salvar
      const newUserEntity: User = this.usersRepository.create({
        email,
        fullName,
        password: hashedPassword,
        accountType: AccountType.CONTRACTOR, // Definindo um tipo padrão, pode ser alterado conforme necessário
        picture,
        ...(provider === 'google' && { googleId: socialId }),
        ...(provider === 'facebook' && { facebookId: socialId }),
        isEmailVerified: true, // Considerando que o OAuth já verifica o e-mail
        // Não definimos resetPasswordToken e resetPasswordExpiresAt, pois não são necessários para OAuth
      });

      try {
        const savedUser = await this.usersRepository.save(newUserEntity);
        const { password, ...result } = savedUser;
        return result;
      } catch (error) {
        console.error('Erro ao salvar novo usuário OAuth:', error);
        throw new InternalServerErrorException('Erro ao criar usuário social.');
      }
    }
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


