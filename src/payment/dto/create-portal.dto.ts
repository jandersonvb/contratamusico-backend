import { IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePortalDto {
  @ApiProperty({
    description: 'URL para retornar após sair do portal',
    example: 'https://contratamusico.com/perfil',
    required: false,
  })
  @IsOptional()
  @IsUrl({}, { message: 'URL de retorno inválida' })
  returnUrl?: string;
}
