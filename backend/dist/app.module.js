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
const auth_module_1 = require("./auth/auth.module");
const connection_points_module_1 = require("./connection-points/connection-points.module");
const materials_module_1 = require("./materials/materials.module");
const work_items_module_1 = require("./work-items/work-items.module");
const payments_module_1 = require("./payments/payments.module");
const refunds_module_1 = require("./refunds/refunds.module");
const user_model_1 = require("./models/user.model");
const connection_point_model_1 = require("./models/connection-point.model");
const material_model_1 = require("./models/material.model");
const work_item_model_1 = require("./models/work-item.model");
const user_connection_point_model_1 = require("./models/user-connection-point.model");
const payment_model_1 = require("./models/payment.model");
const refund_model_1 = require("./models/refund.model");
const client_entity_1 = require("./clients/entities/client.entity");
const configuration_1 = require("./config/configuration");
const clients_module_1 = require("./clients/clients.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
                load: [configuration_1.default],
            }),
            sequelize_1.SequelizeModule.forRoot({
                dialect: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                models: [
                    user_model_1.User,
                    connection_point_model_1.ConnectionPoint,
                    material_model_1.Material,
                    work_item_model_1.WorkItem,
                    user_connection_point_model_1.UserConnectionPoint,
                    payment_model_1.Payment,
                    refund_model_1.Refund,
                    client_entity_1.Client,
                ],
                autoLoadModels: true,
                synchronize: true,
            }),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            connection_points_module_1.ConnectionPointsModule,
            materials_module_1.MaterialsModule,
            work_items_module_1.WorkItemsModule,
            payments_module_1.PaymentsModule,
            refunds_module_1.RefundsModule,
            clients_module_1.ClientsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map