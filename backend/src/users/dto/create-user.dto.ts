import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
  @ApiProperty({
    example: 1,
    description: "Уникальный идентификатор пользователя",
  })
  id: number;

  @ApiProperty({ example: "Руслан", description: "Имя пользователя" })
  firstName: string;

  @ApiProperty({ example: "Синкевич", description: "Фамилия пользователя" })
  lastName: string;

  @ApiProperty({ example: "+79501234567", description: "Телефон пользователя" })
  phone: string;

  // Обычно пароль не показываем в API, поэтому можно не добавлять или сделать скрытым
  @ApiProperty({ description: "Хеш пароля", writeOnly: true })
  passwordHash: string;

  @ApiProperty({ example: "16", description: "Номер дома" })
  houseNumber: string;

  @ApiProperty({ example: false, description: "Статус подтверждения" })
  isConfirmed: boolean;

  @ApiProperty({
    example: "2025-05-26T12:34:56.789Z",
    description: "Дата создания",
  })
  createdAt: Date;

  @ApiProperty({
    example: "2025-05-26T12:34:56.789Z",
    description: "Дата последнего обновления",
  })
  updatedAt: Date;
}
