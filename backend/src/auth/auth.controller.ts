// auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';
import { UserRole } from 'src/common/enums/user-role.enum';

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Регистрация нового пользователя" })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: "Пользователь успешно зарегистрирован",
  })
  @ApiResponse({
    status: 400,
    description: "Пользователь с таким телефоном уже существует",
  })
  async register(@Body() dto: RegisterDto) {
    const result = await this.authService.register(dto);
    return {
      message: "Регистрация успешна. Ожидайте подтверждения администратором.",
      userId: result.user.id,
    };
  }

  @Post("login")
  @ApiOperation({ summary: "Авторизация пользователя" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: "Успешный вход"
  })
  @ApiResponse({
    status: 401,
    description: "Неверный логин или пароль или пользователь не подтверждён",
  })
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.phone, dto.password);
    if (!user) {
      throw new UnauthorizedException("Неверный логин или пароль");
    }
    if (!user.isConfirmed) {
      throw new UnauthorizedException("Ожидает подтверждения администратора");
    }
    const result = await this.authService.login(dto);
    return {
      token: result.token,
      user: {
        id: result.user.id,
        firstName: result.user.firstName,
        lastName: result.user.lastName,
        phone: result.user.phone,
        houseNumber: user.houseNumber,
        role: result.user.role,
        createdAt: user.createdAt
      }
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get("me")
  @ApiOperation({ summary: "Получить профиль текущего пользователя" })
  @ApiResponse({ 
    status: 200, 
    description: "Профиль получен"
  })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  getProfile(@Req() req: any) {
    return req.user;
  }
}
