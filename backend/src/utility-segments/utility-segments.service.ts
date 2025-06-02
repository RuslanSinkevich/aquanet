import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';
import { UtilitySegment } from '../models/utility-segment.model';
import { SegmentPayment } from '../models/segment-payment.model';
import { Client } from '../models/client.model';
import { CreateUtilitySegmentDto } from './dto/create-utility-segment.dto';
import { UpdateUtilitySegmentDto } from './dto/update-utility-segment.dto';

@Injectable()
export class UtilitySegmentsService {
  constructor(
    @InjectModel(UtilitySegment)
    private utilitySegmentModel: typeof UtilitySegment,
    @InjectModel(SegmentPayment)
    private segmentPaymentModel: typeof SegmentPayment,
    @InjectModel(Client)
    private clientModel: typeof Client,
    private sequelize: Sequelize,
  ) {}

  async create(createDto: CreateUtilitySegmentDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const segment = await this.utilitySegmentModel.create(createDto, { transaction });

      // Находим всех клиентов, которые должны оплачивать этот сегмент
      const clients = await this.findAffectedClients(segment.id);
      
      if (clients.length > 0) {
        // Базовая доля для каждого клиента
        const baseShare = 1 / clients.length;
        const baseAmount = segment.cost * baseShare;

        // Создаем записи об оплате для каждого клиента
        await Promise.all(
          clients.map((client) =>
            this.segmentPaymentModel.create(
              {
                clientId: client.id,
                segmentId: segment.id,
                share: baseShare,
                amount: baseAmount,
              },
              { transaction },
            ),
          ),
        );
      }

      await transaction.commit();
      return segment;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findAll() {
    return this.utilitySegmentModel.findAll({
      include: [
        {
          model: SegmentPayment,
          include: [
            {
              model: Client,
              attributes: ['id', 'firstName', 'lastName', 'houseNumber'],
            },
          ],
        },
      ],
    });
  }

  async findOne(id: number) {
    return this.utilitySegmentModel.findByPk(id, {
      include: [
        {
          model: SegmentPayment,
          include: [
            {
              model: Client,
              attributes: ['id', 'firstName', 'lastName', 'houseNumber'],
            },
          ],
        },
      ],
    });
  }

  async update(id: number, updateDto: UpdateUtilitySegmentDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const segment = await this.utilitySegmentModel.findByPk(id, { transaction });
      if (!segment) {
        await transaction.rollback();
        return null;
      }

      await segment.update(updateDto, { transaction });

      // Если изменилась стоимость, пересчитываем суммы для всех клиентов
      if (updateDto.cost && updateDto.cost !== segment.cost) {
        const payments = await this.segmentPaymentModel.findAll({
          where: { segmentId: segment.id },
          transaction,
        });

        await Promise.all(
          payments.map((payment) =>
            payment.update(
              {
                amount: updateDto.cost * payment.share,
              },
              { transaction },
            ),
          ),
        );
      }

      await transaction.commit();
      return segment;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async remove(id: number) {
    const transaction = await this.sequelize.transaction();

    try {
      const segment = await this.utilitySegmentModel.findByPk(id, { transaction });
      if (!segment) {
        await transaction.rollback();
        return null;
      }

      await segment.destroy({ transaction });
      await transaction.commit();
      return segment;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  private async findAffectedClients(segmentId: number) {
    const segment = await this.utilitySegmentModel.findByPk(segmentId);
    if (!segment) {
      return [];
    }

    // Находим всех клиентов, чьи точки подключения находятся после данного сегмента
    // Логика определения зависит от конкретной структуры сети
    // TODO: Реализовать правильную логику поиска затронутых клиентов
    return this.clientModel.findAll();
  }

  async recalculateShares(segmentId: number) {
    const transaction = await this.sequelize.transaction();

    try {
      const segment = await this.utilitySegmentModel.findByPk(segmentId, { transaction });
      if (!segment) {
        await transaction.rollback();
        return null;
      }

      const clients = await this.findAffectedClients(segmentId);
      if (clients.length === 0) {
        await transaction.rollback();
        return null;
      }

      // Удаляем старые записи об оплате
      await this.segmentPaymentModel.destroy({
        where: { segmentId },
        transaction,
      });

      // Создаем новые записи с равными долями
      const baseShare = 1 / clients.length;
      const baseAmount = segment.cost * baseShare;

      await Promise.all(
        clients.map((client) =>
          this.segmentPaymentModel.create(
            {
              clientId: client.id,
              segmentId: segment.id,
              share: baseShare,
              amount: baseAmount,
            },
            { transaction },
          ),
        ),
      );

      await transaction.commit();
      return segment;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
} 