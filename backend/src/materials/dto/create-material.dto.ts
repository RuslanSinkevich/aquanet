import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty({ example: 'Труба ПНД', description: 'Тип материала' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ example: 'шт', description: 'Единица измерения' })
  @IsNotEmpty()
  @IsString()
  unit: string;

  @ApiProperty({ example: 1000.00, description: 'Стоимость за единицу' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  unitCost: number;

  @ApiProperty({ example: 'Комментарий', description: 'Дополнительная информация', required: false })
  @IsOptional()
  @IsString()
  comment?: string;
} 