import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const { firstName, lastName, phone, houseNumber, password } = dto;

    const existing = await this.usersService.findByPhone(phone);
    if (existing)
      throw new UnauthorizedException(
        "Пользователь с таким телефоном уже существует"
      );

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
        firstName,
      lastName,
      phone,
      houseNumber,
      passwordHash,
      isConfirmed: false,
    });
    return user;
  }

  async validateUser(phone: string, password: string) {
    const user = await this.usersService.findByPhone(phone);
    if (!user) return null;
  
    const passwordValid = await bcrypt.compare(password, user.passwordHash);
    if (!passwordValid) return null;
  
    if (!user.isConfirmed) {
      throw new UnauthorizedException("Пользователь не подтвержден администратором");
    }
  
    if (user.banned) {
      throw new UnauthorizedException("Пользователь заблокирован");
    }
  
    return user;
  }

  async login(user: any) {
    const payload = { phone: user.phone, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
