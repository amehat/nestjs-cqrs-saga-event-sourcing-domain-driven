"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const actions_1 = require("../actions");
const ui_1 = require("../lib/ui");
const event_store_command_1 = require("./event-store.command");
class CommandLoader {
    static load(program) {
        new event_store_command_1.EventStoreCommand(new actions_1.EventStoreAction()).load(program);
        this.handleInvalidCommand(program);
    }
    static handleInvalidCommand(program) {
        program.on('command:*', () => {
            console.error(`\n${ui_1.ERROR_PREFIX} Invalid command: ${chalk.red('%s')}`, program.args.join(' '));
            console.log(`See ${chalk.red('--help')} for a list of available commands.\n`);
            process.exit(1);
        });
    }
}
exports.CommandLoader = CommandLoader;
//# sourceMappingURL=command.loader.js.map