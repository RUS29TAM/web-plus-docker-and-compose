import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { WishesService } from '../wishes/wishes.service';
import { ServerException } from '../exceptions/server.exception';
import { ErrorCode } from '../exceptions/errors';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private usersService: UsersService,
    private wishesService: WishesService,
    private readonly dataSource: DataSource,
  ) {}

  async create(userId, createOfferDto: CreateOfferDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const item = await this.wishesService.findById(createOfferDto.itemId);

      if (userId === item.owner.id) {
        throw new ServerException(ErrorCode.OfferForbidden);
      }

      const user = await this.usersService.findById(item.owner.id);

      const totalRaised = Number(
        (item.raised + createOfferDto.amount).toFixed(2),
      );

      if (totalRaised > item.price) {
        throw new ServerException(ErrorCode.RaisedForbidden);
      }

      await this.wishesService.raisedUpdate(createOfferDto.itemId, {
        raised: totalRaised,
      });

      const offer = await this.offerRepository.save({
        ...createOfferDto,
        item,
        user,
      });

      delete item.owner.password;
      delete user.password;

      return offer;
    } catch (err) {
      throw err;
    } finally {
      await queryRunner.release();
    }
  }
}
