import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { UserPayload } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  login(
    @Request() req: { body: UserPayload },
    @Res({ passthrough: true }) res: Response,
  ): { message: string } {
    if (!req.body) {
      throw new Error('Invalid user data');
    }

    const { access_token } = this.authService.login(req.body);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
    });

    return { message: 'Login successful' };
  }
}
