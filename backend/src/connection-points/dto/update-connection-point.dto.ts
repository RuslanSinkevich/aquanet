import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, Min } from 'class-validator';

export class UpdateConnectionPointDto {
  @ApiProperty({ example: 'Колодец 1', description: 'Название точки подключения' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 50, description: 'Позиция в метрах' })
  @IsNumber()
  @IsOptional()
  positionM?: number;

  @ApiProperty({ example: 10000.00, description: 'Общая стоимость' })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalCost?: number;

  @ApiProperty({ example: false, description: 'Перераспределять стоимость при подключении' })
  @IsBoolean()
  @IsOptional()
  redistributeOnJoin?: boolean;
} 