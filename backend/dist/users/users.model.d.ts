import { Model } from 'sequelize-typescript';
import { UserRole } from "../common/enums/user-role.enum";
import { ConnectionPoint } from '../models/connection-point.model';
import { Payment } from '../models/payment.model';
import { Refund } from '../models/refund.model';
export declare class User extends Model<User> {
    id: number;
    firstName: string;
    lastName: string;
    phone: string;
    houseNumber: string;
    passwordHash: string;
    isConfirmed: boolean;
    banned: boolean;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    connectionPoints: ConnectionPoint[];
    payments: Payment[];
    refunds: Refund[];
}
