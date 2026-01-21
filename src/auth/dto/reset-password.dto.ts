import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from '../validators/match.validator';

export class ResetPasswordDto {
  @IsString({ message: 'Token inválido.' })
  @IsNotEmpty({ message: 'Token é obrigatório.' })
  token: string;

  @IsString({ message: 'Senha deve ser uma string.' })
  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  @MinLength(6, { message: 'Senha deve ter no mínimo 6 caracteres.' })
  password: string;

  @IsString({ message: 'Confirmação de senha deve ser uma string.' })
  @IsNotEmpty({ message: 'Confirmação de senha é obrigatória.' })
  @Match('password', { message: 'As senhas não coincidem.' })
  confirmPassword: string;
}

