// clients.module.ts
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ClientsController } from "./clients.controller";
import { ClientsService } from "./clients.service";
import { Client } from "../models/client.model";
import { ClientConnectionPoint } from "../models/client-connection-point.model";
import { SegmentPayment } from "../models/segment-payment.model";
import { ConnectionPointsModule } from "../connection-points/connection-points.module";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Client,
      ClientConnectionPoint,
      SegmentPayment,
    ]),
    ConnectionPointsModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
