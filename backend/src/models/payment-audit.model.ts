import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { Payment } from './payment.model';

@Table({ 
  tableName: 'payment_audit',
  timestamps: true,
  paranoid: true
})
export class PaymentAudit extends Model<PaymentAudit> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор записи аудита' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'ID платежа' })
  @ForeignKey(() => Payment)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'payment_id',
  })
  paymentId: number;

  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',
  })
  userId: number;

  @ApiProperty({ example: 'PAYMENT_CREATED', description: 'Тип действия' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'action_type',
  })
  actionType: string;

  @ApiProperty({ example: 'Платеж создан', description: 'Описание действия' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата создания' })
  @Column({
    field: 'created_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата обновления' })
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата удаления' })
  @Column({
    field: 'deleted_at',
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt: Date;

  @BelongsTo(() => Payment)
  payment: Payment;

  @BelongsTo(() => User)
  user: User;
} 