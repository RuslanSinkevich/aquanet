import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateConnectionPointDto {
  @ApiProperty({ example: 'Колодец №1', description: 'Название точки подключения', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 100, description: 'Позиция в метрах', required: false })
  @IsNumber()
  @IsOptional()
  positionM?: number;

  @ApiProperty({ example: 10000.00, description: 'Общая стоимость', required: false })
  @IsNumber()
  @IsOptional()
  totalCost?: number;

  @ApiProperty({ example: 'Комментарий', description: 'Дополнительная информация', required: false })
  @IsString()
  @IsOptional()
  comment?: string;
} 