import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateConnectionPointDto {
  @ApiProperty({ example: "Колодец 1", description: "Название точки подключения" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 50,
    description: "Позиция в метрах",
    required: false,
  })
  @IsNumber()
  @IsOptional()
  positionM?: number;

  @ApiProperty({
    example: 10000.00,
    description: "Общая стоимость",
    required: false,
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  totalCost?: number;

  @ApiProperty({
    example: false,
    description: "Перераспределять стоимость при подключении",
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  redistributeOnJoin?: boolean;

  @ApiProperty({
    example: "Комментарий к точке подключения",
    description: "Дополнительная информация",
    required: false,
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
