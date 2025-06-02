// clients.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Client } from '../models/client.model';
import { ConnectionPoint } from '../models/connection-point.model';
import { SegmentPayment } from '../models/segment-payment.model';
import { ClientConnectionPoint } from '../models/client-connection-point.model';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ConnectionPointsService } from '../connection-points/connection-points.service';

@Injectable()
export class ClientsService {
  constructor(
    @InjectModel(Client)
    private clientModel: typeof Client,
    @InjectModel(ClientConnectionPoint)
    private clientConnectionPointModel: typeof ClientConnectionPoint,
    @InjectModel(SegmentPayment)
    private segmentPaymentModel: typeof SegmentPayment,
    private connectionPointsService: ConnectionPointsService,
    private sequelize: Sequelize,
  ) {}

  async create(createDto: CreateClientDto) {
    const transaction = await this.sequelize.transaction();

    try {
      // Создаем клиента без прямой связи с точкой подключения
      const client = await this.clientModel.create({
        firstName: createDto.firstName,
        lastName: createDto.lastName,
        phone: createDto.phone,
        houseNumber: createDto.houseNumber,
        positionM: createDto.positionM,
      }, { transaction });

      // Если указана точка подключения, создаем связь через промежуточную таблицу
      if (createDto.connectionPointId) {
        const connectionPoint = await this.connectionPointsService.findOne(
          createDto.connectionPointId,
        );

        if (connectionPoint) {
          // Создаем запись о подключении клиента к точке
          await this.clientConnectionPointModel.create(
            {
              clientId: client.id,
              connectionPointId: connectionPoint.id,
              isInitial: true,
              paymentShare: 0, // Будет рассчитано позже
            },
            { transaction },
          );

          // Если нужно перераспределить стоимость
          if (connectionPoint.redistributeOnJoin) {
            await this.connectionPointsService.recalculateShares(
              connectionPoint.id,
              transaction,
            );
          }
        }
      }

      await transaction.commit();
      return client;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findAll() {
    return this.clientModel.findAll({
      include: [
        {
          model: ConnectionPoint,
          through: { 
            attributes: ['paymentShare', 'isInitial', 'joinedAt'] 
          }
        },
        {
          model: SegmentPayment,
          attributes: ['segmentId', 'share', 'amount'],
        },
      ],
    });
  }

  async findOne(id: number) {
    return this.clientModel.findByPk(id, {
      include: [
        {
          model: ConnectionPoint,
          through: { 
            attributes: ['paymentShare', 'isInitial', 'joinedAt'] 
          }
        },
        {
          model: SegmentPayment,
          attributes: ['segmentId', 'share', 'amount'],
        },
      ],
    });
  }

  async update(id: number, updateDto: UpdateClientDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const client = await this.clientModel.findByPk(id, { transaction });
      if (!client) {
        await transaction.rollback();
        return null;
      }

      // Обновляем основные данные клиента
      await client.update({
        firstName: updateDto.firstName,
        lastName: updateDto.lastName,
        phone: updateDto.phone,
        houseNumber: updateDto.houseNumber,
        positionM: updateDto.positionM,
      }, { transaction });

      // Если меняется точка подключения
      if (updateDto.connectionPointId) {
        // Получаем текущие связи клиента с точками подключения
        const currentConnections = await this.clientConnectionPointModel.findAll({
          where: { clientId: client.id },
          transaction,
        });

        // Проверяем, есть ли уже связь с новой точкой
        const existingConnection = currentConnections.find(
          conn => conn.connectionPointId === updateDto.connectionPointId
        );

        if (!existingConnection) {
          // Создаем новую связь
          const newConnectionPoint = await this.connectionPointsService.findOne(
            updateDto.connectionPointId,
          );

          if (newConnectionPoint) {
            await this.clientConnectionPointModel.create(
              {
                clientId: client.id,
                connectionPointId: newConnectionPoint.id,
                isInitial: false,
                paymentShare: 0, // Будет рассчитано позже
              },
              { transaction },
            );

            // Пересчитываем доли для новой точки
            if (newConnectionPoint.redistributeOnJoin) {
              await this.connectionPointsService.recalculateShares(
                newConnectionPoint.id,
                transaction,
              );
            }
          }
        }
      }

      await transaction.commit();
      return client;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id: number) {
    const transaction = await this.sequelize.transaction();

    try {
      const client = await this.clientModel.findByPk(id, {
        include: [
          {
            model: ConnectionPoint,
            through: { attributes: ['connectionPointId'] },
          },
        ],
        transaction,
      });

      if (!client) {
        await transaction.rollback();
        return null;
      }

      // Сохраняем ID точек подключения для пересчета
      const connectionPointIds = client.connectionPoints.map((cp) => cp.id);

      await client.destroy({ transaction });

      // Пересчитываем доли для всех затронутых точек подключения
      for (const cpId of connectionPointIds) {
        await this.connectionPointsService.recalculateShares(cpId, transaction);
      }

      await transaction.commit();
      return client;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
