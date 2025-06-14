import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WorkItemsService } from './work-items.service';
import { WorkItemsController } from './work-items.controller';
import { WorkItem } from '../models/work-item.model';

@Module({
  imports: [SequelizeModule.forFeature([WorkItem])],
  controllers: [WorkItemsController],
  providers: [WorkItemsService],
  exports: [WorkItemsService],
})
export class WorkItemsModule {} 