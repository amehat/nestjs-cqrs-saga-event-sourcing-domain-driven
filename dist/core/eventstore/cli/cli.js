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
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const commander_1 = require("commander");
require("colors");
const event_store_module_1 = require("../event-store.module");
const app_module_1 = require("../../../../src/app.module");
const eventstore_store_1 = require("../store/eventstore.store");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const context = yield core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const module = yield context.select(event_store_module_1.EventStoreModule);
    const eventStoreProvider = module.get(eventstore_store_1.EventStoreStore);
    const program = new commander_1.Command();
    program.option('-r, --replay', 'replay all events');
    program.parse(process.argv);
    process.stdout.write('\u001b[2J\u001b[0;0H');
    const emitEvent = (event) => {
        try {
            common_1.Logger.debug('emit event');
            eventStoreProvider.publish(event);
        }
        catch (e) {
            common_1.Logger.error(e, 'emit event in error');
        }
    };
    if (program.replay) {
        common_1.Logger.log('> replay events ------------------------------------------------------------');
        const allEvents = yield eventStoreProvider.getall();
        const replayed = [];
        allEvents.forEach(event => {
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
            common_1.Logger.log(`+ [${currentDate}] event ${event.eventId.italic.blue}  replayed`.green);
            emitEvent(event);
            eventStoreProvider.pubSub.publish(event);
            replayed.push(event.eventId);
        });
        process.exit(0);
    }
}))();
//# sourceMappingURL=cli.js.map