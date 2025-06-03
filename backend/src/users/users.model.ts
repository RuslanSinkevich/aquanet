import { Table, Column, Model, DataType, HasMany, BelongsToMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from "../common/enums/user-role.enum";
import { ConnectionPoint } from '../models/connection-point.model';
import { UserConnectionPoint } from '../models/user-connection-point.model';
import { Payment } from '../models/payment.model';
import { Refund } from '../models/refund.model';

@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true,
})
export class User extends Model<User> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'first_name'
  })
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'last_name'
  })
  lastName: string;

  @ApiProperty({ example: '+79001234567', description: 'Номер телефона' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  phone: string;

  @ApiProperty({ example: '42', description: 'Номер дома' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'house_number'
  })
  houseNumber: string;

  @ApiProperty({ example: 'hashedPassword123', description: 'Хеш пароля' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'password_hash'
  })
  passwordHash: string;

  @ApiProperty({ example: false, description: 'Подтвержден ли пользователь' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    field: 'is_confirmed'
  })
  isConfirmed: boolean;

  @ApiProperty({ example: false, description: 'Заблокирован ли пользователь' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  banned: boolean;

  @ApiProperty({ 
    example: UserRole.USER, 
    description: 'Роль пользователя',
    enum: UserRole,
  })
  @Column({
    type: DataType.STRING,
    defaultValue: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({ example: '2024-03-28T12:00:00Z', description: 'Дата создания' })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'created_at'
  })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-28T12:00:00Z', description: 'Дата обновления' })
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
    field: 'updated_at'
  })
  updatedAt: Date;

  @ApiProperty({ example: '2024-03-28T12:00:00Z', description: 'Дата удаления' })
  @Column({
    type: DataType.DATE,
    allowNull: true,
    field: 'deleted_at'
  })
  deletedAt: Date;

  @BelongsToMany(() => ConnectionPoint, () => UserConnectionPoint)
  connectionPoints: ConnectionPoint[];

  @HasMany(() => Payment)
  payments: Payment[];

  @HasMany(() => Refund)
  refunds: Refund[];
}
