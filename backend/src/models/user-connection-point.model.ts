import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/users.model';
import { ConnectionPoint } from './connection-point.model';

@Table({ 
  tableName: 'user_connection_points',
  timestamps: true,
  paranoid: true
})
export class UserConnectionPoint extends Model<UserConnectionPoint> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор связи' })
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

  @ApiProperty({ example: 1, description: 'ID точки подключения' })
  @ForeignKey(() => ConnectionPoint)
  @Column({
    field: 'connection_point_id',
    type: DataType.INTEGER,
    allowNull: false,
    references: {
      model: 'connection_points',
      key: 'id'
    },
    onDelete: 'CASCADE'
  })
  connectionPointId: number;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата подключения пользователя' })
  @Column({
    field: 'connected_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  connectedAt: Date;

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

  @BelongsTo(() => ConnectionPoint)
  connectionPoint: ConnectionPoint;
} 