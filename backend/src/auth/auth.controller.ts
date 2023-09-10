import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SigninUserRespDto } from '../users/dto/signin-user-resp.dto';
import { SignupUserRespDto } from '../users/dto/signup-user-resp.dto';
import { LocalGuard } from './guards/local.guard';
import { PasswordUserInterceptor } from '../interceptors/password-user.interceptor';
import { InvalidDataExceptionFilter } from '../filter/invalid-data-exception.filter';

@UseFilters(InvalidDataExceptionFilter)
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Request() { user }): Promise<SigninUserRespDto> {
    return await this.authService.auth(user);
  }

  @UseInterceptors(PasswordUserInterceptor)
  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<SignupUserRespDto> {
    return await this.usersService.create(createUserDto);
  }
}
