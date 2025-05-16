import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: typeof User);
    createUser(dto: CreateUserDto): Promise<void>;
    getAllUsers(): Promise<void>;
}
