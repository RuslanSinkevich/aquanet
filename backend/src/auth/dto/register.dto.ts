import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';

export class RegisterDto {
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия пользователя' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '+79001234567', description: 'Телефон пользователя' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '12', description: 'Номер дома пользователя' })
  @IsString()
  @IsNotEmpty()
  houseNumber: string;

  @ApiProperty({ example: 'strongPassword123', description: 'Пароль пользователя' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    example: UserRole.USER, 
    description: 'Роль пользователя (только для админов)',
    enum: UserRole,
    required: false
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
