import { IsString, Length, IsNotEmpty } from 'class-validator';

export class SigninUserDto {
  @IsString()
  @Length(1, 64)
  @IsNotEmpty()
  username: string;

  @IsString()
  @Length(2)
  @IsNotEmpty()
  password: string;
}
