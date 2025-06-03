import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional, IsInt, Min, Max, IsBoolean } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: '+79001234567', description: 'Телефон пользователя', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Иван', description: 'Имя пользователя', required: false })
  @IsOptional()
  @IsString({ message: 'Имя должно быть строкой' })
  @MinLength(2, { message: 'Имя должно быть не менее 2 символов' })
  firstName?: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя', required: false })
  @IsOptional()
  @IsString({ message: 'Фамилия должна быть строкой' })
  @MinLength(2, { message: 'Фамилия должна быть не менее 2 символов' })
  lastName?: string;

  @ApiProperty({ example: '42А', description: 'Номер дома', required: false })
  @IsOptional()
  @IsString()
  houseNumber?: string;

  @ApiProperty({ example: 'hashed_password', description: 'Хеш пароля', required: false })
  @IsOptional()
  @IsString()
  @MinLength(6)
  passwordHash?: string;

  @ApiProperty({ example: 2, description: 'Роль пользователя (0=ADMIN,1=PRORAB,2=USER)', required: false })
  @IsOptional()
  @IsInt({ message: 'Роль должна быть числом' })
  @Min(0, { message: 'Роль должна быть не менее 0' })
  @Max(2, { message: 'Роль должна быть не более 2' })
  role?: number;

  @ApiProperty({ example: false, description: 'Подтвержден ли аккаунт', required: false })
  @IsOptional()
  @IsBoolean()
  isConfirmed?: boolean;

  @ApiProperty({ example: false, description: 'Забанен ли пользователь', required: false })
  @IsOptional()
  @IsBoolean()
  banned?: boolean;
} 