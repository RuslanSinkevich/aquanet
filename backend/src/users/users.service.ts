import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async findByPhone(phone: string): Promise<User> {
    return this.userModel.findOne({ where: { phone } });
  }

  async update(id: number, updateUserDto: any): Promise<[number, User[]]> {
    return this.userModel.update(updateUserDto, {
      where: { id },
      returning: true,
    });
  }

  async remove(id: number): Promise<number> {
    return this.userModel.destroy({
      where: { id },
    });
  }

  async confirmUser(id: number): Promise<void> {
    await this.userModel.update({ isConfirmed: true }, { where: { id } });
  }
}
