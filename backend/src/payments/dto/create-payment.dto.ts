import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsDateString, IsOptional, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({ example: 1, description: 'ID пользователя' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 10000, description: 'Сумма платежа' })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({ example: '2024-03-28', description: 'Дата платежа' })
  @IsDateString()
  @IsNotEmpty()
  paymentDate: Date;

  @ApiProperty({ example: 'Комментарий', description: 'Дополнительная информация' })
  @IsString()
  @IsOptional()
  comment?: string;
} 