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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const database_provider_1 = require("../../../core/databases/database.provider");
const product_detail_entity_1 = require("../entities/product-detail.entity");
let ProjectionProductDetailStore = class ProjectionProductDetailStore {
    constructor() {
        this.getConnexion();
    }
    getConnexion() {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionEventStore = yield database_provider_1.connection;
            this.eventStoreRepository = connectionEventStore.getRepository(product_detail_entity_1.ProductDetail);
        });
    }
    save(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.eventStoreRepository.save(product);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.eventStoreRepository.find();
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.eventStoreRepository.findOne({ id });
        });
    }
    getBySku(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.eventStoreRepository.findOne({ sku });
        });
    }
};
ProjectionProductDetailStore = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], ProjectionProductDetailStore);
exports.ProjectionProductDetailStore = ProjectionProductDetailStore;
//# sourceMappingURL=projection-.store.js.map