import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Req,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { FavoriteService } from './favorite.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Favoritos')
@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @ApiOperation({ 
    summary: 'Adicionar músico aos favoritos',
    description: 'Adiciona um músico à lista de favoritos do usuário logado' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'musicianId', type: Number, description: 'ID do perfil do músico' })
  @ApiResponse({ status: 201, description: 'Músico adicionado aos favoritos' })
  @ApiResponse({ status: 409, description: 'Músico já está nos favoritos' })
  @ApiResponse({ status: 404, description: 'Músico não encontrado' })
  @Post(':musicianId')
  @HttpCode(HttpStatus.CREATED)
  async addFavorite(
    @Req() req: any,
    @Param('musicianId', ParseIntPipe) musicianId: number,
  ) {
    return this.favoriteService.addFavorite(req.user.id, musicianId);
  }

  @ApiOperation({ 
    summary: 'Remover músico dos favoritos',
    description: 'Remove um músico da lista de favoritos do usuário logado' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'musicianId', type: Number, description: 'ID do perfil do músico' })
  @ApiResponse({ status: 200, description: 'Músico removido dos favoritos' })
  @ApiResponse({ status: 404, description: 'Favorito não encontrado' })
  @Delete(':musicianId')
  @HttpCode(HttpStatus.OK)
  async removeFavorite(
    @Req() req: any,
    @Param('musicianId', ParseIntPipe) musicianId: number,
  ) {
    return this.favoriteService.removeFavorite(req.user.id, musicianId);
  }

  @ApiOperation({ 
    summary: 'Listar meus favoritos',
    description: 'Retorna lista de músicos favoritos do usuário logado' 
  })
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de favoritos',
    schema: {
      example: [{
        id: 1,
        musician: {
          id: 5,
          name: 'João Silva',
          category: 'Cantor',
          location: 'São Paulo, SP',
          priceFrom: 500,
          rating: 4.8
        },
        createdAt: '2024-01-15T10:30:00Z'
      }]
    }
  })
  @Get()
  async findMyFavorites(@Req() req: any) {
    return this.favoriteService.findByUserId(req.user.id);
  }

  @ApiOperation({ 
    summary: 'Verificar se é favorito',
    description: 'Verifica se um músico específico está nos favoritos do usuário' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'musicianId', type: Number, description: 'ID do perfil do músico' })
  @ApiResponse({ 
    status: 200, 
    description: 'Status de favorito',
    schema: {
      example: { isFavorite: true }
    }
  })
  @Get('check/:musicianId')
  async checkFavorite(
    @Req() req: any,
    @Param('musicianId', ParseIntPipe) musicianId: number,
  ) {
    return this.favoriteService.isFavorite(req.user.id, musicianId);
  }

  @ApiOperation({ 
    summary: 'Contar favoritos',
    description: 'Retorna o número total de favoritos do usuário' 
  })
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Total de favoritos',
    schema: {
      example: { count: 5 }
    }
  })
  @Get('count')
  async countFavorites(@Req() req: any) {
    return this.favoriteService.countByUserId(req.user.id);
  }
}

