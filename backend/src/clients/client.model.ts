import { Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

@Table({ tableName: "clients", timestamps: false })
export class Client extends Model<Client> {
  @ApiProperty({ example: 1, description: "Уникальный идентификатор клиента" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: "Иван", description: "Имя клиента" })
  @Column({
    field: "first_name",
    type: DataType.TEXT,
    allowNull: false,
  })
  firstName: string;

  @ApiProperty({ example: "Иванов", description: "Фамилия клиента" })
  @Column({
    field: "last_name",
    type: DataType.TEXT,
    allowNull: false,
  })
  lastName: string;

  @ApiProperty({ example: "+79991234567", description: "Телефон клиента" })
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: "12B", description: "Номер дома клиента" })
  @Column({
    field: "house_number",
    type: DataType.TEXT,
    allowNull: false,
  })
  houseNumber: string;

  @ApiProperty({ example: 15, description: "Позиция в метрах" })
  @Column({
    field: "position_m",
    type: DataType.INTEGER,
    allowNull: true,
  })
  positionM: number;

  @ApiProperty({
    example: "2024-10-01T12:00:00Z",
    description: "Дата присоединения",
  })
  @Column({
    field: "joined_at",
    type: DataType.DATE,
    allowNull: true, 
  })
  joinedAt: Date;

  @ApiProperty({ example: 3, description: "ID точки подключения" })
  @Column({
    field: "connection_point_id",
    type: DataType.INTEGER,
    allowNull: true,
  })
  connectionPointId: number;
}
