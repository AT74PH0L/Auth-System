import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Res,
} from '@nestjs/common';
// import { Request } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGard } from '../auth/gard/jwt-auth.gard';
import { json } from 'sequelize';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGard)
  async getProfile(@Request() req, @Res() res: Response) {
    const user = await this.userService.getUserByEmail(req.user.email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { password, ...result } = user.toJSON();
    return res.json(result);
  }
}
