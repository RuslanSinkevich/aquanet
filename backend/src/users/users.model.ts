import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @Column({ field: 'first_name', type: DataType.STRING })
  firstName: string;

  @Column({ field: 'last_name', type: DataType.STRING })
  lastName: string;

  @Column({ unique: true, type: DataType.STRING })
  phone: string;

  @Column({ field: 'house_number', type: DataType.STRING })
  houseNumber: string;

  @Column({ field: 'password_hash', type: DataType.STRING })
  passwordHash: string;

  @Column({ field: 'is_confirmed', type: DataType.BOOLEAN, defaultValue: false })
  isConfirmed: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt: Date;

  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt: Date;
}
