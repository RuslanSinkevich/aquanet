import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async findByPhone(phone: string): Promise<User | null> {
    return this.userModel.findOne({ 
      where: { 
        phone,
      } 
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto as any);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userModel.findByPk(id);
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.findOne(id);
    if (!user) {
        throw new NotFoundException(`Пользователь с ID ${id} не найден для обновления`);
    }
    return user.update(updateUserDto);
  }

  async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id);
    if (!user) {
        throw new NotFoundException(`Пользователь с ID ${id} не найден для удаления`);
    }
    await user.destroy();
    return { message: "Пользователь успешно удален" };
  }
}
