"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const rabbitmq_1 = require("@nestjs-plus/rabbitmq");
const nestjs_redis_1 = require("nestjs-redis");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const produdct_module_1 = require("./infrastructure/product/produdct.module");
const catalog_module_1 = require("./infrastructure/catalog/catalog.module");
const database_module_1 = require("./core/databases/database.module");
const database_provider_1 = require("./core/databases/database.provider");
const event_store_module_1 = require("./core/eventstore/event-store.module");
const config_1 = require("./core/configuration/config");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            catalog_module_1.CatalogModule,
            database_module_1.DatabaseModule,
            event_store_module_1.EventStoreModule,
            produdct_module_1.ProductModule,
            rabbitmq_1.RabbitMQModule.forRoot({
                exchanges: [
                    {
                        name: 'exchange-eventstore',
                        type: 'fanout'
                    },
                    {
                        name: 'product.registerProduct',
                        type: 'fanout'
                    }
                ],
                uri: config_1.config.RabbitMqUrl,
            }),
            nestjs_redis_1.RedisModule.register({
                host: 'localhost',
                port: 6379,
                password: 'sOmE_sEcUrE_pAsS',
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, ...database_provider_1.DatabaseProvider],
        exports: [...database_provider_1.DatabaseProvider]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map