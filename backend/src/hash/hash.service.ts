import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class HashService {
  async getHash(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    return await hash(password, salt);
  }

  async getUserWithHash<T extends { password?: string }>(
    createUserDto: T,
  ): Promise<Omit<T, 'password'> & { password: string }> {
    const { password, ...rest } = createUserDto;
    const hashedPassword = await this.getHash(password);
    return {
      ...rest,
      password: hashedPassword,
    };
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await compare(password, hash);
  }
}
