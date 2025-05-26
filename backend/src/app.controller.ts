import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {

  @Get('health')
  @ApiOperation({ summary: 'Проверка состояния сервера' })
  healthCheck() {
    return { status: 'OK', timestamp: new Date().toISOString() };
  }
}
