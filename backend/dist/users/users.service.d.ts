import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UsersService {
    private userModel;
    constructor(userModel: typeof User);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number): Promise<User>;
    findByPhone(phone: string): Promise<User>;
    update(id: number, updateUserDto: any): Promise<[number, User[]]>;
    remove(id: number): Promise<number>;
    confirmUser(id: number): Promise<void>;
}
