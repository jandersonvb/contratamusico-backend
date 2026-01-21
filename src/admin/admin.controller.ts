import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam, ApiQuery } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('Admin')
@Controller('admin')
@UseGuards(JwtAuthGuard, AdminGuard)
@UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ 
    summary: 'Dashboard administrativo',
    description: 'Retorna métricas gerais da plataforma (apenas admin)' 
  })
  @ApiBearerAuth()
  @ApiResponse({ 
    status: 200, 
    description: 'Métricas do dashboard',
    schema: {
      example: {
        totalUsers: 150,
        totalMusicians: 45,
        totalClients: 105,
        totalBookings: 89,
        activeSubscriptions: 32,
        monthlyRevenue: 159800,
        recentSignups: [],
        recentBookings: []
      }
    }
  })
  @ApiResponse({ status: 403, description: 'Acesso negado (não é admin)' })
  @Get('dashboard')
  async getDashboard() {
    return this.adminService.getDashboard();
  }

  @ApiOperation({ 
    summary: 'Listar usuários',
    description: 'Lista todos os usuários com paginação (apenas admin)' 
  })
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lista de usuários' })
  @Get('users')
  async getUsers(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedPage = page ? parseInt(page, 10) : 1;
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    return this.adminService.getUsers(parsedPage, parsedLimit);
  }

  @ApiOperation({ 
    summary: 'Listar músicos',
    description: 'Lista todos os músicos com paginação (apenas admin)' 
  })
  @ApiBearerAuth()
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lista de músicos' })
  @Get('musicians')
  async getMusicians(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const parsedPage = page ? parseInt(page, 10) : 1;
    const parsedLimit = limit ? parseInt(limit, 10) : 20;
    return this.adminService.getMusicians(parsedPage, parsedLimit);
  }

  @ApiOperation({ 
    summary: 'Destacar/remover destaque de músico',
    description: 'Toggle do status de destaque de um músico (apenas admin)' 
  })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: Number, description: 'ID do perfil do músico' })
  @ApiResponse({ status: 200, description: 'Status atualizado' })
  @Patch('musicians/:id/featured')
  async toggleFeatured(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.toggleFeaturedMusician(id);
  }
}

