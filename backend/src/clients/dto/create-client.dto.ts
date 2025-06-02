// dto/create-client.dto.ts
import { IsString, IsNumber, IsOptional, IsPhoneNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {
  @ApiProperty({ example: "Иван", description: "Имя клиента" })
  @IsString()
  firstName: string;

  @ApiProperty({ example: "Иванов", description: "Фамилия клиента" })
  @IsString()
  lastName: string;

  @ApiProperty({ example: "+79991234567", description: "Телефон клиента" })
  @IsPhoneNumber('RU')
  phone: string;

  @ApiProperty({ example: "12B", description: "Номер дома клиента" })
  @IsString()
  houseNumber: string;

  @ApiProperty({ example: 15, description: "Позиция в метрах" })
  @IsNumber()
  @IsOptional()
  positionM?: number;

  @ApiProperty({ example: 1, description: "ID точки подключения" })
  @IsNumber()
  @IsOptional()
  connectionPointId?: number;
}
