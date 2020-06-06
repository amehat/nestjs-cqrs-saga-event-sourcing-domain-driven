"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk = require("chalk");
const actions_1 = require("../actions");
const ui_1 = require("../lib/ui");
const add_command_1 = require("./add.command");
class CommandLoader {
    static load(program) {
        new add_command_1.AddCommand(new actions_1.AddAction()).load(program);
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