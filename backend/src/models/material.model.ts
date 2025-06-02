import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { WorkItem } from './work-item.model';

@Table({ tableName: 'materials' })
export class Material extends Model<Material> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор материала' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Бетонное кольцо', description: 'Тип материала' })
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
    type: DataType.DECIMAL,
    allowNull: false,
    validate: {
      min: 0,
    },
  })
  unitCost: number;

  @HasMany(() => WorkItem)
  workItems: WorkItem[];
} 