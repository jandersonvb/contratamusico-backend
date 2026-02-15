import { IsString, MaxLength, IsInt, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class SendMediaMessageDto {
  @ApiPropertyOptional({
    description: 'Legenda opcional da mídia',
    example: 'Segue o áudio de referência.',
    maxLength: 2000,
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000, { message: 'A mensagem não pode ter mais de 2000 caracteres' })
  content?: string;

  @ApiPropertyOptional({
    description: 'ID do usuário destinatário (necessário quando conversationId não for enviado)',
    example: 42,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'recipientUserId deve ser um número inteiro' })
  @Min(1, { message: 'recipientUserId deve ser maior que zero' })
  recipientUserId?: number;

  @ApiPropertyOptional({
    description: 'ID do perfil de músico para resolver automaticamente o usuário destinatário',
    example: 4,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'musicianProfileId deve ser um número inteiro' })
  @Min(1, { message: 'musicianProfileId deve ser maior que zero' })
  musicianProfileId?: number;

  @ApiPropertyOptional({
    description: 'ID da conversa existente. Se enviado, recipientUserId/musicianProfileId são opcionais',
    example: 15,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'conversationId deve ser um número inteiro' })
  @Min(1, { message: 'conversationId deve ser maior que zero' })
  conversationId?: number;
}
