// src/users/users.service.ts
import { Injectable, ConflictException, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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

    try {
      const savedUser = await this.usersRepository.save(newUser);
      // Retorna o usuário sem a senha
      const { password, ...result } = savedUser;
      return result;
    } catch (error) {
      console.error('Erro ao salvar novo usuário:', error);

      throw new InternalServerErrorException('Erro ao criar usuário.');
    }
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
 * Retorna o usuário COMPLETO, incluindo senha e IDs sociais, para uso interno (ex: autenticação).
 * @param email O e-mail do usuário.
 * @returns O usuário encontrado ou null.
 */
  async findOneByEmailWithPasswordAndSocial(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email }, select: ['id', 'email', 'password', 'fullName', 'accountType', 'googleId', 'facebookId', 'picture'] });
  }


  /**
 * Encontra um usuário por seu e-mail.
 * Retorna o usuário SEM A SENHA e IDs sociais, para exposição pública.
 * @param email O e-mail do usuário.
 * @returns O usuário encontrado ou null (sem a senha).
 */
  async findOneByEmail(email: string): Promise<Omit<User, 'password' | 'googleId' | 'facebookId'> | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    const { password, googleId, facebookId, ...result } = user;
    return result;
  }

  /**
 * Lista todos os usuários.
 * @returns Uma lista de usuários (sem a senha).
 */
  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users: User[] = await this.usersRepository.find(); // Garante que é um array de User
    return users.map(user => { // Itera sobre cada User
      const { password, ...result } = user; // Desestrutura de cada objeto User
      return result;
    });
  }


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
    for (const key in updateUserDto) {
      if (updateUserDto[key as keyof UpdateUserDto] !== undefined) {
        (user as any)[key] = updateUserDto[key as keyof UpdateUserDto];
      }
    }


    try {
      const updatedUser = await this.usersRepository.save(user);
      const { password, ...result } = updatedUser;
      return result;
    } catch (error) {
      console.error(`Erro ao atualizar usuário ${id}:`, error);
      throw new InternalServerErrorException('Erro ao atualizar usuário.');
    }
  }


  /**
   * Remove (soft delete ou hard delete) um usuário.
   * @param id O ID do usuário a ser removido.
   * @returns Resultado da operação.
   */
  async remove(id: string): Promise<{ affected?: number }> {
    try {
      const deleteResult = await this.usersRepository.delete(id);
      if (deleteResult.affected === 0) {
        throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
      }
      return { affected: deleteResult.affected ?? undefined };
    } catch (error) {
      console.error(`Erro ao remover usuário ${id}:`, error);
      throw new InternalServerErrorException('Erro ao remover usuário.');
    }
  }

}