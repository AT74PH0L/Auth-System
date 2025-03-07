// import {
//   IsNotEmpty,
//   IsNumber,
//   IsString,
//   Length,
//   Max,
//   Min,
// } from 'class-validator';

export class LoginDto {
  //   @IsString()
  //   @IsNotEmpty()
  //   @Length(2, 50)
  email: string;

  //   @IsString()
  //   @IsNotEmpty()
  //   @Length(2, 50)
  password: string;
}
