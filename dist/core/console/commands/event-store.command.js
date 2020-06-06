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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const chalk = require("chalk");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const rabbitmq_1 = require("@nestjs-plus/rabbitmq");
const publisher_service_1 = require("../../message-queue/rabbitmq/publisher.service");
const log = console.log;
let EventStoreCommand = class EventStoreCommand {
    constructor(eventStoreProvider, publisherService, amqpConnection) {
        this.eventStoreProvider = eventStoreProvider;
        this.publisherService = publisherService;
        this.amqpConnection = amqpConnection;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const allEvents = yield this.eventStoreProvider.find();
            this.publisherService.publish('exchange-eventstore', 'product.registerProduct', {
                eventId: 12,
                aggregateId: 'product.registerProduct',
                payload: {
                    name: 'arnaud',
                },
            });
            log(`${chalk.bgRgb(60, 190, 100).bold.gray(' Replay events finish ')}`);
            process.exit(0);
        });
    }
    getDate(event) {
        const date = new Date(event.timestamp);
        let currentDate = 'date-not-define    ';
        if (!isNaN(date.getUTCDate())) {
            const currentDay = `${date.getUTCDate() < 10 ? 0 : ''}${date.getUTCDate()}`;
            const currentMonth = `${date.getMonth() < 10 ? 0 : ''}${date.getMonth()}`;
            const currentYear = `${date.getUTCFullYear()}`;
            const currentHour = `${date.getUTCHours() < 10 ? 0 : ''}${date.getUTCHours()}`;
            const currentMinute = `${date.getUTCMinutes() < 10 ? 0 : ''}${date.getUTCMinutes()}`;
            const currentSecond = `${date.getSeconds() < 10 ? 0 : ''}${date.getSeconds()}`;
            currentDate = `${currentHour}:${currentMinute}:${currentSecond} ${currentDay}/${currentMonth}/${currentYear}`;
        }
        return currentDate;
    }
};
EventStoreCommand = __decorate([
    __param(0, common_1.Inject('EVENT_STORE_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        publisher_service_1.PublisherService,
        rabbitmq_1.AmqpConnection])
], EventStoreCommand);
exports.EventStoreCommand = EventStoreCommand;
//# sourceMappingURL=event-store.command.js.map