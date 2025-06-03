import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Refund } from '../models/refund.model';

@Injectable()
export class RefundsService {
  constructor(
    @InjectModel(Refund)
    private refundModel: typeof Refund,
  ) {}

  async findAll() {
    return this.refundModel.findAll();
  }

  async findOne(id: number) {
    return this.refundModel.findByPk(id);
  }

  async create(data: any) {
    return this.refundModel.create(data);
  }

  async update(id: number, data: any) {
    const refund = await this.refundModel.findByPk(id);
    if (refund) {
      return refund.update(data);
    }
    return null;
  }

  async remove(id: number) {
    const refund = await this.refundModel.findByPk(id);
    if (refund) {
      await refund.destroy();
      return true;
    }
    return false;
  }
} 