import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  async create(
    @Request() { user: { id } },
    @Body() createOfferDto: CreateOfferDto,
  ) {
    return await this.offersService.create(id, createOfferDto);
  }
}
