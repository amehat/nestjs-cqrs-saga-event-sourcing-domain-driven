"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const rabbitmq_1 = require("@nestjs-plus/rabbitmq");
const nestjs_redis_1 = require("nestjs-redis");
let AppService = class AppService {
    constructor(amqpConnection, redisService) {
        this.amqpConnection = amqpConnection;
        this.redisService = redisService;
    }
    getHello() {
        return 'Nestjs with CQRS SAGA EVENT SOURCING DOMAIN-DESIGN DRIVEN';
    }
    publishEvent(message, exchange = 'exchange-eventstore', routingKey = 'product.registerProduct') {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.redisService.getClient('test');
            yield this.amqpConnection.publish(exchange, routingKey, message);
            return 'message published';
        });
    }
    listenEvent(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('listent msg msg', msg);
            common_1.Logger.warn(msg, 'Listen message');
        });
    }
};
__decorate([
    rabbitmq_1.RabbitSubscribe({
        exchange: 'exchange-eventstore',
        routingKey: 'product.registerProduct',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppService.prototype, "listenEvent", null);
AppService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [rabbitmq_1.AmqpConnection,
        nestjs_redis_1.RedisService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map