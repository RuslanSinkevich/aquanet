import { Model } from 'sequelize-typescript';
export declare class User extends Model<User> {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    houseNumber: string;
    passwordHash: string;
    isConfirmed: boolean;
    banned: boolean;
    createdAt: Date;
    updatedAt: Date;
}
