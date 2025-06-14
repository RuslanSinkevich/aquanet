import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ 
  tableName: 'materials',
  timestamps: true,
  paranoid: true
})
export class Material extends Model<Material> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор материала' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Труба ПНД', description: 'Тип материала' })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  type: string;

  @ApiProperty({ example: 'шт', description: 'Единица измерения' })
  @Column({
    type: DataType.TEXT,
    defaultValue: 'шт',
  })
  unit: string;

  @ApiProperty({ example: 1000.00, description: 'Стоимость за единицу' })
  @Column({
    field: 'unit_cost',
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  unitCost: number;

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
} 