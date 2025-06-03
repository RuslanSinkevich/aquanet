import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { WorkItemsService } from './work-items.service';
import { WorkItem } from '../models/work-item.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/common/enums/user-role.enum';

@ApiTags('work-items')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('work-items')
export class WorkItemsController {
  constructor(private readonly workItemsService: WorkItemsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить все работы' })
  @ApiResponse({ status: 200, type: [WorkItem] })
  findAll() {
    return this.workItemsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Получить работу по ID' })
  @ApiResponse({ status: 200, type: WorkItem })
  findOne(@Param('id') id: string) {
    return this.workItemsService.findOne(+id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Создать новую работу' })
  @ApiResponse({ status: 201, type: WorkItem })
  create(@Body() createDto: any) {
    return this.workItemsService.create(createDto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить работу' })
  @ApiResponse({ status: 200, type: WorkItem })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.workItemsService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить работу' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string) {
    return this.workItemsService.remove(+id);
  }
} 