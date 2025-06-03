import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from '../models/payment.model';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment)
    private paymentModel: typeof Payment,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return this.paymentModel.create(createPaymentDto);
  }

  async findAll() {
    return this.paymentModel.findAll();
  }

  async findOne(id: number) {
    return this.paymentModel.findByPk(id);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      return null;
    }
    return payment.update(updatePaymentDto);
  }

  async remove(id: number) {
    const payment = await this.paymentModel.findByPk(id);
    if (!payment) {
      return null;
    }
    await payment.destroy();
    return payment;
  }
} 