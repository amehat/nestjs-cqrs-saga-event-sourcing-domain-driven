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
const cqrs_1 = require("@nestjs/cqrs");
const get_by_sku_product_query_1 = require("../get-by-sku-product.query");
const product_store_1 = require("../../stores/product.store");
let GetBySkuProductHandlerQuery = class GetBySkuProductHandlerQuery {
    constructor(productStore) {
        this.productStore = productStore;
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sku } = query;
                const product = this.productStore.getProductBySku(sku);
                if (product instanceof Error) {
                    throw product;
                }
                return product;
            }
            catch (e) {
                return new Error(e);
            }
        });
    }
};
GetBySkuProductHandlerQuery = __decorate([
    cqrs_1.QueryHandler(get_by_sku_product_query_1.GetBySkuProductQuery),
    __metadata("design:paramtypes", [product_store_1.ProductStore])
], GetBySkuProductHandlerQuery);
exports.GetBySkuProductHandlerQuery = GetBySkuProductHandlerQuery;
//# sourceMappingURL=get-by-sku-product.handler.query.js.map