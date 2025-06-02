import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateUtilitySegmentDto {
  @ApiProperty({ example: 'Труба ПВХ', description: 'Тип сегмента' })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 1, description: 'ID начальной точки' })
  @IsNumber()
  @IsNotEmpty()
  fromPoint: number;

  @ApiProperty({ example: 2, description: 'ID конечной точки' })
  @IsNumber()
  @IsNotEmpty()
  toPoint: number;

  @ApiProperty({ example: 100, description: 'Длина в метрах' })
  @IsNumber()
  @Min(0)
  lengthM: number;

  @ApiProperty({ example: 10000.00, description: 'Стоимость сегмента' })
  @IsNumber()
  @Min(0)
  cost: number;
} 