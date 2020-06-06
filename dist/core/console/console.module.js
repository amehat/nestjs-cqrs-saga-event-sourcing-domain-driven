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
const rabbitmq_2 = require("@nestjs-plus/rabbitmq");
const eventstore_store_1 = require("../eventstore/store/eventstore.store");
const database_module_1 = require("../databases/database.module");
const database_provider_1 = require("../databases/database.provider");
const event_store_command_1 = require("./commands/event-store.command");
const event_store_module_1 = require("../eventstore/event-store.module");
const event_store_provider_1 = require("../eventstore/providers/event-store.provider");
const rabbitmq_service_1 = require("../message-queue/rabbitmq/rabbitmq.service");
const rabbitmq_module_1 = require("../message-queue/rabbitmq.module");
const publisher_service_1 = require("../message-queue/rabbitmq/publisher.service");
const config_1 = require("../configuration/config");
let ConsoleModule = class ConsoleModule {
};
ConsoleModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule,
            event_store_module_1.EventStoreModule,
            rabbitmq_module_1.RabbitmqModule,
            rabbitmq_2.RabbitMQModule.forRoot({
                exchanges: [
                    {
                        name: 'exchange-eventstore',
                        type: 'fanout',
                    },
                    {
                        name: 'product.registerProduct',
                        type: 'fanout',
                    },
                ],
                uri: config_1.config.RabbitMqUrl,
            }),
        ],
        exports: [event_store_module_1.EventStoreModule],
        providers: [
            rabbitmq_1.AmqpConnection,
            ...database_provider_1.DatabaseProvider,
            event_store_command_1.EventStoreCommand,
            eventstore_store_1.EventStoreStore,
            ...event_store_provider_1.EventStoreProvider,
            publisher_service_1.PublisherService,
            rabbitmq_service_1.RabbitMqService,
        ],
    })
], ConsoleModule);
exports.ConsoleModule = ConsoleModule;
//# sourceMappingURL=console.module.js.map