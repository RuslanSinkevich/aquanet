import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MaterialsService } from './materials.service';
import { MaterialsController } from './materials.controller';
import { Material } from '../models/material.model';

@Module({
  imports: [SequelizeModule.forFeature([Material])],
  controllers: [MaterialsController],
  providers: [MaterialsService],
  exports: [MaterialsService],
})
export class MaterialsModule {} 