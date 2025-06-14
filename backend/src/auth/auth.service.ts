import { Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { UsersService } from "../users/users.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UserRole } from "src/common/enums/user-role.enum";
import { User } from "src/models/user.model";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<{ user: Partial<User>, token: string }> {
    const existingUser = await this.usersService.findByPhone(registerDto.phone);
    if (existingUser) {
      throw new BadRequestException('Пользователь с таким телефоном уже существует');
    }

    const passwordHash = await bcrypt.hash(registerDto.password, 10);
    const userEntity = await this.usersService.create({
      phone: registerDto.phone,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      houseNumber: registerDto.houseNumber,
      passwordHash,
      role: registerDto.role || UserRole.USER,
    });

    const createdUser = await this.usersService.findByPhone(userEntity.phone);

    const userForResponse: Partial<User> = {
        id: createdUser.id,
        phone: createdUser.phone,
        firstName: createdUser.firstName,
        lastName: createdUser.lastName,
        houseNumber: createdUser.houseNumber,
        role: createdUser.role,
        isConfirmed: createdUser.isConfirmed,
        banned: createdUser.banned,
        createdAt: createdUser.createdAt
    };

    const token = this.generateToken(userForResponse);
    return {
      user: userForResponse,
      token,
    };
  }

  async validateUser(phone: string, passwordInput: string): Promise<Partial<User> | null> {
    const user = await this.usersService.findByPhone(phone);
    if (!user) return null;
  
    const passwordValid = await bcrypt.compare(passwordInput, user.passwordHash);
    if (!passwordValid) return null;
  
    if (!user.isConfirmed) {
      throw new UnauthorizedException("Аккаунт не подтвержден администратором");
    }
  
    if (user.banned) {
      throw new UnauthorizedException("Аккаунт заблокирован");
    }
  
    return {
        id: user.id,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        houseNumber: user.houseNumber,
        role: user.role,
        isConfirmed: user.isConfirmed,
        banned: user.banned,
        passwordHash: user.passwordHash,
        createdAt: user.createdAt
    };
  }

  async login(loginDto: LoginDto): Promise<{ user: Partial<User>, token: string }> {
    const validatedUser = await this.validateUser(loginDto.phone, loginDto.password);
    if (!validatedUser) {
      throw new UnauthorizedException('Неверный телефон или пароль');
    }

    const userForTokenAndResponse: Partial<User> = {
        id: validatedUser.id,
        phone: validatedUser.phone,
        firstName: validatedUser.firstName,
        lastName: validatedUser.lastName,
        houseNumber: validatedUser.houseNumber,
        role: validatedUser.role,
        isConfirmed: validatedUser.isConfirmed,
        banned: validatedUser.banned,
        createdAt: validatedUser.createdAt
    };

    const token = this.generateToken(userForTokenAndResponse);
    return {
      user: userForTokenAndResponse,
      token,
    };
  }

  private generateToken(user: Partial<User>) {
    const payload = {
      sub: user.id,
      phone: user.phone,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
}
