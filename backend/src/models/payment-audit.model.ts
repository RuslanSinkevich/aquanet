import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from './client.model';
import { UtilitySegment } from './utility-segment.model';
import { ConnectionPoint } from './connection-point.model';

@Table({ tableName: 'payment_audit' })
export class PaymentAudit extends Model<PaymentAudit> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор записи аудита' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'ID клиента' })
  @ForeignKey(() => Client)
  @Column({
    field: 'client_id',
    type: DataType.INTEGER,
  })
  clientId: number;

  @ApiProperty({ example: 1, description: 'ID сегмента' })
  @ForeignKey(() => UtilitySegment)
  @Column({
    field: 'segment_id',
    type: DataType.INTEGER,
  })
  segmentId: number;

  @ApiProperty({ example: 1, description: 'ID точки подключения' })
  @ForeignKey(() => ConnectionPoint)
  @Column({
    field: 'connection_point_id',
    type: DataType.INTEGER,
  })
  connectionPointId: number;

  @ApiProperty({ example: 0.25, description: 'Доля оплаты до изменения' })
  @Column({
    field: 'share_before',
    type: DataType.DECIMAL,
    validate: {
      min: 0,
      max: 1,
    },
  })
  shareBefore: number;

  @ApiProperty({ example: 0.2, description: 'Доля оплаты после изменения' })
  @Column({
    field: 'share_after',
    type: DataType.DECIMAL,
    validate: {
      min: 0,
      max: 1,
    },
  })
  shareAfter: number;

  @ApiProperty({ example: 2500.00, description: 'Сумма до изменения' })
  @Column({
    field: 'amount_before',
    type: DataType.DECIMAL,
    validate: {
      min: 0,
    },
  })
  amountBefore: number;

  @ApiProperty({ example: 2000.00, description: 'Сумма после изменения' })
  @Column({
    field: 'amount_after',
    type: DataType.DECIMAL,
    validate: {
      min: 0,
    },
  })
  amountAfter: number;

  @ApiProperty({ example: 'Подключение нового клиента', description: 'Причина изменения' })
  @Column({
    type: DataType.TEXT,
  })
  reason: string;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата создания записи' })
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @BelongsTo(() => Client)
  client: Client;

  @BelongsTo(() => UtilitySegment)
  segment: UtilitySegment;

  @BelongsTo(() => ConnectionPoint)
  connectionPoint: ConnectionPoint;
} 