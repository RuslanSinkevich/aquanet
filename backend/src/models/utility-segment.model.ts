import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ConnectionPoint } from './connection-point.model';
import { SegmentPayment } from './segment-payment.model';
import { PaymentAudit } from './payment-audit.model';

@Table({ tableName: 'utility_segments' })
export class UtilitySegment extends Model<UtilitySegment> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор сегмента' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Труба ПВХ', description: 'Тип сегмента' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  type: string;

  @ApiProperty({ example: 1, description: 'ID начальной точки' })
  @ForeignKey(() => ConnectionPoint)
  @Column({
    field: 'from_point',
    type: DataType.INTEGER,
  })
  fromPoint: number;

  @ApiProperty({ example: 2, description: 'ID конечной точки' })
  @ForeignKey(() => ConnectionPoint)
  @Column({
    field: 'to_point',
    type: DataType.INTEGER,
  })
  toPoint: number;

  @ApiProperty({ example: 100, description: 'Длина в метрах' })
  @Column({
    field: 'length_m',
    type: DataType.INTEGER,
  })
  lengthM: number;

  @ApiProperty({ example: 10000.00, description: 'Стоимость сегмента' })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  cost: number;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата установки' })
  @Column({
    field: 'installed_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  installedAt: Date;

  @BelongsTo(() => ConnectionPoint, 'fromPoint')
  startPoint: ConnectionPoint;

  @BelongsTo(() => ConnectionPoint, 'toPoint')
  endPoint: ConnectionPoint;

  @HasMany(() => SegmentPayment)
  payments: SegmentPayment[];

  @HasMany(() => PaymentAudit)
  paymentAudits: PaymentAudit[];
} 