// src/users/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { AccountType } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString({ message: 'A senha deve ser uma string.' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  password?: string; // Permitir que a senha seja opcional na atualização

  @IsOptional()
  @IsEnum(AccountType, { message: 'Tipo de conta inválido. Deve ser "musico" ou "contratante".' })
  accountType?: AccountType;

  @IsOptional()
  @IsString()
  googleId?: string;

  @IsOptional()
  @IsString()
  facebookId?: string;

  @IsOptional()
  @IsString()
  picture?: string;
}