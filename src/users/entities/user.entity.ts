// src/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity() // Marca a classe como uma entidade TypeORM, mapeando-a para uma tabela (nome da tabela será 'user' por padrão)
export class User {
  @PrimaryGeneratedColumn('uuid') // Gera um ID único universalmente (UUID)
  id: string;

  @Column({ unique: true }) // Coluna para o email, deve ser único no banco de dados
  email: string;

  @Column() // Coluna para a senha (armazenaremos o hash aqui)
  passwordHash: string; // Renomeado para 'passwordHash' para indicar que é a senha hasheada

  @Column({ nullable: true }) // Coluna opcional para o nome completo
  fullName: string;

  @Column({ default: 'user' }) // Coluna para o tipo de usuário (e.g., 'musico', 'contratante', 'admin', 'user')
  userType: string;

  @Column({ nullable: true }) // Coluna para o token de redefinição de senha
  resetPasswordToken: string;

  @Column({ type: 'timestamp', nullable: true }) // Coluna para a data/hora de expiração do token
  resetPasswordExpiresAt: Date;

  @Column({ default: false }) // Coluna para indicar se o e-mail foi verificado
  isEmailVerified: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) // Data de criação
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }) // Data da última atualização
  updatedAt: Date;
}