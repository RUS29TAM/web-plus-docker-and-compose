import {
  IsEmail,
  IsInt,
  IsString,
  IsUrl,
  Length,
  IsDate,
} from 'class-validator';

export class UserProfileRespDto {
  @IsInt()
  id: number;

  @Length(1, 64)
  @IsString()
  username: string;

  @Length(1, 200)
  @IsString()
  about: string;

  @IsUrl()
  avatar: string;

  @IsEmail()
  email: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
