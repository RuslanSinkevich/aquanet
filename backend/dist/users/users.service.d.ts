import { User } from './users.model';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    createUser(): Promise<void>;
    getAllUsers(): Promise<void>;
}
