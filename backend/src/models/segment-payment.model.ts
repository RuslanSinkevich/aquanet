import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from './client.model';
import { UtilitySegment } from './utility-segment.model';

@Table({ tableName: 'segment_payments' })
export class SegmentPayment extends Model<SegmentPayment> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор оплаты' })
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

  @ApiProperty({ example: 0.25, description: 'Доля оплаты' })
  @Column({
    type: DataType.DECIMAL,
    validate: {
      min: 0,
      max: 1,
    },
  })
  share: number;

  @ApiProperty({ example: 2500.00, description: 'Сумма оплаты' })
  @Column({
    type: DataType.DECIMAL,
    validate: {
      min: 0,
    },
  })
  amount: number;

  @BelongsTo(() => Client)
  client: Client;

  @BelongsTo(() => UtilitySegment)
  segment: UtilitySegment;
} 