import { IsNotEmpty, IsNumber, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCheckoutDto {
  @ApiProperty({
    description: 'ID do plano de assinatura',
    example: 2,
  })
  @IsNotEmpty({ message: 'O ID do plano é obrigatório' })
  @IsNumber({}, { message: 'O ID do plano deve ser um número' })
  planId: number;

  @ApiProperty({
    description: 'Intervalo de cobrança',
    enum: ['monthly', 'yearly'],
    example: 'monthly',
  })
  @IsNotEmpty({ message: 'O intervalo de cobrança é obrigatório' })
  @IsIn(['monthly', 'yearly'], { message: 'Intervalo deve ser "monthly" ou "yearly"' })
  billingInterval: 'monthly' | 'yearly';
}
