import { Column, DataType, Model, Table, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';

@Table({ 
  tableName: 'segment_payments',
  timestamps: true,
  paranoid: true
})
export class SegmentPayment extends Model<SegmentPayment> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор платежа' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'user_id',
  })
  userId: number;

  @ApiProperty({ example: 2500.00, description: 'Сумма платежа' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  amount: number;

  @ApiProperty({ example: '2024-03-15', description: 'Дата платежа' })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    field: 'payment_date',
    defaultValue: DataType.NOW,
  })
  paymentDate: Date;

  @ApiProperty({ example: 'https://example.com/document.pdf', description: 'Ссылка на документ' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'doc_link',
  })
  docLink?: string;

  @ApiProperty({ example: 'Комментарий к платежу', description: 'Комментарий к платежу' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  comment?: string;

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

  @BelongsTo(() => User)
  user: User;
} 