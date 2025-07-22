import type { AccountType } from "src/users/entities/user.entity";

export class AuthResponseDto {
  id: string;
  fullName: string;
  email: string;
  accountType: AccountType;
  picture?: string; // Opcional: incluir URL da imagem de perfil
}