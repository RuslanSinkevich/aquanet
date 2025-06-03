import { Column, DataType, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ConnectionPoint } from './connection-point.model';
import { UserConnectionPoint } from './user-connection-point.model';

@Table({ 
  tableName: 'users',
  timestamps: true,
  paranoid: true
})
export class User extends Model<User> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор пользователя' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '+79001234567', description: 'Телефон пользователя' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
    unique: true,
  })
  phone: string;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @Column({
    field: 'first_name',
    type: DataType.TEXT,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @Column({
    field: 'last_name',
    type: DataType.TEXT,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({ example: '42А', description: 'Номер дома' })
  @Column({
    field: 'house_number',
    type: DataType.TEXT,
    allowNull: false,
  })
  houseNumber: string;

  @ApiProperty({ example: 'hashed_password', description: 'Хеш пароля' })
  @Column({
    field: 'password_hash',
    type: DataType.TEXT,
    allowNull: false,
  })
  passwordHash: string;

  @ApiProperty({ example: 2, description: 'Роль пользователя (0=ADMIN,1=PRORAB,2=USER)' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 2,
  })
  role: number;

  @ApiProperty({ example: false, description: 'Подтвержден ли аккаунт' })
  @Column({
    field: 'is_confirmed',
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isConfirmed: boolean;

  @ApiProperty({ example: false, description: 'Забанен ли пользователь' })
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  banned: boolean;

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

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата удаления', required: false })
  @Column({
    field: 'deleted_at',
    type: DataType.DATE,
    allowNull: true,
  })
  deletedAt?: Date;

  @BelongsToMany(() => ConnectionPoint, {
    through: { model: () => UserConnectionPoint },
    foreignKey: 'user_id',
    otherKey: 'connection_point_id'
  })
  connectionPoints: ConnectionPoint[];
} 