import { Controller, Get, Param, Patch, Body, Delete, HttpCode, HttpStatus, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Exemplo: Obter perfil do usuário logado
  @UseGuards(JwtAuthGuard) // Protege esta rota
  @Get('me')
  async getMyProfile(@Request() req: any) {
    // req.user é populado pelo JwtAuthGuard com os dados do JWT payload
    const user = await this.usersService.findOneById(req.user.id);

    if (!user) {
      throw new NotFoundException('Perfil do usuário não encontrado.');
    }

    // O service já retorna sem a senha.
    return user;
  }

  // Exemplo: Obter qualquer usuário por ID (apenas para fins demonstrativos, pode precisar de autorização)
  @Public() // Marca esta rota como pública por enquanto (para testes sem JWT)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }
    return user; // O service já retorna sem a senha.
  }

  // Exemplo: Atualizar perfil do usuário
  @UseGuards(JwtAuthGuard)
  @Patch('me') // Rota para atualizar o próprio perfil
  async updateMyProfile(@Request() req: any, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  // Exemplo: Excluir o próprio usuário (com cuidado em produção, preferir soft delete)
  @UseGuards(JwtAuthGuard)
  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeMyProfile(@Request() req: any) {
    await this.usersService.remove(req.user.id);
  }

  // Rotas como POST /users (criação) e GET /users (listar todos) seriam para ADMINS e protegidas
  // ou a criação via AuthModule (signup).
}