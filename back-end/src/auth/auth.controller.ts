import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @HttpCode(200)
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const { access_token } = await this.authService.login(req.user);
    //save to cookie
    res.cookie('access_token', access_token, {
      httpOnly: true,
    });
    // return { access_token };
    return { message: 'Login successful' };
  }
}
