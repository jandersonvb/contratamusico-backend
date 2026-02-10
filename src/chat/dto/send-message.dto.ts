import { IsString, IsNotEmpty, MaxLength, IsInt, IsOptional, Min } from 'class-validator';
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

  @ApiProperty({
    description: 'ID do usuário destinatário (necessário quando conversationId não for enviado)',
    example: 42,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'recipientUserId deve ser um número inteiro' })
  @Min(1, { message: 'recipientUserId deve ser maior que zero' })
  recipientUserId?: number;

  @ApiProperty({
    description: 'ID do perfil de músico para resolver automaticamente o usuário destinatário',
    example: 4,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'musicianProfileId deve ser um número inteiro' })
  @Min(1, { message: 'musicianProfileId deve ser maior que zero' })
  musicianProfileId?: number;

  @ApiProperty({
    description: 'ID da conversa existente. Se enviado, recipientUserId/musicianProfileId são opcionais',
    example: 15,
    required: false,
  })
  @IsOptional()
  @IsInt({ message: 'conversationId deve ser um número inteiro' })
  @Min(1, { message: 'conversationId deve ser maior que zero' })
  conversationId?: number;
}
