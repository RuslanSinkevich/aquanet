import { DefaultValuePipe } from "@nestjs/common";
import { AutoIncrement, Column, DataType, Model, Table } from "sequelize-typescript";

interface UserCreationsAttr {
    email: string;
    password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationsAttr> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;
    @Column({ type: DataType.STRING, unique: true, allowNull: null })
    email: string
    @Column({ type: DataType.STRING, allowNull: null })
    password: string
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    banned: boolean
    @Column({ type: DataType.STRING, allowNull: true })
    banReasons: string
}