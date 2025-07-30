import type { AccountType } from "src/users/entities/user.entity";
// Esta DTO representa a resposta que o backend dá para o NextAuth.js
// Nao incluiremos accessToken aqui, pois o NextAuth.js cuidara da sessao
export class AuthResponseDto {
  id: string;
  fullName: string;
  email: string;
  accountType: AccountType;
  picture?: string; // Opcional: incluir URL da imagem de perfil
}