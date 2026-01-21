import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { FaqService } from './faq.service';

@ApiTags('FAQ - Perguntas Frequentes')
@Controller('faq')
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @ApiOperation({ 
    summary: 'Listar FAQs',
    description: 'Retorna lista de perguntas frequentes, com opção de filtrar por categoria' 
  })
  @ApiQuery({ name: 'category', required: false, enum: ['PLANOS', 'GERAL', 'MUSICO'] })
  @ApiResponse({ status: 200, description: 'Lista de FAQs' })
  @Get()
  async findAll(@Query('category') category?: string) {
    return this.faqService.findAll(category);
  }

  @ApiOperation({ 
    summary: 'FAQs agrupadas por categoria',
    description: 'Retorna FAQs organizadas por categoria' 
  })
  @ApiResponse({ status: 200, description: 'FAQs agrupadas' })
  @Get('grouped')
  async findGrouped() {
    return this.faqService.findGroupedByCategory();
  }

  @ApiOperation({ 
    summary: 'Listar categorias disponíveis',
    description: 'Retorna lista de categorias de FAQ' 
  })
  @ApiResponse({ status: 200, description: 'Lista de categorias' })
  @Get('categories')
  async getCategories() {
    return this.faqService.getCategories();
  }
}

