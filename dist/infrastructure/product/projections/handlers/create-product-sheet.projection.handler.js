"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const create_product_sheet_projection_command_1 = require("../create-product-sheet.projection.command");
const projection_product_detail_store_1 = require("../../stores/projection-product-detail.store");
const product_entity_1 = require("../../entities/product.entity");
let CreateProductSheetProjectionHandler = class CreateProductSheetProjectionHandler {
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('event id handler', command.eventId);
            const { sku, name, price, currency } = command.payload;
            const store = new projection_product_detail_store_1.ProjectionProductDetailStore();
            const product = new product_entity_1.Product();
            product.sku = sku;
            product.name = name;
            product.price = price;
            product.currency = currency;
            store.save(product);
        });
    }
};
CreateProductSheetProjectionHandler = __decorate([
    cqrs_1.CommandHandler(create_product_sheet_projection_command_1.CreateProductSheetProjectionCommand)
], CreateProductSheetProjectionHandler);
exports.CreateProductSheetProjectionHandler = CreateProductSheetProjectionHandler;
//# sourceMappingURL=create-product-sheet.projection.handler.js.map