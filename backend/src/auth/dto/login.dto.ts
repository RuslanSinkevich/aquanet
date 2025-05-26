import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: '+79001234567', description: 'Телефон пользователя' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Пароль пользователя' })
  @IsString()
  @IsNotEmpty()
  password: string;
}