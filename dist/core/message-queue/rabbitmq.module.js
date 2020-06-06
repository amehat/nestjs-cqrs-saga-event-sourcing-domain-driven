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
const config_1 = require("../configuration/config");
const publisher_service_1 = require("./rabbitmq/publisher.service");
let RabbitmqModule = class RabbitmqModule {
};
RabbitmqModule = __decorate([
    common_1.Module({
        imports: [
            rabbitmq_1.RabbitMQModule.forRoot({
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
        providers: [publisher_service_1.PublisherService],
        exports: [publisher_service_1.PublisherService],
    })
], RabbitmqModule);
exports.RabbitmqModule = RabbitmqModule;
//# sourceMappingURL=rabbitmq.module.js.map