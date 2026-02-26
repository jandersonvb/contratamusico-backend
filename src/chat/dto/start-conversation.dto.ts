import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Min } from 'class-validator';

export class StartConversationDto {
  @ApiProperty({
    description: 'ID do usuário destinatário (necessário quando musicianProfileId não for enviado)',
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
}

