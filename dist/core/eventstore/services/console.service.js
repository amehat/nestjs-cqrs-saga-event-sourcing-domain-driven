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
var ConsoleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nestjs_console_1 = require("nestjs-console");
require("colors");
const node_emoji_1 = require("node-emoji");
const eventstore_store_1 = require("../store/eventstore.store");
let ConsoleService = ConsoleService_1 = class ConsoleService {
    replayAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            ConsoleService_1.clearConsole();
            common_1.Logger.log('+ run replay all events'.green);
            const eventStoreProvider = new eventstore_store_1.EventStoreStore();
            yield eventStoreProvider.replayAllEvent();
            common_1.Logger.log('+ finish replay all events '.green + node_emoji_1.get('rocket'));
        });
    }
    static clearConsole() {
        process.stdout.write('\u001b[2J\u001b[0;0H');
    }
};
__decorate([
    nestjs_console_1.Command({
        command: 'replay-events',
        description: 'Replay all events and dispatch one after the other with the message queue',
        alias: '-r',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ConsoleService.prototype, "replayAllEvents", null);
ConsoleService = ConsoleService_1 = __decorate([
    common_1.Injectable(),
    nestjs_console_1.Console()
], ConsoleService);
exports.ConsoleService = ConsoleService;
//# sourceMappingURL=console.service.js.map