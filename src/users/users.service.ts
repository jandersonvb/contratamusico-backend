// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Importe InjectRepository
import { Repository } from 'typeorm'; // Importe Repository
import { User } from './entities/user.entity'; // Importe a entidade User

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Injeta o repositório da entidade User
    private usersRepository: Repository<User>,
  ) { }

  /**
   * Encontra um usuário pelo email.
   * @param email O email do usuário.
   * @returns O objeto User ou undefined se não for encontrado.
   */
  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });

    return user ?? undefined;
  }

  /**
   * Cria um novo usuário no banco de dados.
   * @param userData Os dados do usuário a serem criados (ex: email, passwordHash, etc.).
   * @returns O objeto User criado.
   */
  async create(userData: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(userData);

    return this.usersRepository.save(newUser);
  }

}