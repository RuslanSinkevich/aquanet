// src/connection-points/connection-points.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConnectionPointsService } from './connection-points.service';
import { ConnectionPointsController } from './connection-points.controller';
import { ConnectionPoint } from '../models/connection-point.model';
import { User } from '../users/users.model';
import { WorkItem } from '../models/work-item.model';
import { UserConnectionPoint } from '../models/user-connection-point.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      ConnectionPoint,
      User,
      WorkItem,
      UserConnectionPoint
    ]),
  ],
  controllers: [ConnectionPointsController],
  providers: [ConnectionPointsService],
  exports: [ConnectionPointsService],
})
export class ConnectionPointsModule {}
