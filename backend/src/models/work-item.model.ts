import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Material } from './material.model';
import { ConnectionPoint } from './connection-point.model';

@Table({ 
  tableName: 'work_items',
  timestamps: true,
  paranoid: true
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
    allowNull: false,
    references: {
      model: 'connection_points',
      key: 'id'
    },
    onDelete: 'CASCADE'
  })
  connectionPointId: number;

  @ApiProperty({ example: 'Установка бетонного кольца', description: 'Описание работы' })
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
    allowNull: true,
    references: {
      model: 'materials',
      key: 'id'
    }
  })
  materialId: number;

  @ApiProperty({ example: 2, description: 'Количество' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    validate: {
      min: 0,
    },
  })
  quantity: number;

  @ApiProperty({ example: 2000.00, description: 'Итоговая стоимость' })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  cost: number;

  @ApiProperty({ example: [1, 2, 3], description: 'ID пользователей-участников оплаты' })
  @Column({
    field: 'user_ids',
    type: DataType.ARRAY(DataType.INTEGER),
    allowNull: false,
  })
  userIds: number[];

  @ApiProperty({ example: 'Комментарий', description: 'Дополнительная информация' })
  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  comment: string;

  @ApiProperty({ example: '2024-03-15', description: 'Дата фактической работы' })
  @Column({
    field: 'work_date',
    type: DataType.DATEONLY,
    allowNull: true,
  })
  workDate: Date;

  @ApiProperty({ example: ['https://example.com/doc1.pdf'], description: 'Ссылки на документы/чеки' })
  @Column({
    field: 'doc_links',
    type: DataType.ARRAY(DataType.TEXT),
    allowNull: true,
  })
  docLinks: string[];

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

  @BelongsTo(() => ConnectionPoint, {
    foreignKey: 'connection_point_id',
    targetKey: 'id'
  })
  connectionPoint: ConnectionPoint;

  @BelongsTo(() => Material, {
    foreignKey: 'material_id',
    targetKey: 'id'
  })
  material: Material;
} 