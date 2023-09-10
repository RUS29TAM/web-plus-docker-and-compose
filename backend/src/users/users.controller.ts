import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserProfileRespDto } from './dto/user-profile-resp.dto';
import { PasswordUserInterceptor } from '../interceptors/password-user.interceptor';
import { InvalidDataExceptionFilter } from '../filter/invalid-data-exception.filter';
import { PasswordWishInterceptor } from '../interceptors/password-wish.interceptor';
import { Wish } from '../wishes/entities/wish.entity';
import { UserWishesDto } from './dto/user-wishes.dto';
import { UserPublicProfileRespDto } from './dto/user-public-profile-resp.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(PasswordUserInterceptor)
  @Get('me')
  async findCurrentUser(
    @Request() { user: { id } },
  ): Promise<UserProfileRespDto> {
    return await this.usersService.findById(id);
  }

  @UseInterceptors(PasswordWishInterceptor)
  @Get('me/wishes')
  async findCurrentUserWishes(@Request() { user: { id } }): Promise<Wish[]> {
    const relations = ['wishes', 'wishes.owner', 'wishes.offers'];
    return await this.usersService.findWishes(id, relations);
  }

  @UseInterceptors(PasswordUserInterceptor)
  @Post('find')
  async searchUser(
    @Body() { query }: FindUserDto,
  ): Promise<UserProfileRespDto[]> {
    return await this.usersService.search(query);
  }

  @UseInterceptors(PasswordUserInterceptor)
  @Get(':username')
  async findUser(
    @Param('username') username: string,
  ): Promise<UserPublicProfileRespDto> {
    return await this.usersService.findByUserName(username);
  }

  @UseInterceptors(PasswordWishInterceptor)
  @Get(':username/wishes')
  async findUserWishes(
    @Param('username') username: string,
  ): Promise<UserWishesDto[]> {
    const { id } = await this.usersService.findByUserName(username);
    const relations = ['wishes', 'wishes.owner', 'wishes.offers'];
    return await this.usersService.findWishes(id, relations);
  }

  @Patch('me')
  @UseFilters(InvalidDataExceptionFilter)
  @UseInterceptors(PasswordUserInterceptor)
  async updateCurrentUser(
    @Request() { user: { id } },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserProfileRespDto> {
    return await this.usersService.update(id, updateUserDto);
  }
}
