import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../models/user.model';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  create(createClientDto: any) {
    return this.userModel.create(createClientDto);
  }

  findAll() {
    return this.userModel.findAll({
      attributes: ['id', 'firstName', 'lastName', 'phone', 'houseNumber', 'role', 'isConfirmed', 'banned']
    });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, {
      attributes: ['id', 'firstName', 'lastName', 'phone', 'houseNumber', 'role', 'isConfirmed', 'banned']
    });
  }

  async update(id: number, updateClientDto: any) {
    const user = await this.findOne(id);
    return user.update(updateClientDto);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return user.destroy();
  }
} 