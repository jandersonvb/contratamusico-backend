// src/users/users.controller.ts
import { Controller, Get, Param, Patch, Body, Delete, HttpCode, HttpStatus, Request, NotFoundException, BadRequestException, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/auth/decorators/public.decorator'; // Mantém o decorador Public

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * Endpoint para obter o perfil de um usuário pelo seu ID.
   * Este endpoint pode ser chamado por Server Actions/API Routes do Next.js.
   * A autenticação de que o usuário logado pode ver este perfil é feita no frontend Next.js.
   * @param id O ID do usuário a ser buscado.
   * @returns O objeto User (sem senha).
   */
  @Public() // Para desenvolvimento, acessível publicamente ou via API Key no futuro.
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(`Usuário com ID "${id}" não encontrado.`);
    }
    // O service já retorna sem a senha e social IDs, garantindo que não há dados sensíveis.
    return user;
  }

  /**
   * Endpoint para obter o perfil do usuário logado.
   * Este endpoint será chamado por uma API Route/Server Action no Next.js,
   * que passará o ID do usuário da sessão do NextAuth.js.
   * @param reqBody O corpo da requisição, contendo o ID do usuário logado.
   * @returns O objeto User (sem senha).
   */
  @Public() // Proteção principal no Next.js (Server Action/API Route)
  @Post('me') // Mudei para POST para enviar o ID no body (mais seguro que query param)
  @HttpCode(HttpStatus.OK)
  async getMyProfile(@Body('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('ID do usuário é obrigatório.');
    }
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new NotFoundException('Perfil do usuário não encontrado.');
    }
    return user;
  }


  /**
   * Endpoint para atualizar o perfil de um usuário.
   * Chamado por Server Actions/API Routes no Next.js, passando o ID do usuário.
   * @param id O ID do usuário a ser atualizado.
   * @param updateUserDto Os dados para atualização.
   * @param reqBody O corpo da requisição, contendo o ID do usuário logado (para verificação).
   * @returns O objeto User atualizado (sem senha).
   */
  @Public() // Proteção principal no Next.js (Server Action/API Route)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Body('loggedInUserId') loggedInUserId?: string // ID do usuário logado para autorização
  ) {
    // No Server Action/API Route do Next.js, você faria a verificação:
    // se (loggedInUserId !== id) então `throw new UnauthorizedException()`.
    // Aqui no backend, podemos adicionar uma verificação de fallback ou confiar no frontend.
    if (loggedInUserId && loggedInUserId !== id) {
      throw new UnauthorizedException('Você não tem permissão para atualizar este perfil.');
    }

    const updatedUser = await this.usersService.update(id, updateUserDto);
    return updatedUser;
  }

  /**
   * Endpoint para remover um usuário.
   * Chamado por Server Actions/API Routes no Next.js.
   * @param id O ID do usuário a ser removido.
   * @param reqBody O corpo da requisição, contendo o ID do usuário logado (para verificação).
   * @returns Resultado da operação.
   */
  @Public() // Proteção principal no Next.js (Server Action/API Route)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
    @Body('loggedInUserId') loggedInUserId?: string // ID do usuário logado para autorização
  ) {
    if (loggedInUserId && loggedInUserId !== id) {
      throw new UnauthorizedException('Você não tem permissão para remover este perfil.');
    }
    await this.usersService.remove(id);
  }
}