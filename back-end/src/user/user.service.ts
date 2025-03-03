import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  findOne(username: string) {
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
      return { message: 'User already exists' };
    }

    await this.userRepository.create({
      fname: userBody.fname,
      email: userBody.email,
      password: userBody.password,
    });

    return { message: 'Create success' };
  };

  getUserByEmail = async (email: string) => {
    return await this.userRepository.findOne({ where: { email: email } });
  };
}
