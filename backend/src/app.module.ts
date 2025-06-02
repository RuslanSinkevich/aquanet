import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { User } from "./users/users.model";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConnectionPointsModule } from "./connection-points/connection-points.module";
import { ClientsModule } from "./clients/clients.module";
import { UtilitySegmentsModule } from "./utility-segments/utility-segments.module";
import { Client } from "./models/client.model";
import { ConnectionPoint } from "./models/connection-point.model";
import { PaymentAudit } from "./models/payment-audit.model";
import { UtilitySegment } from "./models/utility-segment.model";
import { ClientConnectionPoint } from "./models/client-connection-point.model";
import { SegmentPayment } from "./models/segment-payment.model";
import { WorkItem } from "./models/work-item.model";
import { Material } from "./models/material.model";

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env'
    }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [
        User,
        Client,
        ConnectionPoint,
        PaymentAudit,
        UtilitySegment,
        ClientConnectionPoint,
        SegmentPayment,
        WorkItem,
        Material
      ],
      autoLoadModels: true,
      synchronize: true,
      logging: console.log,
      retryAttempts: 5,
      retryDelay: 2000,
    }),
    UsersModule,
    AuthModule,
    ConnectionPointsModule,
    ClientsModule,
    UtilitySegmentsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
