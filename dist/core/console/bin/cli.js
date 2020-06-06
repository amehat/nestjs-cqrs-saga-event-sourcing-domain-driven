#!/usr/bin/env node
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
const chalk = require("chalk");
const program = require("commander");
const console_module_1 = require("../console.module");
const event_store_command_1 = require("../commands/event-store.command");
const event_store_module_1 = require("../../../core/eventstore/event-store.module");
const log = console.log;
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(console_module_1.ConsoleModule);
        const eventStoreCommand = app.select(event_store_module_1.EventStoreModule).get(event_store_command_1.EventStoreCommand);
        process.stdout.write('\u001b[2J\u001b[0;0H');
        program
            .version(require('../../../../package.json').version, '-v, --version', 'Output the current version.')
            .usage('<command> [options]')
            .helpOption('-h, --help', 'Output usage information.');
        program
            .command('replay-events')
            .description('Replay all events')
            .alias('re')
            .action(() => {
            log(`${chalk.bgRgb(60, 190, 100).bold.gray(' Replay events ')}`);
            eventStoreCommand.execute();
        })
            .on('--help', function () {
            log(`${chalk.bgRgb(60, 190, 100).bold.gray(' Replay events ')}`);
        });
        yield program.parseAsync(process.argv);
    });
}
bootstrap();
//# sourceMappingURL=cli.js.map