import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserPayload | null> {
    const user = await this.usersService.getUserByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toJSON();
      return result;
    }
    return null;
  }

  async login(body: UserPayload): Promise<{ access_token: string }> {
    const user = await this.usersService.getUserByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { email: body.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  mock() {
    return 'Admin page';
  }
}

export interface UserPayload {
  email: string;
  username: string;
}
