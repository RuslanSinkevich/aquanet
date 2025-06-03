import { Column, DataType, Model, Table, BelongsToMany, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { UserConnectionPoint } from './user-connection-point.model';
import { WorkItem } from './work-item.model';

@Table({ 
  tableName: 'connection_points',
  timestamps: true,
  paranoid: true
})
export class ConnectionPoint extends Model<ConnectionPoint> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор точки подключения' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Точка 1', description: 'Название точки подключения' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 100, description: 'Позиция в метрах' })
  @Column({
    field: 'position_m',
    type: DataType.INTEGER,
    allowNull: true,
  })
  positionM: number;

  @ApiProperty({ example: 10000.00, description: 'Общая стоимость' })
  @Column({
    field: 'total_cost',
    type: DataType.DECIMAL(10, 2),
    allowNull: true,
  })
  totalCost: number;

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

  @BelongsToMany(() => User, {
    through: { model: () => UserConnectionPoint },
    foreignKey: 'connection_point_id',
    otherKey: 'user_id'
  })
  users: User[];

  @HasMany(() => WorkItem)
  workItems: WorkItem[];
} 