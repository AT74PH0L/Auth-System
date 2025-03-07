import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  HttpCode,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './gard/local-auth.guard';
import { UserPayload } from './auth.service';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { RolesGuard } from './gard/roles.gard';
import { JwtAuthGard } from './gard/jwt-auth.gard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  async login(
    @Request() req: { body: UserPayload },
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string; }> {
    if (!req.body) {
      throw new Error('Invalid user data');
    }

    const { access_token } = await this.authService.login(req.body);
    res.cookie('access_token', access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
    });

    return { message: 'Login successful' };
  }
  @Get('/role')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGard, RolesGuard)
  checkRole() {
    const result = this.authService.mock();
    return result;
  }
}
