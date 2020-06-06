"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nestjs_console_1 = require("nestjs-console");
const event_store_controller_1 = require("./controllers/event-store.controller");
const event_store_service_1 = require("./services/event-store.service");
const console_service_1 = require("./services/console.service");
const eventstore_store_1 = require("./store/eventstore.store");
const event_store_provider_1 = require("./providers/event-store.provider");
const rabbitmq_service_1 = require("../message-queue/rabbitmq/rabbitmq.service");
const database_module_1 = require("../databases/database.module");
let EventStoreModule = class EventStoreModule {
};
EventStoreModule = __decorate([
    common_1.Module({
        controllers: [event_store_controller_1.EventStoreController],
        imports: [nestjs_console_1.ConsoleModule, database_module_1.DatabaseModule],
        providers: [
            console_service_1.ConsoleService,
            ...event_store_provider_1.EventStoreProvider,
            event_store_service_1.EvenntStoreService,
            eventstore_store_1.EventStoreStore,
            rabbitmq_service_1.RabbitMqService,
        ],
        exports: [console_service_1.ConsoleService, eventstore_store_1.EventStoreStore],
    })
], EventStoreModule);
exports.EventStoreModule = EventStoreModule;
//# sourceMappingURL=event-store.module.js.map