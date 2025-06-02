import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserRole } from "src/common/enums/user-role.enum";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto) {
    const { firstName, lastName, phone, houseNumber, password } = registerDto;

    const existing = await this.usersService.findByPhone(phone);
    if (existing) {
      throw new UnauthorizedException(
        "Пользователь с таким телефоном уже существует"
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.usersService.create({
      firstName,
      lastName,
      phone,
      houseNumber,
      passwordHash,
      isConfirmed: false,
      role: registerDto.role || UserRole.USER,
    });

    const token = this.generateToken(user);
    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
      token,
    };
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

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.phone, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Неверный телефон или пароль');
    }

    const token = this.generateToken(user);
    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
      token,
    };
  }

  private generateToken(user: any) {
    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
