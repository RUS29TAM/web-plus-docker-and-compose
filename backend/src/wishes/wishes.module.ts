import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { User } from '../users/entities/user.entity';
import { Offer } from '../offers/entities/offer.entity';
import { Wish } from './entities/wish.entity';
import { Wishlist } from '../wishlists/entities/wishlist.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Wish, Offer, Wishlist]),
    UsersModule,
  ],
  controllers: [WishesController],
  providers: [WishesService],
  exports: [WishesService],
})
export class WishesModule {}
