export declare class CreateUserDto {
    phone: string;
    firstName: string;
    lastName: string;
    houseNumber: string;
    passwordHash: string;
    role?: number;
    isConfirmed?: boolean;
    banned?: boolean;
}
