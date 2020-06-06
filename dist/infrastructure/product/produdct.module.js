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
const product_controller_1 = require("./controllers/product.controller");
const product_service_1 = require("./services/product.service");
const product_1 = require("../../business-logic/domains/product");
const handlers_1 = require("./queries/handlers");
const product_store_1 = require("./stores/product.store");
const database_module_1 = require("../../core/databases/database.module");
const product_provider_1 = require("./providers/product.provider");
const product_saga_1 = require("./sagas/product.saga");
const product_was_added_handler_event_1 = require("./events/handlers/product-was-added.handler.event");
let ProductModule = class ProductModule {
};
ProductModule = __decorate([
    common_1.Module({
        controllers: [product_controller_1.ProductController],
        imports: [
            cqrs_1.CqrsModule,
            database_module_1.DatabaseModule,
        ],
        providers: [
            ...product_1.CommandHandlers,
            product_service_1.ProductService,
            ...product_provider_1.ProductProvider,
            product_store_1.ProductStore,
            ...handlers_1.QueriesHandlers,
            product_saga_1.ProductSaga,
            product_was_added_handler_event_1.ProductWasAddedHandlerEvent,
        ],
    })
], ProductModule);
exports.ProductModule = ProductModule;
//# sourceMappingURL=produdct.module.js.map