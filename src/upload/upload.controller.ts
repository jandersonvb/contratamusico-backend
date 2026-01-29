import {
  Controller,
  Get,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { UploadService } from './upload.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({
    summary: 'Gerar URL assinada para um arquivo',
    description: 'Gera uma URL temporária assinada para acessar um arquivo no bucket. URL válida por 7 dias por padrão.',
  })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'key',
    type: String,
    description: 'Chave (path) do arquivo no bucket',
    example: 'avatars/1/d8857521-7654-4a56-af45-c700a1672a93.jpg',
  })
  @ApiQuery({
    name: 'expiresIn',
    type: Number,
    required: false,
    description: 'Tempo de expiração em segundos (padrão: 604800 = 7 dias)',
    example: 604800,
  })
  @ApiResponse({
    status: 200,
    description: 'URL assinada gerada com sucesso',
    schema: {
      example: {
        key: 'avatars/1/d8857521-7654-4a56-af45-c700a1672a93.jpg',
        url: 'https://storage.railway.app/contrata-musico-bucket-xwrwf/avatars/1/d8857521-7654-4a56-af45-c700a1672a93.jpg?X-Amz-Algorithm=...',
        expiresIn: 604800,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Chave do arquivo não fornecida' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @Get('signed-url')
  @UseGuards(JwtAuthGuard)
  async getSignedUrl(
    @Query('key') key: string,
    @Query('expiresIn') expiresIn?: number,
  ) {
    if (!key) {
      throw new BadRequestException('Parâmetro "key" é obrigatório.');
    }

    const expires = expiresIn ? parseInt(expiresIn.toString()) : 604800; // 7 dias
    const url = await this.uploadService.getSignedUrl(key, expires);

    return {
      key,
      url,
      expiresIn: expires,
    };
  }

  @ApiOperation({
    summary: 'Gerar URLs assinadas para múltiplos arquivos',
    description: 'Gera URLs temporárias assinadas para múltiplos arquivos de uma vez. Útil para carregar portfólios completos.',
  })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'keys',
    type: String,
    description: 'Chaves dos arquivos separadas por vírgula',
    example: 'avatars/1/file1.jpg,portfolio/1/image/file2.jpg',
  })
  @ApiQuery({
    name: 'expiresIn',
    type: Number,
    required: false,
    description: 'Tempo de expiração em segundos (padrão: 604800 = 7 dias)',
    example: 604800,
  })
  @ApiResponse({
    status: 200,
    description: 'URLs assinadas geradas com sucesso',
    schema: {
      example: {
        urls: [
          {
            key: 'avatars/1/file1.jpg',
            url: 'https://storage.railway.app/...',
          },
          {
            key: 'portfolio/1/image/file2.jpg',
            url: 'https://storage.railway.app/...',
          },
        ],
        expiresIn: 604800,
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Chaves dos arquivos não fornecidas' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @Get('signed-urls')
  @UseGuards(JwtAuthGuard)
  async getSignedUrls(
    @Query('keys') keys: string,
    @Query('expiresIn') expiresIn?: number,
  ) {
    if (!keys) {
      throw new BadRequestException('Parâmetro "keys" é obrigatório.');
    }

    const keysArray = keys.split(',').map((k) => k.trim()).filter((k) => k);
    if (keysArray.length === 0) {
      throw new BadRequestException('Nenhuma chave válida fornecida.');
    }

    const expires = expiresIn ? parseInt(expiresIn.toString()) : 604800; // 7 dias
    const urls = await this.uploadService.getSignedUrls(keysArray, expires);

    return {
      urls,
      expiresIn: expires,
    };
  }
}
