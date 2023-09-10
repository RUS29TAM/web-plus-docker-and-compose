import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { HashService } from '../hash/hash.service';
import { ServerException } from '../exceptions/server.exception';
import { ErrorCode } from '../exceptions/errors';
import { SignupUserRespDto } from '../users/dto/signup-user-resp.dto';
import { SigninUserRespDto } from '../users/dto/signin-user-resp.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly hashService: HashService,
  ) {}

  async auth(user: User): Promise<SigninUserRespDto> {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(
    username: string,
    password: string,
  ): Promise<SignupUserRespDto> {
    const user = await this.usersService.findByUserName(username);

    if (!user) {
      throw new ServerException(ErrorCode.LoginOrPasswordIncorrect);
    }

    const isValid = await this.hashService.comparePassword(
      password,
      user.password,
    );

    if (!isValid) {
      throw new ServerException(ErrorCode.LoginOrPasswordIncorrect);
    } else {
      const { password, ...result } = user;
      return result;
    }
  }
}
