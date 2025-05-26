// auth.controller.ts
import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
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
    const user = await this.authService.register(dto);
    return {
      message: "Регистрация успешна. Ожидайте подтверждения администратором.",
      userId: user.id,
    };
  }

  @Post("login")
  @ApiOperation({ summary: "Авторизация пользователя" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "Успешный вход и получение токена" })
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
    const token = await this.authService.login(user);
    return {
      accessToken: token.access_token,
      lastName: user.lastName,
      firstName: user.firstName,
      phone: user.phone,
      userId: user.id,
      houseNumber: user.houseNumber
    };
  }
}
