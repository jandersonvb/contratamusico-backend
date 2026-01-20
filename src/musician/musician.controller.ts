import {
  Controller,
  Get,
  Patch,
  Param,
  Body,
  Query,
  UseGuards,
  Req,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  ForbiddenException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { MusicianService } from './musician.service';
import { SearchMusiciansDto } from './dto/search-musicians.dto';
import {
  UpdateProfileDto,
  UpdateGenresDto,
  UpdateInstrumentsDto,
} from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserType } from '@prisma/client';

@ApiTags('Músicos')
@Controller('musicians')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class MusicianController {
  constructor(private readonly musicianService: MusicianService) {}

  // ==================== ROTAS PÚBLICAS ====================

  @ApiOperation({ 
    summary: 'Buscar músicos',
    description: 'Lista músicos com filtros de gênero, instrumento, localização, preço e rating' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de músicos encontrados',
    schema: {
      example: {
        data: [{
          id: 1,
          name: 'João Silva',
          category: 'Cantor',
          location: 'São Paulo, SP',
          priceFrom: 500,
          rating: 4.5,
          ratingCount: 10,
          genres: [{ id: 1, name: 'MPB', slug: 'mpb' }]
        }],
        pagination: {
          page: 1,
          limit: 12,
          total: 50,
          totalPages: 5,
          hasMore: true
        }
      }
    }
  })
  @Get()
  async search(@Query() query: SearchMusiciansDto) {
    return this.musicianService.search(query);
  }

  @ApiOperation({ 
    summary: 'Músicos em destaque',
    description: 'Retorna lista de músicos destacados na plataforma' 
  })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Número de resultados (padrão: 6)' })
  @ApiResponse({ status: 200, description: 'Lista de músicos em destaque' })
  @Get('featured')
  async findFeatured(@Query('limit') limit?: string) {
    const parsedLimit = limit ? parseInt(limit, 10) : 6;
    return this.musicianService.findFeatured(parsedLimit);
  }

  // ==================== ROTAS AUTENTICADAS (MÚSICO) ====================

  @ApiOperation({ 
    summary: 'Obter meu perfil de músico',
    description: 'Retorna o perfil completo do músico logado' 
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Perfil do músico' })
  @ApiResponse({ status: 401, description: 'Não autenticado' })
  @ApiResponse({ status: 403, description: 'Usuário não é músico' })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@Req() req: any) {
    this.ensureMusician(req.user);
    return this.musicianService.findByUserId(req.user.id);
  }

  @ApiOperation({ 
    summary: 'Atualizar meu perfil',
    description: 'Atualiza informações do perfil do músico logado' 
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Perfil atualizado' })
  @ApiResponse({ status: 403, description: 'Usuário não é músico' })
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateMyProfile(@Req() req: any, @Body() data: UpdateProfileDto) {
    this.ensureMusician(req.user);
    return this.musicianService.updateProfile(req.user.id, data);
  }

  @ApiOperation({ 
    summary: 'Atualizar meus gêneros musicais',
    description: 'Atualiza a lista de gêneros musicais do músico' 
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Gêneros atualizados' })
  @ApiResponse({ status: 403, description: 'Usuário não é músico' })
  @Patch('me/genres')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateMyGenres(@Req() req: any, @Body() data: UpdateGenresDto) {
    this.ensureMusician(req.user);
    return this.musicianService.updateGenres(req.user.id, data.genres);
  }

  @ApiOperation({ 
    summary: 'Atualizar meus instrumentos',
    description: 'Atualiza a lista de instrumentos do músico' 
  })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Instrumentos atualizados' })
  @ApiResponse({ status: 403, description: 'Usuário não é músico' })
  @Patch('me/instruments')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateMyInstruments(
    @Req() req: any,
    @Body() data: UpdateInstrumentsDto,
  ) {
    this.ensureMusician(req.user);
    return this.musicianService.updateInstruments(req.user.id, data.instruments);
  }

  // ==================== ROTA PÚBLICA (por ID) ====================

  @ApiOperation({ 
    summary: 'Obter perfil público de um músico',
    description: 'Retorna perfil detalhado de um músico específico por ID' 
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID do músico' })
  @ApiResponse({ 
    status: 200, 
    description: 'Perfil do músico',
    schema: {
      example: {
        id: 1,
        name: 'João Silva',
        category: 'Cantor',
        bio: 'Músico profissional com 10 anos de experiência...',
        priceFrom: 500,
        rating: 4.8,
        portfolio: [],
        reviews: []
      }
    }
  })
  @ApiResponse({ status: 404, description: 'Músico não encontrado' })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.musicianService.findById(id);
  }

  // ==================== HELPERS ====================

  /**
   * Verificar se o usuário é um músico
   */
  private ensureMusician(user: any) {
    if (user.userType !== UserType.MUSICIAN) {
      throw new ForbiddenException(
        'Apenas músicos podem acessar esta funcionalidade.',
      );
    }
  }
}

