import { Model } from 'sequelize-typescript';
import { UserRole } from "src/common/enums/user-role.enum";
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
    role: UserRole;
}
