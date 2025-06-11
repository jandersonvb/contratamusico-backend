// src/users/users.controller.ts
import { Controller, Get, Param, Post, Body, ConflictException, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service'; // Importe o UsersService
import { User } from './entities/user.entity'; // Importe a entidade User
import { CreateUserDto } from './dto/create-user.dto'; // Iremos criar este DTO a seguir
import * as bcrypt from 'bcrypt'; // Para hashear senhas

@Controller('users') // Define o prefixo de rota para este controller (ex: /users)
export class UsersController {
  constructor(private readonly usersService: UsersService) { } // Injeta o UsersService

  // Endpoint de exemplo para buscar um usuário por email (para testes iniciais)
  @Get(':email')
  async findUserByEmail(@Param('email') email: string): Promise<User | undefined> {
    return this.usersService.findOneByEmail(email);
  }

  // Endpoint para criar um novo usuário (usado no Signup)
  @Post()
  @HttpCode(HttpStatus.CREATED) // Retorna status 201 Created para sucesso no cadastro
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersService.findOneByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('Usuario já existe com este email'); // Lança uma exceção se o usuário já existir
    }

    // Hashear a senha antes de salvar
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(createUserDto.password, saltRounds);

    // Cria o usuário com a senha hasheada
    const newUser = await this.usersService.create({
      email: createUserDto.email,
      passwordHash: passwordHash,
      // outros campos como fullName, userType virão aqui se o formulário de signup os tiver
      fullName: createUserDto.fullName, // Mapeia 'fullName' do DTO para a entidade
      userType: createUserDto.accountType, // Mapeia 'accountType' do DTO para 'userType' da entidade
    });

    // Retorna o usuário criado, mas sem a senha hasheada por segurança
    const { passwordHash: _, ...result } = newUser;
    // Remove o campo passwordHash do resultado para não expor a senha
    return result as User;
  }
}