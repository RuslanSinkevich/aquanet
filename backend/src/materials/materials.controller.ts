import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MaterialsService } from './materials.service';
import { Material } from '../models/material.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/common/enums/user-role.enum';

@ApiTags('materials')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('materials')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить все материалы' })
  @ApiResponse({ status: 200, type: [Material] })
  findAll() {
    return this.materialsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Получить материал по ID' })
  @ApiResponse({ status: 200, type: Material })
  findOne(@Param('id') id: string) {
    return this.materialsService.findOne(+id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Создать новый материал' })
  @ApiResponse({ status: 201, type: Material })
  create(@Body() createDto: any) {
    return this.materialsService.create(createDto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить материал' })
  @ApiResponse({ status: 200, type: Material })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.materialsService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить материал' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string) {
    return this.materialsService.remove(+id);
  }
} 