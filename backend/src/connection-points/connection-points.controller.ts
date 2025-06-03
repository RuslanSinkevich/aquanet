import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpStatus,
  NotFoundException,
} from "@nestjs/common";
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from "@nestjs/swagger";
import { ConnectionPointsService } from "./connection-points.service";
import { CreateConnectionPointDto } from "./dto/create-connection-point.dto";
import { UpdateConnectionPointDto } from "./dto/update-connection-point.dto";
import { ConnectionPoint } from "../models/connection-point.model";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Public } from "src/auth/public.decorator";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { UserRole } from "src/common/enums/user-role.enum";

@ApiTags("Точки подключения")
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("connection-points")
export class ConnectionPointsController {
  constructor(private readonly service: ConnectionPointsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: "Получить список всех точек подключения" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Список успешно получен",
    type: [ConnectionPoint],
  })
  findAll() {
    return this.service.findAll();
  }

  @Public()
  @Get(":id")
  @ApiOperation({ summary: "Получить точку подключения по ID" })
  @ApiParam({ name: "id", description: "ID точки подключения" })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Точка подключения найдена",
    type: ConnectionPoint,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Точка подключения не найдена",
  })
  async findOne(@Param("id", ParseIntPipe) id: number) {
    const point = await this.service.findOne(id);
    if (!point) {
      throw new NotFoundException('Точка подключения не найдена');
    }
    return point;
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Создать новую точку подключения" })
  @ApiBody({ type: CreateConnectionPointDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "Точка подключения создана",
    type: ConnectionPoint,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Неверные данные",
  })
  create(@Body() dto: CreateConnectionPointDto) {
    return this.service.create(dto);
  }

  @Put(":id")
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Обновить точку подключения" })
  @ApiParam({ name: "id", description: "ID точки подключения" })
  @ApiBody({ type: UpdateConnectionPointDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "Точка подключения обновлена",
    type: ConnectionPoint,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: "Точка подключения не найдена",
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "Неверные данные",
  })
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateConnectionPointDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Удалить точку подключения" })
  @ApiParam({ name: "id", description: "ID точки подключения" })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: "Точка подключения удалена",
  })
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  @Public()
  @Get(":id/shares")
  @ApiOperation({ summary: "Рассчитать доли оплаты для точки подключения" })
  @ApiResponse({ status: 200 })
  calculateShares(@Param("id") id: string) {
    return this.service.calculateClientShares(+id);
  }

  @Post(":id/recalculate")
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: "Пересчитать и обновить доли оплаты" })
  @ApiResponse({ status: 200 })
  recalculateShares(@Param("id") id: string) {
    return this.service.recalculateShares(+id);
  }
}
