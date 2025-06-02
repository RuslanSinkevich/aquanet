// dto/update-client.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty({ example: 'Иван', description: 'Имя клиента' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({ example: 'Иванов', description: 'Фамилия клиента' })
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty({ example: '+79991234567', description: 'Телефон клиента' })
  @IsPhoneNumber('RU')
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: '12B', description: 'Номер дома клиента' })
  @IsString()
  @IsOptional()
  houseNumber?: string;

  @ApiProperty({ example: 15, description: 'Позиция в метрах' })
  @IsNumber()
  @IsOptional()
  positionM?: number;

  @ApiProperty({ example: 1, description: 'ID точки подключения' })
  @IsNumber()
  @IsOptional()
  connectionPointId?: number;
}
