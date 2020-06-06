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
const abstract_command_1 = require("./abstract.command");
class EventStoreCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('replay-events')
            .alias('re')
            .description('Replay alls events your project.')
            .action(() => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.action.handle();
            }
            catch (err) {
                process.exit(0);
            }
        }));
    }
}
exports.EventStoreCommand = EventStoreCommand;
//# sourceMappingURL=event-store.command.js.map