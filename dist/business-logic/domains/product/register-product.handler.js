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
const register_product_command_1 = require("../../../infrastructure/product/commands/register-product.command");
const product_store_1 = require("../../../infrastructure/product/stores/product.store");
const product_entity_1 = require("../../../infrastructure/product/entities/product.entity");
const product_aggregate_1 = require("../../aggregates/product.aggregate");
let RegisterProductHandler = class RegisterProductHandler {
    constructor(productStore, publisher) {
        this.productStore = productStore;
        this.publisher = publisher;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, sku, price, currency } = command;
            const productEntity = new product_entity_1.Product();
            productEntity.name = name;
            productEntity.sku = sku;
            productEntity.price = price;
            productEntity.currency = currency;
            const product = yield this.productStore.register(productEntity);
            if (product instanceof Error) {
                throw product;
            }
            const productAggregate = this.publisher.mergeObjectContext(yield new product_aggregate_1.ProductAggregate(sku));
            productAggregate.registerProduct(sku, name, price, currency);
            productAggregate.commit();
            return product;
        });
    }
};
RegisterProductHandler = __decorate([
    cqrs_1.CommandHandler(register_product_command_1.RegisterProductCommand),
    __metadata("design:paramtypes", [product_store_1.ProductStore,
        cqrs_1.EventPublisher])
], RegisterProductHandler);
exports.RegisterProductHandler = RegisterProductHandler;
//# sourceMappingURL=register-product.handler.js.map