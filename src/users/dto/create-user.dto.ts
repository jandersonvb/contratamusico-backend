import { IsEmail, IsIn, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { AccountType } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome completo é obrigatório.' })
  @IsString({ message: 'Nome completo deve ser uma string.' })
  fullName: string; // O campo 'name' do frontend será mapeado para 'fullName' no backend


  @IsEmail({}, { message: 'E-mail inválido.' })
  @IsNotEmpty({ message: 'E-mail é obrigatório.' })
  email: string;

  @IsString({ message: 'Senha deve ser uma string.' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  password: string;


  @IsNotEmpty({ message: 'Tipo de conta é obrigatório.' })
  @IsIn([AccountType.MUSICIAN, AccountType.CONTRACTOR], { message: 'Tipo de conta inválido. Deve ser "musico" ou "contratante".' })
  accountType: AccountType; // Tipado com o enum AccountType

}