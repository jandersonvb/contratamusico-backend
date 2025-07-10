// src/users/users.service.ts
import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, AccountType } from './entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto'; // Use o DTO do próprio users
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

  /**
   * Cria um novo usuário no banco de dados.
   * Lida com o hash da senha e verificação de e-mail duplicado.
   * @param createUserDto Dados do usuário a ser criado.
   * @returns O usuário criado (sem a senha).
   */
  async create(createUserDto: CreateUserDto): Promise<Omit<User, 'password'>> {
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });

    if (existingUser) {
      throw new ConflictException('Este e-mail já está em uso.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword, // Armazena a senha hasheada
    });

    const savedUser = await this.usersRepository.save(newUser);

    // Retorna o usuário sem a senha
    const { password, ...result } = savedUser;
    return result;
  }

  /**
   * Encontra um usuário por seu ID.
   * @param id O ID do usuário.
   * @returns O usuário encontrado ou null.
   */
  async findOneById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  /**
   * Encontra um usuário por seu e-mail.
   * Retorna o usuário COMPLETO, incluindo senha, para uso interno (ex: autenticação).
   * @param email O e-mail do usuário.
   * @returns O usuário encontrado ou null.
   */
  async findOneByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email }, select: ['id', 'email', 'password', 'fullName', 'accountType'] }); // Explicitamente seleciona 'password'
  }

  /**
   * Encontra um usuário por seu e-mail.
   * Retorna o usuário SEM A SENHA, para exposição pública.
   * @param email O e-mail do usuário.
   * @returns O usuário encontrado ou null (sem a senha).
   */
  async findOneByEmail(email: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }


  /**
   * Lista todos os usuários (com paginação e filtros opcionais).
   * @returns Uma lista de usuários (sem a senha).
   */
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();

    return users.map(user => {
      const { password, ...result } = user;
      return result;
    });
  }

  /**
   * Atualiza as informações de um usuário.
   * @param id O ID do usuário a ser atualizado.
   * @param updateUserDto Os dados para atualização.
   * @returns O usuário atualizado (sem a senha).
   */
  async update(id: string, updateUserDto: UpdateUserDto): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }

    // Se a senha estiver sendo atualizada, fazer o hash
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    // Atualiza o objeto do usuário com os novos dados
    Object.assign(user, updateUserDto);

    const updatedUser = await this.usersRepository.save(user);

    const { password, ...result } = updatedUser;
    return result;
  }

  /**
   * Remove (soft delete ou hard delete) um usuário.
   * @param id O ID do usuário a ser removido.
   * @returns Resultado da operação.
   */
  async remove(id: string): Promise<{ affected?: number | null }> {
    const deleteResult = await this.usersRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }
    return deleteResult;
  }
}