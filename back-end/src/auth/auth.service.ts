import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
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

  async googleLogin(req): Promise<any> {
    if (!req.user) {
      throw new Error('Google login failed: No user information received.');
    }

    const { email, name, picture, googleId } = req.user;
    let user = await this.usersService.getUserByEmail(email);

    if (!user) {
      await this.usersService.create({
        username: name,
        email: email,
        password: '',
        confirmPassword: '',
        googleId: googleId || null,
        picture: picture || null,
      });
    }
    const payload = { email: email, role: user?.role ?? 'user' };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async mock() {
    return 'Admin page';
  }
}

export interface UserPayload {
  email: string;
  username: string;
}
