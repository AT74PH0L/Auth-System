import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  username: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  confirmPassword: string;

  googleId: string;

  picture: string;
}
