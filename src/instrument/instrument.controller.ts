import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InstrumentService } from './instrument.service';

@ApiTags('Instrumentos')
@Controller('instruments')
export class InstrumentController {
  constructor(private readonly instrumentService: InstrumentService) {}

  @ApiOperation({ 
    summary: 'Listar todos os instrumentos',
    description: 'Retorna lista completa de instrumentos disponíveis na plataforma' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de instrumentos',
    schema: {
      example: [
        { id: 1, name: 'Violão', slug: 'violao' },
        { id: 2, name: 'Guitarra', slug: 'guitarra' },
        { id: 3, name: 'Piano', slug: 'piano' }
      ]
    }
  })
  @Get()
  async findAll() {
    return this.instrumentService.findAll();
  }
}

