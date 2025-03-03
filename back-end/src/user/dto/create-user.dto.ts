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
    fname: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(2, 50)
    password: string;
  }