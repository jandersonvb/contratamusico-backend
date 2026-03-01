import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Req,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UploadService } from '../upload/upload.service';

@ApiTags('Usuários')
@Controller('users')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly uploadService: UploadService,
  ) {}

  @ApiOperation({
    summary: 'Obter perfil público de contratante',
    description: 'Retorna dados públicos de um usuário contratante (CLIENT) por ID',
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID do contratante' })
  @ApiResponse({
    status: 200,
    description: 'Perfil público do contratante',
    schema: {
      example: {
        id: 2,
        userType: 'CLIENT',
        badgeLabel: 'Contratante',
        name: 'João Silva',
        profileImageUrl: 'https://bucket.s3.amazonaws.com/avatars/2/image.jpg',
        city: 'São Paulo',
        state: 'SP',
        location: 'São Paulo, SP',
        bookingsCount: 3,
        reviewsGivenCount: 5,
        createdAt: '2026-02-08T20:44:21.084Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Contratante não encontrado' })
  @Get('clients/:id')
  async getPublicClientProfile(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findPublicClientById(id);
  }

  @ApiOperation({ 
    summary: 'Obter dados do usuário logado',
    description: 'Retorna dados completos do usuário autenticado, incluindo perfil de músico se aplicável' 
  })
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Dados do usuário',
    schema: {
      example: {
        id: 1,
        email: 'usuario@exemplo.com',
        firstName: 'João',
        lastName: 'Silva',
        phone: '11987654321',
        city: 'São Paulo',
        state: 'SP',
        userType: 'MUSICIAN',
        profileImageUrl: 'https://bucket.s3.amazonaws.com/avatars/1/image.jpg',
        musicianProfile: {
          id: 1,
          category: 'Cantor',
          bio: 'Músico profissional...',
          priceFrom: 500
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @Get('me')
  @SkipThrottle()
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: any) {
    return this.userService.findById(req.user.id);
  }

  @ApiOperation({ 
    summary: 'Atualizar dados do usuário logado',
    description: 'Atualiza informações pessoais do usuário autenticado' 
  })
  @ApiBearerAuth()
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateMe(@Req() req: any, @Body() data: UpdateUserDto) {
    return this.userService.update(req.user.id, data);
  }

  @ApiOperation({ 
    summary: 'Upload de foto de perfil',
    description: 'Faz upload de imagem de perfil para o S3. Aceita: JPEG, PNG, WebP. Máx: 5MB' 
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo de imagem (JPEG, PNG ou WebP). Campo recomendado.'
        },
        avatar: {
          type: 'string',
          format: 'binary',
          description: 'Campo alternativo aceito para compatibilidade'
        },
        image: {
          type: 'string',
          format: 'binary',
          description: 'Campo alternativo aceito para compatibilidade'
        },
      },
    }
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Imagem enviada com sucesso',
    schema: {
      example: {
        id: 1,
        profileImageUrl: 'https://bucket.s3.amazonaws.com/avatars/1/image.jpg'
      }
    }
  })
  @ApiResponse({ status: 400, description: 'Arquivo inválido ou muito grande' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @Post('me/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'avatar', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  @HttpCode(HttpStatus.OK)
  async uploadAvatar(
    @Req() req: any,
    @UploadedFiles()
    files: {
      file?: Express.Multer.File[];
      avatar?: Express.Multer.File[];
      image?: Express.Multer.File[];
    },
  ) {
    const file = files?.file?.[0] ?? files?.avatar?.[0] ?? files?.image?.[0];

    if (!file) {
      throw new BadRequestException(
        'Nenhum arquivo enviado. Use o campo "file" (ou "avatar"/"image").',
      );
    }

    // Mantém as mesmas regras: JPEG/PNG/WebP e 5MB
    this.uploadService.validateFile(file, 'image');

    // Obter key da imagem atual para deletar depois
    const currentImageKey = await this.userService.getProfileImageKey(req.user.id);
    
    // Fazer upload da nova imagem
    const { key } = await this.uploadService.uploadProfileImage(file, req.user.id);

    // Salvar URL canônica no banco; a URL assinada continua sendo gerada na resposta.
    const imageUrl = this.uploadService.buildFileUrl(key);
    const updatedUser = await this.userService.updateProfileImage(req.user.id, imageUrl);
    
    // Deletar imagem antiga do S3 (se existir)
    if (currentImageKey) {
      await this.uploadService.deleteFile(currentImageKey).catch(() => {
        // Ignora erro ao deletar imagem antiga (não é crítico)
      });
    }
    
    return updatedUser;
  }
}
