import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsDateString, IsString } from 'class-validator';

export class UpdatePaymentDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @IsNumber()
  @IsOptional()
  userId?: number;

  @ApiProperty({ example: 10000, description: 'Сумма платежа' })
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({ example: '2024-03-28', description: 'Дата платежа' })
  @IsDateString()
  @IsOptional()
  paymentDate?: Date;

  @ApiProperty({ example: 'Комментарий', description: 'Дополнительная информация' })
  @IsString()
  @IsOptional()
  comment?: string;
} 