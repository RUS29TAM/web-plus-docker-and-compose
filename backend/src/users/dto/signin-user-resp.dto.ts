import { IsString } from 'class-validator';

export class SigninUserRespDto {
  @IsString()
  access_token: string;
}
