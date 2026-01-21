import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { LocationService, IBGEState, IBGECity } from './location.service';

@ApiTags('Localização')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @ApiOperation({ 
    summary: 'Listar estados brasileiros',
    description: 'Retorna todos os 27 estados (UFs) do Brasil' 
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de estados',
    schema: {
      example: [
        { id: 35, sigla: 'SP', nome: 'São Paulo' },
        { id: 33, sigla: 'RJ', nome: 'Rio de Janeiro' }
      ]
    }
  })
  @Get('states')
  async getStates(): Promise<IBGEState[]> {
    return this.locationService.getStates();
  }

  @ApiOperation({ 
    summary: 'Listar cidades de um estado',
    description: 'Retorna todas as cidades de um estado específico' 
  })
  @ApiParam({ name: 'uf', type: String, description: 'Sigla do estado (ex: SP, RJ, MG)' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de cidades',
    schema: {
      example: [
        { id: 3550308, nome: 'São Paulo' },
        { id: 3509502, nome: 'Campinas' }
      ]
    }
  })
  @Get('cities/:uf')
  async getCitiesByState(@Param('uf') uf: string): Promise<IBGECity[]> {
    return this.locationService.getCitiesByState(uf);
  }
}
