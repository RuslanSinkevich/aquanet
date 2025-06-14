// auth.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { User } from "src/models/user.model"; 
import { Public } from './public.decorator';

@ApiTags("Авторизация")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("register")
  @ApiOperation({ summary: "Регистрация нового пользователя" })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: "Пользователь успешно зарегистрирован",
    // Consider creating a specific DTO for register response if User model has too much info
    type: User, 
  })
  @ApiResponse({
    status: 400,
    description: "Пользователь с таким телефоном уже существует или неверные данные",
  })
  async register(@Body() dto: RegisterDto) {
    const result = await this.authService.register(dto);
    return {
      message: "Пользователь успешно зарегистрирован.", 
      user: result.user, 
      token: result.token 
    };
  }

  @Public()
  @Post("login")
  @ApiOperation({ summary: "Авторизация пользователя" })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ 
    status: 200, 
    description: "Успешный вход",
    // Define a specific DTO for login response to control returned fields
  })
  @ApiResponse({
    status: 401,
    description: "Неверный телефон/пароль, аккаунт не подтвержден или заблокирован", 
  })
  async login(@Body() dto: LoginDto) {
    // AuthService.login now handles validation including isConfirmed and banned checks
    const loginResult = await this.authService.login(dto);
    
    // The response from authService.login already contains the desired user structure
    return {
      token: loginResult.token,
      user: loginResult.user // This now includes houseNumber, isConfirmed, banned from the service
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @Get("me")
  @ApiOperation({ summary: "Получить профиль текущего пользователя" })
  @ApiResponse({ 
    status: 200, 
    description: "Профиль получен",
    type: User, // Swagger type. Actual returned object might be Partial<User> from JwtStrategy
  })
  @ApiResponse({ status: 401, description: "Не авторизован" })
  getProfile(@Req() req: any) {
    // req.user is populated by JwtStrategy. Ensure JwtStrategy returns all needed fields.
    return req.user;
  }
}
