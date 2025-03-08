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
import { AuthService, UserPayload } from './auth.service';
import { LocalAuthGuard } from './gard/local-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../auth/roles/role.enum';
import { RolesGuard } from './gard/roles.gard';
import { JwtAuthGard } from './gard/jwt-auth.gard';
import { GoogleAuthGuard } from './gard/google-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  async login(
    @Request() req: { body: UserPayload },
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
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
  async checkRole() {
    const result = await this.authService.mock();
    return result;
  }

  // เพิ่มส่วนที่เกี่ยวกับ google
  @Get('/google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth(@Request() req) {
    // Initiates the Google OAuth process
  }

  @Get('/google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Request() req, @Res() res: Response) {
    const { accessToken } = await this.authService.googleLogin(req);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
    });
    res.redirect('/user/profile');
  }

  // เพิ่ม logout
  @Get('/logout')
  async logout(@Request() req, @Res() res: Response) {
    res.clearCookie('jwt token', {
      httpOnly: true,
    });
    return res.json({ message: 'Successfully logged out' });
  }
}
