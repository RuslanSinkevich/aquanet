// clients.controller.ts
import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  HttpCode,
  Patch,
  UseGuards,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { ClientsService } from "./clients.service";
import { CreateClientDto } from "./dto/create-client.dto";
import { UpdateClientDto } from "./dto/update-client.dto";
import { Client } from "./client.model";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Public } from "src/auth/public.decorator";
import { Roles } from "src/auth/roles.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { UserRole } from "src/common/enums/user-role.enum";

@ApiTags("Clients")
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("clients")
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: "Получить список всех клиентов" })
  @ApiResponse({ status: 200, description: "Список клиентов", type: [Client] })
  findAll() {
    return this.clientsService.findAll();
  }

  @Public()
  @Get(":id")
  @ApiOperation({ summary: "Получить клиента по ID" })
  @ApiResponse({ status: 200, description: "Клиент найден", type: Client })
  @ApiNotFoundResponse({ description: "Клиент не найден" })
  findOne(@Param("id") id: string) {
    return this.clientsService.findOne(+id);
  }

  @Post()
  @Roles(UserRole.PRORAB, UserRole.ADMIN)
  @ApiOperation({ summary: "Создать нового клиента" })
  @ApiResponse({
    status: 201,
    description: "Клиент успешно создан",
    type: Client,
  })
  @ApiBadRequestResponse({ description: "Некорректные данные" })
  create(@Body() createDto: CreateClientDto) {
    return this.clientsService.create(createDto);
  }

  @Patch(":id")
  @Roles(UserRole.PRORAB, UserRole.ADMIN)
  @ApiOperation({ summary: "Обновить данные клиента" })
  @ApiResponse({ status: 200, description: "Клиент обновлён", type: Client })
  @ApiNotFoundResponse({ description: "Клиент не найден" })
  update(@Param("id") id: string, @Body() updateDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateDto);
  }

  @Delete(":id")
  @Roles(UserRole.ADMIN)
  @HttpCode(204)
  @ApiOperation({ summary: "Удалить клиента" })
  @ApiResponse({ status: 204, description: "Клиент успешно удалён" })
  @ApiNotFoundResponse({ description: "Клиент не найден" })
  remove(@Param("id") id: string) {
    return this.clientsService.remove(+id);
  }
}
