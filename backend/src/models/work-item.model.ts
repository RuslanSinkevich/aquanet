import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Material } from './material.model';
import { ConnectionPoint } from './connection-point.model';

@Table({ 
  tableName: 'work_items',
  timestamps: true // Включаем автоматическое управление полями createdAt и updatedAt
})
export class WorkItem extends Model<WorkItem> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор работы' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'ID точки подключения' })
  @ForeignKey(() => ConnectionPoint)
  @Column({
    field: 'connection_point_id',
    type: DataType.INTEGER,
  })
  connectionPointId: number;

  @ApiProperty({ example: 'Установка бетонного кольца', description: 'Описание работы или материала' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: 1, description: 'ID материала' })
  @ForeignKey(() => Material)
  @Column({
    field: 'material_id',
    type: DataType.INTEGER,
  })
  materialId: number;

  @ApiProperty({ example: 2, description: 'Количество' })
  @Column({
    type: DataType.DECIMAL,
    validate: {
      min: 0,
    },
  })
  quantity: number;

  @ApiProperty({ example: 2000.00, description: 'Итоговая стоимость' })
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  cost: number;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата создания' })
  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  createdAt: Date;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата обновления' })
  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  updatedAt: Date;

  @BelongsTo(() => ConnectionPoint)
  connectionPoint: ConnectionPoint;

  @BelongsTo(() => Material)
  material: Material;
} 