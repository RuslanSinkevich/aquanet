import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { ConnectionPointsModule } from "./connection-points/connection-points.module";
import { MaterialsModule } from "./materials/materials.module";
import { WorkItemsModule } from "./work-items/work-items.module";
import { PaymentsModule } from "./payments/payments.module";
import { RefundsModule } from "./refunds/refunds.module";
import { User } from "./models/user.model";
import { ConnectionPoint } from "./models/connection-point.model";
import { Material } from "./models/material.model";
import { WorkItem } from "./models/work-item.model";
import { UserConnectionPoint } from "./models/user-connection-point.model";
import { Payment } from "./models/payment.model";
import { Refund } from "./models/refund.model";
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      models: [
        User,
        ConnectionPoint,
        Material,
        WorkItem,
        UserConnectionPoint,
        Payment,
        Refund,
      ],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    ConnectionPointsModule,
    MaterialsModule,
    WorkItemsModule,
    PaymentsModule,
    RefundsModule,
  ],
})
export class AppModule {}
