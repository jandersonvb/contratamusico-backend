import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({
    description: 'Conteúdo da mensagem',
    example: 'Olá! Gostaria de contratar seus serviços para um evento.',
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty({ message: 'O conteúdo da mensagem não pode estar vazio' })
  @MaxLength(2000, { message: 'A mensagem não pode ter mais de 2000 caracteres' })
  content: string;
}

