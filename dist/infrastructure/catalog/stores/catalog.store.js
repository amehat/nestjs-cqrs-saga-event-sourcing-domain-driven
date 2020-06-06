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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let CatalogStore = class CatalogStore {
    constructor(catalogRepository) {
        this.catalogRepository = catalogRepository;
    }
    getAllCatalog() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.catalogRepository.find();
        });
    }
    getCatalogBySku(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.catalogRepository.findOne({ sku });
        });
    }
    register(catalogEntity, sku) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sku) {
                return yield this.update(catalogEntity, sku);
            }
            else {
                return yield this.create(catalogEntity);
            }
        });
    }
    create(catalogEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.catalogRepository.save(catalogEntity);
            }
            catch (e) {
                return new Error(e);
            }
        });
    }
    update(catalogEntity, sku) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.catalogRepository.update({ sku }, catalogEntity);
                return this.catalogRepository.findOne({ sku });
            }
            catch (e) {
                return new Error(e);
            }
        });
    }
    removeCatalog(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const catalog = this.catalogRepository.findOne({ sku });
                yield this.catalogRepository.delete({ sku });
                return catalog;
            }
            catch (e) {
                return new Error(e);
            }
        });
    }
};
CatalogStore = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('CATALOG_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CatalogStore);
exports.CatalogStore = CatalogStore;
//# sourceMappingURL=catalog.store.js.map