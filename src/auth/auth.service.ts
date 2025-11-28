/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService, UserWithProfile } from 'src/user/user.service';
import { JwtPayload } from './strategies/jwt.strategy';

type SafeUser = Omit<UserWithProfile, 'passwordHash'>;

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }

  // 1. Valida o e-mail e a senha
  async validateUser(email: string, pass: string): Promise<SafeUser | null> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      return null;
    }

    // Compara a senha enviada com o hash no banco
    const isMatch = await bcrypt.compare(pass, user.passwordHash);

    if (isMatch) {
      // Retorna o objeto de usuário sem a senha
      const { passwordHash, ...result } = user;
      return result;
    }

    return null;
  }

  // 2. Geração do Token JWT
  async generateToken(user: SafeUser, rememberMe?: boolean) {
    const payload: JwtPayload = { email: user.email, sub: user.id.toString() };
    
    // Define tempo de expiração baseado em rememberMe
    // rememberMe: true -> 30 dias
    // rememberMe: false ou undefined -> 1 dia
    const expiresIn = rememberMe ? '30d' : '1d';
    
    return {
      access_token: this.jwtService.sign(payload, { expiresIn }),
      user: user,
    };
  }

}
