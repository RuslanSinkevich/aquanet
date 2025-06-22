import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: `env.${process.env.NODE_ENV || 'development'}` });

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  logger.log('Starting application...');

  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  
  // Configure CORS to allow requests from any origin
  app.enableCors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  const config = new DocumentBuilder()
    .setTitle('Aquanet API')
    .setDescription('API для системы водоснабжения')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Введите JWT токен',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      security: [{ 'JWT-auth': [] }],
    },
  });

  const port = process.env.PORT || 3001;
  const host = process.env.HOST || 'localhost';
  await app.listen(port, host);
  logger.log(`Application is running on: http://${host}:${port}`);
}

bootstrap();