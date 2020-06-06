"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const database_module_1 = require("../../core/databases/database.module");
const add_product_to_catalog_handler_1 = require("../../business-logic/domains/catalog/add-product-to-catalog.handler");
const catalog_store_1 = require("./stores/catalog.store");
const catalog_provider_1 = require("./providers/catalog.provider");
let CatalogModule = class CatalogModule {
};
CatalogModule = __decorate([
    common_1.Module({
        imports: [
            cqrs_1.CqrsModule,
            database_module_1.DatabaseModule,
        ],
        providers: [
            add_product_to_catalog_handler_1.AddProductToCatalogHandler,
            catalog_store_1.CatalogStore,
            ...catalog_provider_1.CatalogProvider,
        ],
    })
], CatalogModule);
exports.CatalogModule = CatalogModule;
//# sourceMappingURL=catalog.module.js.map