// src/connection-points/connection-points.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConnectionPoint } from '../models/connection-point.model';
import { User } from '../models/user.model';
import { WorkItem } from '../models/work-item.model';
import { CreateConnectionPointDto } from './dto/create-connection-point.dto';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UpdateConnectionPointDto } from './dto/update-connection-point.dto';
import { UserConnectionPoint } from '../models/user-connection-point.model';

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
    @InjectModel(UserConnectionPoint)
    private userConnectionPointModel: typeof UserConnectionPoint,
  ) {}

  async create(createConnectionPointDto: CreateConnectionPointDto, transaction?: Transaction): Promise<ConnectionPoint> {
    const dbData = {
      name: createConnectionPointDto.name,
      positionM: createConnectionPointDto.positionM,
      totalCost: createConnectionPointDto.totalCost,
      comment: createConnectionPointDto.comment
    };
    const connectionPoint = await this.connectionPointModel.create(dbData, { transaction });
    return connectionPoint;
  }

  async findAll(): Promise<ConnectionPoint[]> {
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

  async findOne(id: number): Promise<ConnectionPoint> {
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
      throw new NotFoundException(`Connection point with ID ${id} not found`);
    }
    return point;
  }

  async update(id: number, updateConnectionPointDto: UpdateConnectionPointDto, transaction?: Transaction): Promise<ConnectionPoint> {
    const point = await this.findOne(id);
    const dbData = {
      name: updateConnectionPointDto.name,
      positionM: updateConnectionPointDto.positionM,
      totalCost: updateConnectionPointDto.totalCost,
      comment: updateConnectionPointDto.comment
    };
    await point.update(dbData, { transaction });
    return point;
  }

  async remove(id: number, transaction?: Transaction): Promise<void> {
    const point = await this.findOne(id);
    await point.destroy({ transaction });
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

  async addUser(connectionPointId: number, userId: number): Promise<void> {
    await this.findOne(connectionPointId);
    await this.userConnectionPointModel.create({
      connectionPointId,
      userId,
    });
  }

  async removeUser(connectionPointId: number, userId: number): Promise<void> {
    await this.findOne(connectionPointId);
    await this.userConnectionPointModel.destroy({
      where: {
        connectionPointId,
        userId,
      },
    });
  }

  async getUsers(connectionPointId: number): Promise<User[]> {
    const connectionPoint = await this.findOne(connectionPointId);
    return connectionPoint.users;
  }
}
