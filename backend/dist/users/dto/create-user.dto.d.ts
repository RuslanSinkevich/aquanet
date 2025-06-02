import { UserRole } from 'src/common/enums/user-role.enum';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    phone: string;
    houseNumber: string;
    passwordHash: string;
    isConfirmed?: boolean;
    role?: UserRole;
}
