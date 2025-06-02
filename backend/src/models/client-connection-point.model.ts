import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { ConnectionPoint } from './connection-point.model';
import { Client } from './client.model';

@Table({ tableName: 'clients_connection_points' })
export class ClientConnectionPoint extends Model<ClientConnectionPoint> {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор связи' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 1, description: 'ID клиента' })
  @ForeignKey(() => Client)
  @Column({
    field: 'client_id',
    type: DataType.INTEGER,
  })
  clientId: number;

  @ApiProperty({ example: 1, description: 'ID точки подключения' })
  @ForeignKey(() => ConnectionPoint)
  @Column({
    field: 'connection_point_id',
    type: DataType.INTEGER,
  })
  connectionPointId: number;

  @ApiProperty({ example: true, description: 'Является ли первоначальным подключением' })
  @Column({
    field: 'is_initial',
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isInitial: boolean;

  @ApiProperty({ example: '2024-03-15T12:00:00Z', description: 'Дата подключения' })
  @Column({
    field: 'joined_at',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  joinedAt: Date;

  @ApiProperty({ example: 0.25, description: 'Доля оплаты' })
  @Column({
    field: 'payment_share',
    type: DataType.DECIMAL,
    validate: {
      min: 0,
      max: 1,
    },
  })
  paymentShare: number;

  @BelongsTo(() => Client)
  client: Client;

  @BelongsTo(() => ConnectionPoint)
  connectionPoint: ConnectionPoint;
} 