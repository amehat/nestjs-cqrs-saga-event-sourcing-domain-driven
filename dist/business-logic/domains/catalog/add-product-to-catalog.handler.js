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
const add_product_to_catalog_command_1 = require("../../../infrastructure/catalog/commands/add-product-to-catalog.command");
const catalog_store_1 = require("../../../infrastructure/catalog/stores/catalog.store");
const catalog_entity_1 = require("../../../infrastructure/catalog/entities/catalog.entity");
const common_1 = require("@nestjs/common");
let AddProductToCatalogHandler = class AddProductToCatalogHandler {
    constructor(catalogStore) {
        this.catalogStore = catalogStore;
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            common_1.Logger.log('add product to catalog domain called');
            const { sku, name, price, currency } = command;
            const catalogEntity = new catalog_entity_1.Catalog();
            catalogEntity.sku = sku;
            catalogEntity.name = name;
            catalogEntity.price = price;
            catalogEntity.currency = currency;
            yield this.catalogStore.register(catalogEntity);
            return catalogEntity;
        });
    }
};
AddProductToCatalogHandler = __decorate([
    cqrs_1.CommandHandler(add_product_to_catalog_command_1.AddProductToCatalogCommand),
    __metadata("design:paramtypes", [catalog_store_1.CatalogStore])
], AddProductToCatalogHandler);
exports.AddProductToCatalogHandler = AddProductToCatalogHandler;
//# sourceMappingURL=add-product-to-catalog.handler.js.map