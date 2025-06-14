import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';

@Table({ 
  tableName: 'payments',
  timestamps: true,
  paranoid: true
})
export class Payment extends Model<Payment> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор оплаты' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @ForeignKey(() => User)
  @Column({
    field: 'user_id',
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  })
  userId: number;

  @ApiProperty({ example: 1000.00, description: 'Сумма оплаты' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  amount: number;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата оплаты' })
  @Column({
    field: 'payment_date',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  paymentDate: Date;

  @ApiProperty({ example: 'https://example.com/receipt.pdf', description: 'Ссылка на чек или квитанцию' })
  @Column({
    field: 'doc_link',
    type: DataType.TEXT,
    allowNull: true,
  })
  docLink: string;

  @ApiProperty({ example: 'Комментарий', description: 'Дополнительная информация' })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment: string;

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

  @BelongsTo(() => User, {
    foreignKey: 'user_id',
    targetKey: 'id'
  })
  user: User;
} 