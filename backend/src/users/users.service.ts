import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User
  ) {}

  async create(data: {
    firstName: string;
    lastName: string;
    phone: string;
    houseNumber: string;
    passwordHash: string;
    isConfirmed?: boolean;
  }): Promise<User> {
    return this.userModel.create(data);
  }

  async findByPhone(phone: string): Promise<User | null> {
    return this.userModel.findOne({ where: { phone} });
  }

  async confirmUser(id: number): Promise<void> {
    await this.userModel.update({ banned: true }, { where: { id } });
  }
}
