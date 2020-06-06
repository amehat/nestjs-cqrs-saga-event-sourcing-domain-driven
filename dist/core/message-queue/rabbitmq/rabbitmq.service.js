"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const amqp = require("amqplib");
const config_1 = require("../../configuration/config");
let RabbitMqService = class RabbitMqService {
    constructor() {
        this.exchanges = new Set();
    }
    publish(message) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('message', message);
            console.log(message.aggregateId);
            try {
                const channel = yield this.getChannel();
                console.log('channel', channel);
                yield this.ensureExchange(message.aggregateId, channel);
                console.log('aggregation:', message.aggregateId);
                return yield channel.publish(message.aggregateId, '', Buffer.from(JSON.stringify(message)));
            }
            catch (e) {
                common_1.Logger.error(e, 'RabbitMqService.publish in error');
            }
        });
    }
    subscribe(aggregation, subscriber) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.getChannel();
            yield this.ensureExchange(aggregation, channel);
            const q = yield channel.assertQueue('', { exclusive: config_1.config.RabbitMQExclusive });
            channel.bindQueue(q.queue, aggregation, '');
            const response = yield channel.consume(q.queue, (msg) => {
                subscriber(JSON.parse(msg.toString()));
            }, { noAck: config_1.config.RabbitMqNoAck });
            const consumerTag = response.consumerTag;
            return {
                remove: () => __awaiter(this, void 0, void 0, function* () {
                    yield channel.cancel(consumerTag);
                    yield channel.deleteQueue(q.queue);
                }),
            };
        });
    }
    getChannel() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('>>> getChannel');
            console.log("this.channel:", this.channel);
            if (!this.channel) {
                const connection = yield this.getConnection();
                console.log('getChanne connection');
                this.channel = yield connection.createChannel();
                console.log('getChanne channel', this.channel);
                return this.channel;
            }
            else {
                console.log('<<<< getChanne return channel');
                return this.channel;
            }
        });
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                common_1.Logger.log('getConnection called');
                common_1.Logger.log(config_1.config.RabbitMqUrl, 'config.RabbitMqUrl');
                const conn = yield amqp.connect(`${config_1.config.RabbitMqUrl}?heartbeat=60`)
                    .then(c => {
                    console.log('C:', c);
                    return c;
                })
                    .catch(e => {
                    console.log('e', e);
                });
                common_1.Logger.log('=========> get connection <==========');
                return conn;
            }
            catch (e) {
                common_1.Logger.error(e, 'Error connection amqp');
            }
        });
    }
    ensureExchange(aggregation, channel) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.exchanges.has(aggregation)) {
                yield channel.assertExchange(aggregation, config_1.config.RabbitMqType, { durable: config_1.config.RabbitMqDurable, deleteQueue: config_1.config.RabbitMqDelete });
                this.exchanges.add(aggregation);
            }
        });
    }
};
RabbitMqService = __decorate([
    common_1.Injectable()
], RabbitMqService);
exports.RabbitMqService = RabbitMqService;
//# sourceMappingURL=rabbitmq.service.js.map