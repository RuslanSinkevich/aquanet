import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UtilitySegmentsService } from './utility-segments.service';
import { UtilitySegmentsController } from './utility-segments.controller';
import { UtilitySegment } from '../models/utility-segment.model';
import { SegmentPayment } from '../models/segment-payment.model';
import { Client } from '../models/client.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      UtilitySegment,
      SegmentPayment,
      Client,
    ]),
  ],
  controllers: [UtilitySegmentsController],
  providers: [UtilitySegmentsService],
  exports: [UtilitySegmentsService],
})
export class UtilitySegmentsModule {} 