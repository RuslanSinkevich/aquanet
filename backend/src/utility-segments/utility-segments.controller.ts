import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UtilitySegmentsService } from './utility-segments.service';
import { CreateUtilitySegmentDto } from './dto/create-utility-segment.dto';
import { UpdateUtilitySegmentDto } from './dto/update-utility-segment.dto';
import { UtilitySegment } from '../models/utility-segment.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/common/enums/user-role.enum';

@ApiTags('utility-segments')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('utility-segments')
export class UtilitySegmentsController {
  constructor(private readonly utilitySegmentsService: UtilitySegmentsService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Создать новый сегмент сети' })
  @ApiResponse({ status: 201, type: UtilitySegment })
  create(@Body() createDto: CreateUtilitySegmentDto) {
    return this.utilitySegmentsService.create(createDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить все сегменты сети' })
  @ApiResponse({ status: 200, type: [UtilitySegment] })
  findAll() {
    return this.utilitySegmentsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Получить сегмент сети по ID' })
  @ApiResponse({ status: 200, type: UtilitySegment })
  findOne(@Param('id') id: string) {
    return this.utilitySegmentsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить сегмент сети' })
  @ApiResponse({ status: 200, type: UtilitySegment })
  update(@Param('id') id: string, @Body() updateDto: UpdateUtilitySegmentDto) {
    return this.utilitySegmentsService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить сегмент сети' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string) {
    return this.utilitySegmentsService.remove(+id);
  }

  @Post(':id/recalculate')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Пересчитать доли оплаты для сегмента' })
  @ApiResponse({ status: 200 })
  recalculateShares(@Param('id') id: string) {
    return this.utilitySegmentsService.recalculateShares(+id);
  }
} 