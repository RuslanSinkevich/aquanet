import { Column, DataType, Model, Table, BelongsToMany, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ConnectionPoint } from './connection-point.model';
import { SegmentPayment } from './segment-payment.model';
import { ClientConnectionPoint } from './client-connection-point.model';
import { PaymentAudit } from './payment-audit.model';

@Table({ 
  tableName: 'clients',
  timestamps: true // Включаем автоматическое управление полями createdAt и updatedAt
})
export class Client extends Model<Client> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор клиента' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя клиента' })
  @Column({
    field: 'first_name',
    type: DataType.TEXT,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия клиента' })
  @Column({
    field: 'last_name',
    type: DataType.TEXT,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({ example: '+79001234567', description: 'Телефон клиента' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: '12', description: 'Номер дома' })
  @Column({
    field: 'house_number',
    type: DataType.TEXT,
    allowNull: false,
  })
  houseNumber: string;

  @ApiProperty({ example: 100, description: 'Позиция в метрах' })
  @Column({
    field: 'position_m',
    type: DataType.INTEGER,
  })
  positionM: number;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата подключения' })
  @Column({
    field: 'joined_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  joinedAt: Date;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата создания записи' })
  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата обновления записи' })
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsToMany(() => ConnectionPoint, () => ClientConnectionPoint)
  connectionPoints: ConnectionPoint[];

  @HasMany(() => SegmentPayment)
  segmentPayments: SegmentPayment[];

  @HasMany(() => ClientConnectionPoint)
  connectionPointLinks: ClientConnectionPoint[];

  @HasMany(() => PaymentAudit)
  paymentAudits: PaymentAudit[];
} 