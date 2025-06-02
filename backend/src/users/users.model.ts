import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from "src/common/enums/user-role.enum";

@Table({ tableName: 'users' })
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

  @ApiProperty({ example: '+79001234567', description: 'Телефон пользователя' })
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

  @ApiProperty({ example: 'hash123...', description: 'Хеш пароля' })
  @Column({
    field: 'password_hash',
    type: DataType.TEXT,
    allowNull: false,
  })
  passwordHash: string;

  @ApiProperty({ example: false, description: 'Подтвержден ли пользователь' })
  @Column({
    field: 'is_confirmed',
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isConfirmed: boolean;

  @ApiProperty({ example: false, description: 'Заблокирован ли пользователь' })
  @Column({
    type: DataType.BOOLEAN,
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

  @ApiProperty({ 
    example: UserRole.USER, 
    description: "Роль пользователя (0 - admin, 1 - prorab, 2 - user)",
    enum: UserRole
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: UserRole.USER,
  })
  role: UserRole;
}
