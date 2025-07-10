import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum AccountType {
  MUSICIAN = 'musico',
  CONTRACTOR = 'contratante',
}

@Entity('users') // Marca a classe como uma entidade TypeORM, mapeando-a para uma tabela (nome da tabela será 'user' por padrão)
export class User {
  @PrimaryGeneratedColumn('uuid') // Gera um ID único universalmente (UUID)
  id: string;

  @Column({ unique: true }) // Coluna para o email, deve ser único no banco de dados
  email: string;

  @Column()  // Coluna para a senha (armazenaremos o hash da senha)
  password: string;

  @Column({ nullable: true }) /// Este campo receberá o 'name' do formulário
  fullName: string;

  @Column({ type: 'enum', enum: AccountType, default: AccountType.CONTRACTOR })
  accountType: AccountType;

  @Column({ nullable: true }) // Coluna para o token de redefinição de senha
  resetPasswordToken: string;

  @Column({ type: 'timestamp', nullable: true }) // Coluna para a data/hora de expiração do token
  resetPasswordExpiresAt: Date;

  @Column({ default: false }) // Coluna para indicar se o e-mail foi verificado
  isEmailVerified: boolean;

  @CreateDateColumn({ name: 'created_at' }) // Data de criação automática
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' }) // Data da última atualização automática
  updatedAt: Date;
}