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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const remove_product_command_1 = require("../../../infrastructure/product/commands/remove-product.command");
const product_store_1 = require("../../../infrastructure/product/stores/product.store");
let RemoveProductHandler = class RemoveProductHandler {
    constructor(productStore) {
        this.productStore = productStore;
    }
    execute(command) {
        try {
            const { sku } = command;
            const product = this.productStore.removeProduct(sku);
            if (product instanceof Error) {
                throw product;
            }
            return product;
        }
        catch (e) {
            common_1.Logger.error(e, 'RemoveProductHandler.execute() Error Handler: ');
            return e;
        }
    }
};
RemoveProductHandler = __decorate([
    cqrs_1.CommandHandler(remove_product_command_1.RemoveProductCommand),
    __metadata("design:paramtypes", [product_store_1.ProductStore])
], RemoveProductHandler);
exports.RemoveProductHandler = RemoveProductHandler;
//# sourceMappingURL=remove-product.handler.js.map