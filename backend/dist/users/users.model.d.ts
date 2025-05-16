import { Model } from "sequelize-typescript";
interface UserCreationsAttr {
    email: string;
    password: string;
}
export declare class User extends Model<User, UserCreationsAttr> {
    id: number;
    email: string;
    password: string;
    banned: boolean;
    banReasons: string;
}
export {};
