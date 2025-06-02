import { Column, DataType, Model, Table, HasMany, BelongsToMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from './client.model';
import { WorkItem } from './work-item.model';
import { UtilitySegment } from './utility-segment.model';
import { ClientConnectionPoint } from './client-connection-point.model';

@Table({ 
  tableName: 'connection_points',
  timestamps: true // Включаем автоматическое управление полями createdAt и updatedAt
})
export class ConnectionPoint extends Model<ConnectionPoint> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор точки подключения' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Колодец №1', description: 'Название точки подключения' })
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

  @ApiProperty({ example: true, description: 'Перераспределять при подключении' })
  @Column({
    field: 'redistribute_on_join',
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  redistributeOnJoin: boolean;

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

  @BelongsToMany(() => Client, () => ClientConnectionPoint)
  clients: Client[];

  @HasMany(() => WorkItem)
  workItems: WorkItem[];

  @HasMany(() => UtilitySegment, { foreignKey: 'fromPoint', as: 'outgoingSegments' })
  outgoingSegments: UtilitySegment[];

  @HasMany(() => UtilitySegment, { foreignKey: 'toPoint', as: 'incomingSegments' })
  incomingSegments: UtilitySegment[];

  @HasMany(() => ClientConnectionPoint)
  clientConnections: ClientConnectionPoint[];
} 