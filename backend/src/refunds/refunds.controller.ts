import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RefundsService } from './refunds.service';
import { Refund } from '../models/refund.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Public } from 'src/auth/public.decorator';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/common/enums/user-role.enum';

@ApiTags('refunds')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('refunds')
export class RefundsController {
  constructor(private readonly refundsService: RefundsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить все возвраты' })
  @ApiResponse({ status: 200, type: [Refund] })
  findAll() {
    return this.refundsService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Получить возврат по ID' })
  @ApiResponse({ status: 200, type: Refund })
  findOne(@Param('id') id: string) {
    return this.refundsService.findOne(+id);
  }

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Создать новый возврат' })
  @ApiResponse({ status: 201, type: Refund })
  create(@Body() createDto: any) {
    return this.refundsService.create(createDto);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Обновить возврат' })
  @ApiResponse({ status: 200, type: Refund })
  update(@Param('id') id: string, @Body() updateDto: any) {
    return this.refundsService.update(+id, updateDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Удалить возврат' })
  @ApiResponse({ status: 204 })
  remove(@Param('id') id: string) {
    return this.refundsService.remove(+id);
  }
} 