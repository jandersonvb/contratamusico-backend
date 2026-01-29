import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
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
          description: 'Arquivo de imagem (JPEG, PNG ou WebP)'
        }
      }
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
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  async uploadAvatar(
    @Req() req: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5MB
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // Obter key da imagem atual para deletar depois
    const currentImageKey = await this.userService.getProfileImageKey(req.user.id);
    
    // Fazer upload da nova imagem
    const { key } = await this.uploadService.uploadProfileImage(file, req.user.id);
    
    // Atualizar key no banco de dados (a URL assinada será gerada automaticamente)
    const updatedUser = await this.userService.updateProfileImage(req.user.id, key);
    
    // Deletar imagem antiga do S3 (se existir)
    if (currentImageKey) {
      await this.uploadService.deleteFile(currentImageKey).catch(() => {
        // Ignora erro ao deletar imagem antiga (não é crítico)
      });
    }
    
    return updatedUser;
  }
}
