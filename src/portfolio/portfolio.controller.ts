import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ForbiddenException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioItemDto } from './dto/create-portfolio-item.dto';
import { UpdatePortfolioItemDto } from './dto/update-portfolio-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserType } from '@prisma/client';

@ApiTags('Portfólio')
@Controller()
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  // ==================== ROTAS AUTENTICADAS (MÚSICO) ====================

  @ApiOperation({ 
    summary: 'Adicionar item ao portfólio',
    description: 'Adiciona novo item (imagem, vídeo ou áudio) ao portfólio do músico' 
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 201, description: 'Item adicionado com sucesso' })
  @ApiResponse({ status: 403, description: 'Usuário não é músico' })
  @Post('musicians/me/portfolio')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Req() req: any, @Body() data: CreatePortfolioItemDto) {
    this.ensureMusician(req.user);
    return this.portfolioService.create(req.user.id, data);
  }

  @ApiOperation({ 
    summary: 'Upload de arquivo de portfólio',
    description: 'Faz upload de arquivo (imagem, vídeo ou áudio) e adiciona ao portfólio. Imagem: 5MB, Vídeo: 50MB, Áudio: 10MB' 
  })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      required: ['file', 'title'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Arquivo de mídia (imagem, vídeo ou áudio)'
        },
        title: {
          type: 'string',
          description: 'Título do item'
        },
        description: {
          type: 'string',
          description: 'Descrição (opcional)'
        },
        date: {
          type: 'string',
          description: 'Data de realização (opcional)'
        },
        location: {
          type: 'string',
          description: 'Local (opcional)'
        },
        genre: {
          type: 'string',
          description: 'Gênero musical (opcional)'
        }
      }
    }
  })
  @ApiResponse({ status: 201, description: 'Arquivo enviado e item criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Arquivo inválido ou muito grande' })
  @ApiResponse({ status: 403, description: 'Usuário não é músico' })
  @Post('musicians/me/portfolio/upload')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.CREATED)
  async uploadFile(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Body('description') description?: string,
    @Body('date') date?: string,
    @Body('location') location?: string,
    @Body('genre') genre?: string,
  ) {
    this.ensureMusician(req.user);
    return this.portfolioService.uploadFile(req.user.id, file, {
      title,
      description,
      date,
      location,
      genre,
    });
  }

  @ApiOperation({ 
    summary: 'Listar meu portfólio',
    description: 'Retorna todos os itens do portfólio do músico logado' 
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Lista de itens do portfólio' })
  @ApiResponse({ status: 403, description: 'Usuário não é músico' })
  @Get('musicians/me/portfolio')
  @UseGuards(JwtAuthGuard)
  async findMyPortfolio(@Req() req: any) {
    this.ensureMusician(req.user);
    return this.portfolioService.findByUserId(req.user.id);
  }

  @ApiOperation({ 
    summary: 'Atualizar item do portfólio',
    description: 'Atualiza informações de um item do portfólio' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'ID do item' })
  @ApiResponse({ status: 200, description: 'Item atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Item não encontrado' })
  @Patch('musicians/me/portfolio/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req: any,
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePortfolioItemDto,
  ) {
    this.ensureMusician(req.user);
    return this.portfolioService.update(req.user.id, id, data);
  }

  @ApiOperation({ 
    summary: 'Remover item do portfólio',
    description: 'Remove um item do portfólio do músico' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'ID do item' })
  @ApiResponse({ status: 200, description: 'Item removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Item não encontrado' })
  @Delete('musicians/me/portfolio/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async remove(@Req() req: any, @Param('id', ParseIntPipe) id: number) {
    this.ensureMusician(req.user);
    return this.portfolioService.remove(req.user.id, id);
  }

  // ==================== ROTAS PÚBLICAS ====================

  @ApiOperation({ 
    summary: 'Listar portfólio público de um músico',
    description: 'Retorna todos os itens do portfólio de um músico específico' 
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID do músico' })
  @ApiResponse({ status: 200, description: 'Lista de itens do portfólio' })
  @Get('musicians/:id/portfolio')
  async findByMusicianId(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.findByMusicianId(id);
  }

  // ==================== HELPERS ====================

  private ensureMusician(user: any) {
    if (user.userType !== UserType.MUSICIAN) {
      throw new ForbiddenException(
        'Apenas músicos podem acessar esta funcionalidade.',
      );
    }
  }
}

