import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { AccountType } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsEnum(AccountType, { message: 'Tipo de conta inválido. Deve ser "musico" ou "contratante".' })
  accountType?: AccountType; // Mantido para permitir alteração opcional do tipo de conta
}
