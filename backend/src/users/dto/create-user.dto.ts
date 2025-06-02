import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { UserRole } from 'src/common/enums/user-role.enum';

export class CreateUserDto {
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

  @ApiProperty({ example: '12', description: 'Номер дома' })
  @IsString()
  @IsNotEmpty()
  houseNumber: string;

  @ApiProperty({ example: 'hashedPassword', description: 'Хэш пароля' })
  @IsString()
  @IsNotEmpty()
  passwordHash: string;

  @ApiProperty({ example: false, description: 'Подтвержден ли пользователь' })
  @IsBoolean()
  @IsOptional()
  isConfirmed?: boolean;

  @ApiProperty({ 
    example: UserRole.USER, 
    description: 'Роль пользователя',
    enum: UserRole,
    required: false
  })
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;
}
