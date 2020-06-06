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
const modification_product_command_1 = require("../../../infrastructure/product/commands/modification-product.command");
const product_store_1 = require("../../../infrastructure/product/stores/product.store");
const product_entity_1 = require("../../../infrastructure/product/entities/product.entity");
let ModificationProductHandler = class ModificationProductHandler {
    constructor(productStore) {
        this.productStore = productStore;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { sku, name, price, currency } = command;
                const productEntity = new product_entity_1.Product();
                productEntity.sku = sku;
                productEntity.name = name;
                productEntity.price = price;
                productEntity.currency = currency;
                const product = this.productStore.register(productEntity, sku);
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
ModificationProductHandler = __decorate([
    cqrs_1.CommandHandler(modification_product_command_1.ModificationProductCommand),
    __metadata("design:paramtypes", [product_store_1.ProductStore])
], ModificationProductHandler);
exports.ModificationProductHandler = ModificationProductHandler;
//# sourceMappingURL=modification-product.handler.js.map