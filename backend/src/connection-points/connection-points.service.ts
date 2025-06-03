// src/connection-points/connection-points.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConnectionPoint } from '../models/connection-point.model';
import { User } from '../models/user.model';
import { WorkItem } from '../models/work-item.model';
import { CreateConnectionPointDto } from './dto/create-connection-point.dto';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UpdateConnectionPointDto } from './dto/update-connection-point.dto';

@Injectable()
export class ConnectionPointsService {
  constructor(
    @InjectModel(ConnectionPoint)
    private connectionPointModel: typeof ConnectionPoint,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(WorkItem)
    private workItemModel: typeof WorkItem,
    private sequelize: Sequelize,
  ) {}

  async create(createDto: CreateConnectionPointDto, transaction?: Transaction) {
    const dbData = {
      name: createDto.name,
      positionM: createDto.positionM,
      totalCost: createDto.totalCost,
      comment: createDto.comment
    };
    return this.connectionPointModel.create(dbData, { transaction });
  }

  async findAll() {
    const points = await this.connectionPointModel.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'phone', 'firstName', 'lastName', 'role'],
        },
        {
          model: WorkItem,
          attributes: ['id', 'description', 'cost', 'workDate'],
        },
      ],
    });
    return points;
  }

  async findOne(id: number) {
    const point = await this.connectionPointModel.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'phone', 'firstName', 'lastName', 'role'],
        },
        {
          model: WorkItem,
          attributes: ['id', 'description', 'cost', 'workDate'],
        },
      ],
    });
    if (!point) {
      return null;
    }
    return point;
  }

  async update(id: number, updateDto: UpdateConnectionPointDto, transaction?: Transaction) {
    const point = await this.connectionPointModel.findByPk(id, { transaction });
    if (!point) {
      return null;
    }
    const dbData = {
      name: updateDto.name,
      positionM: updateDto.positionM,
      totalCost: updateDto.totalCost,
      comment: updateDto.comment
    };
    return point.update(dbData, { transaction });
  }

  async remove(id: number, transaction?: Transaction) {
    const point = await this.connectionPointModel.findByPk(id, { transaction });
    if (!point) {
      return null;
    }
    await point.destroy({ transaction });
    return point;
  }

  async calculateClientShares(connectionPointId: number, transaction?: Transaction) {
    const point = await this.connectionPointModel.findByPk(connectionPointId, {
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'],
        },
      ],
      transaction,
    });

    if (!point || !point.users || point.users.length === 0) {
      return null;
    }

    const baseShare = 1 / point.users.length;

    return point.users.map(user => ({
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      share: baseShare,
      amount: point.totalCost * baseShare,
    }));
  }

  async recalculateShares(connectionPointId: number, transaction?: Transaction) {
    const shares = await this.calculateClientShares(connectionPointId, transaction);
    if (!shares) {
      return null;
    }

    return shares;
  }
}
