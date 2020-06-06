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
const typeorm_1 = require("typeorm");
const entities = process.env.NODE_ENV === 'dev'
    ? 'dist/**/**.entity.js'
    : 'src/**/*.entity.ts';
exports.connection = typeorm_1.createConnection({
    type: 'mongodb',
    url: 'mongodb://root:rootpassword@localhost:27017/?authSource=admin&ssl=false',
    database: 'nest',
    entities: [entities],
    logging: true,
    synchronize: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
exports.DatabaseProvider = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: () => __awaiter(void 0, void 0, void 0, function* () { return yield exports.connection; }),
    },
];
//# sourceMappingURL=database.provider.js.map