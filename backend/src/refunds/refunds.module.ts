import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefundsService } from './refunds.service';
import { RefundsController } from './refunds.controller';
import { Refund } from '../models/refund.model';

@Module({
  imports: [SequelizeModule.forFeature([Refund])],
  controllers: [RefundsController],
  providers: [RefundsService],
  exports: [RefundsService],
})
export class RefundsModule {} 