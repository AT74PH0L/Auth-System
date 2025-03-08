import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  findByEmail(email: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(Users) private readonly userRepository: typeof Users,
  ) {}

  create = async (userBody: CreateUserDto) => {
    const existingUser = await this.userRepository.findOne({
      where: { email: userBody.email },
    });

    if (existingUser) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Email already exists',
      });
    }

    if (userBody.password != userBody.confirmPassword) {
      throw new Error('password incorrect');
    }

    await this.userRepository.create({
      username: userBody.username,
      email: userBody.email,
      password: userBody.password,
      googleId: userBody.googleId || null,
      picture: userBody.picture || null,
    });

    return { message: 'Create success' };
  };

  getUserByEmail = async (email: string) => {
    const result = await this.userRepository.findOne({
      where: { email: email },
    });
    return result;
  };
}
