// src/connection-points/connection-points.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ConnectionPoint } from '../models/connection-point.model';
import { Client } from '../models/client.model';
import { WorkItem } from '../models/work-item.model';
import { UtilitySegment } from '../models/utility-segment.model';
import { CreateConnectionPointDto } from './dto/create-connection-point.dto';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UpdateConnectionPointDto } from './dto/update-connection-point.dto';

@Injectable()
export class ConnectionPointsService {
  constructor(
    @InjectModel(ConnectionPoint)
    private connectionPointModel: typeof ConnectionPoint,
    @InjectModel(Client)
    private clientModel: typeof Client,
    @InjectModel(WorkItem)
    private workItemModel: typeof WorkItem,
    @InjectModel(UtilitySegment)
    private utilitySegmentModel: typeof UtilitySegment,
    private sequelize: Sequelize,
  ) {}

  async create(createDto: CreateConnectionPointDto, transaction?: Transaction) {
    return this.connectionPointModel.create(createDto, { transaction });
  }

  async findAll() {
    return this.connectionPointModel.findAll({
      include: [
        {
          model: Client,
          through: { attributes: [] },
        },
        {
          model: WorkItem,
        },
        {
          model: UtilitySegment,
          as: 'outgoingSegments',
        },
        {
          model: UtilitySegment,
          as: 'incomingSegments',
        },
      ],
    });
  }

  async findOne(id: number) {
    const point = await this.connectionPointModel.findByPk(id, {
      include: [
        {
          model: Client,
          through: { attributes: [] },
        },
        {
          model: WorkItem,
        },
        {
          model: UtilitySegment,
          as: 'outgoingSegments',
        },
        {
          model: UtilitySegment,
          as: 'incomingSegments',
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
    return point.update(updateDto, { transaction });
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
          model: Client,
          attributes: ['id'],
        },
      ],
      transaction,
    });

    if (!point || !point.clients || point.clients.length === 0) {
      return null;
    }

    // Базовая доля для каждого клиента
    const baseShare = 1 / point.clients.length;

    // Возвращаем массив с долями для каждого клиента
    return point.clients.map(client => ({
      clientId: client.id,
      share: baseShare,
      amount: point.totalCost * baseShare,
    }));
  }

  async recalculateShares(connectionPointId: number, transaction?: Transaction) {
    const shares = await this.calculateClientShares(connectionPointId, transaction);
    if (!shares) {
      return null;
    }

    // Здесь должна быть логика обновления долей в таблице clients_connection_points
    // и создания записей в payment_audit
    // TODO: Реализовать позже

    return shares;
  }
}
