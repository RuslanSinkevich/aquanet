import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WorkItem } from '../models/work-item.model';

@Injectable()
export class WorkItemsService {
  constructor(
    @InjectModel(WorkItem)
    private workItemModel: typeof WorkItem,
  ) {}

  async findAll() {
    return this.workItemModel.findAll();
  }

  async findOne(id: number) {
    return this.workItemModel.findByPk(id);
  }

  async create(data: any) {
    return this.workItemModel.create(data);
  }

  async update(id: number, data: any) {
    const workItem = await this.workItemModel.findByPk(id);
    if (workItem) {
      return workItem.update(data);
    }
    return null;
  }

  async remove(id: number) {
    const workItem = await this.workItemModel.findByPk(id);
    if (workItem) {
      await workItem.destroy();
      return true;
    }
    return false;
  }
} 