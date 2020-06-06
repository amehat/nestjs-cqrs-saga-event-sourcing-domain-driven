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
let ProductStore = class ProductStore {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.productRepository.find();
        });
    }
    getProductBySku(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.productRepository.findOne({ sku });
            }
            catch (e) {
                common_1.Logger.error(sku, 'ProductStore.create() in error');
                return new Error(e);
            }
        });
    }
    register(productEntity, sku) {
        return __awaiter(this, void 0, void 0, function* () {
            if (sku) {
                return yield this.update(productEntity, sku);
            }
            else {
                return yield this.create(productEntity);
            }
        });
    }
    create(productEntity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = this.productRepository.create(productEntity);
                return yield this.productRepository.save(product);
            }
            catch (e) {
                common_1.Logger.error(productEntity, 'ProductStore.create() in error');
                return new Error(e);
            }
        });
    }
    update(productEntity, sku) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.productRepository.update({ sku }, productEntity);
                return this.productRepository.findOne({ sku });
            }
            catch (e) {
                common_1.Logger.error(productEntity, `ProductStore.update(${sku}) in error`);
                return new Error(e);
            }
        });
    }
    removeProduct(sku) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = this.productRepository.findOne({ sku });
                yield this.productRepository.delete({ sku });
                return product;
            }
            catch (e) {
                common_1.Logger.error(sku, 'ProductStore.removeProduct() in error');
                return new Error(e);
            }
        });
    }
};
ProductStore = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject('PRODUCT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProductStore);
exports.ProductStore = ProductStore;
//# sourceMappingURL=product.store.js.map