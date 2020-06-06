"use strict";
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
const uuid_1 = require("uuid");
require("colors");
const eventstore_entity_1 = require("../entities/eventstore.entity");
const database_provider_1 = require("../../databases/database.provider");
const rabbitmq_service_1 = require("../../message-queue/rabbitmq/rabbitmq.service");
class EventStoreProvider {
    constructor() {
        this.getConnection();
        this.pubSub = new rabbitmq_service_1.RabbitMqService();
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connectionEventStore = yield database_provider_1.connection;
                this.eventStoreManager = connectionEventStore.manager;
                this.eventStoreRepository = connectionEventStore.getRepository(eventstore_entity_1.EventStore);
            }
            catch (e) {
                common_1.Logger.error(e, "EventStoreProvider.getConnection() in error");
            }
        });
    }
    save(aggregateId, version, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = new eventstore_entity_1.EventStore();
                event.id = uuid_1.v4();
                event.eventId = uuid_1.v4();
                event.aggregateId = aggregateId;
                event.payload = payload;
                event.version = version;
                event.timestamp = Date.now();
                const resultSaved = yield this.eventStoreRepository.save(event);
                this.pubSub.publish(event);
                return resultSaved;
            }
            catch (e) {
                common_1.Logger.error(event, "EventStoreProvider.save() in error");
                return new Error(e);
            }
        });
    }
    getall() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.eventStoreRepository.find({
                    order: {
                        timestamp: "ASC"
                    }
                });
            }
            catch (e) {
                common_1.Logger.error(e, "EventStoreProvider.getAll() in error");
            }
        });
    }
    getByEventId(eventId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.eventStoreRepository.findOne({ eventId });
            }
            catch (e) {
                common_1.Logger.error(eventId, "EventStoreProvider.getByEventId() in error");
                return new Error(e);
            }
        });
    }
    replayAllEvent() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allEvents = yield this.getall();
                const replayed = [];
                const pubSub = this.pubSub;
                allEvents.forEach(event => {
                    common_1.Logger.log(event.eventId.green, " event replayed".green);
                    pubSub.publish(event);
                    replayed.push(event.eventId);
                });
                return replayed;
            }
            catch (e) {
                common_1.Logger.error(e, "EventStoreProvider.replay() in error".red);
                return new Error(e);
            }
        });
    }
    publish(event) {
        return this.pubSub.publish(event);
    }
}
exports.EventStoreProvider = EventStoreProvider;
//# sourceMappingURL=eventstore.provider.js.map