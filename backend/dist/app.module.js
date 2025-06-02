"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("./users/users.module");
const users_model_1 = require("./users/users.model");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const connection_points_module_1 = require("./connection-points/connection-points.module");
const clients_module_1 = require("./clients/clients.module");
const utility_segments_module_1 = require("./utility-segments/utility-segments.module");
const client_model_1 = require("./models/client.model");
const connection_point_model_1 = require("./models/connection-point.model");
const payment_audit_model_1 = require("./models/payment-audit.model");
const utility_segment_model_1 = require("./models/utility-segment.model");
const client_connection_point_model_1 = require("./models/client-connection-point.model");
const segment_payment_model_1 = require("./models/segment-payment.model");
const work_item_model_1 = require("./models/work-item.model");
const material_model_1 = require("./models/material.model");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env'
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: "postgres",
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                models: [
                    users_model_1.User,
                    client_model_1.Client,
                    connection_point_model_1.ConnectionPoint,
                    payment_audit_model_1.PaymentAudit,
                    utility_segment_model_1.UtilitySegment,
                    client_connection_point_model_1.ClientConnectionPoint,
                    segment_payment_model_1.SegmentPayment,
                    work_item_model_1.WorkItem,
                    material_model_1.Material
                ],
                autoLoadModels: true,
                synchronize: true,
                logging: console.log,
                retryAttempts: 5,
                retryDelay: 2000,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            connection_points_module_1.ConnectionPointsModule,
            clients_module_1.ClientsModule,
            utility_segments_module_1.UtilitySegmentsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map