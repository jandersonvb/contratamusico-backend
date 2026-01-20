import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GenreService } from './genre.service';

@ApiTags('Gêneros Musicais')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({ 
    summary: 'Listar todos os gêneros musicais',
    description: 'Retorna lista completa de gêneros disponíveis na plataforma' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de gêneros',
    schema: {
      example: [
        { id: 1, name: 'MPB', slug: 'mpb' },
        { id: 2, name: 'Rock', slug: 'rock' },
        { id: 3, name: 'Jazz', slug: 'jazz' }
      ]
    }
  })
  @Get()
  async findAll() {
    return this.genreService.findAll();
  }
}

