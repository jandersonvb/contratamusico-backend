import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { PlanService } from './plan.service';

@ApiTags('Planos de Assinatura')
@Controller('plans')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiOperation({ 
    summary: 'Listar planos disponíveis',
    description: 'Retorna lista de planos de assinatura, com opção de filtrar por tipo (músico ou cliente)' 
  })
  @ApiQuery({ name: 'type', required: false, enum: ['musician', 'client'], description: 'Tipo de plano' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de planos',
    schema: {
      example: [{
        id: 1,
        title: 'Básico',
        description: 'Perfeito para quem está começando',
        monthlyPrice: 0,
        yearlyPrice: 0,
        features: [
          { text: 'Perfil básico', available: true, highlight: false }
        ]
      }]
    }
  })
  @Get()
  async findAll(@Query('type') type?: 'musician' | 'client') {
    return this.planService.findAll(type);
  }

  @ApiOperation({ 
    summary: 'Obter detalhes de um plano',
    description: 'Retorna detalhes completos de um plano específico' 
  })
  @ApiParam({ name: 'id', type: Number, description: 'ID do plano' })
  @ApiResponse({ status: 200, description: 'Detalhes do plano' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado' })
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return this.planService.findById(id);
  }
}

