import { User } from "./users.model";
export declare class UsersService {
    private userModel;
    constructor(userModel: typeof User);
    create(data: {
        firstName: string;
        lastName: string;
        phone: string;
        houseNumber: string;
        passwordHash: string;
        isConfirmed?: boolean;
    }): Promise<User>;
    findByPhone(phone: string): Promise<User | null>;
    confirmUser(id: number): Promise<void>;
}
