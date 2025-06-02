// src/connection-points/connection-points.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConnectionPointsService } from './connection-points.service';
import { ConnectionPointsController } from './connection-points.controller';
import { ConnectionPoint } from '../models/connection-point.model';
import { Client } from '../models/client.model';
import { WorkItem } from '../models/work-item.model';
import { UtilitySegment } from '../models/utility-segment.model';
import { ClientConnectionPoint } from '../models/client-connection-point.model';
import { SegmentPayment } from '../models/segment-payment.model';
import { PaymentAudit } from '../models/payment-audit.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ConnectionPoint,
      Client,
      WorkItem,
      UtilitySegment,
      ClientConnectionPoint,
      SegmentPayment,
      PaymentAudit
    ]),
  ],
  controllers: [ConnectionPointsController],
  providers: [ConnectionPointsService],
  exports: [ConnectionPointsService],
})
export class ConnectionPointsModule {}
