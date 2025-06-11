// src/users/dto/create-user.dto.ts
import { IsEmail, IsString, MinLength, MaxLength, IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome completo é obrigatório.' })
  @IsString({ message: 'Nome completo deve ser uma string.' })
  // O campo 'name' do frontend será mapeado para 'fullName' no backend
  fullName?: string;


  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'E-mail é obrigatório.' })
  email: string;

  @IsString({ message: 'Senha deve ser uma string.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;


  @IsNotEmpty({ message: 'Tipo de conta é obrigatório.' })
  @IsString({ message: 'Tipo de conta deve ser uma string.' })
  @IsIn(['musico', 'contratante'], { message: 'Tipo de dado inválido. Deve ser "musico" ou "contratante"' }) // Valida o tipo de usuário
  accountType: string;
}