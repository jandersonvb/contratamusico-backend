// src/auth/dto/auth-response.dto.ts
import { AccountType } from '../../users/entities/user.entity';

export class AuthResponseDto {
  accessToken: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    accountType: AccountType;
  };
}