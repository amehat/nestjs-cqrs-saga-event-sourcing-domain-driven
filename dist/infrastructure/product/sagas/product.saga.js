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
const operators_1 = require("rxjs/operators");
const add_product_to_catalog_command_1 = require("../../catalog/commands/add-product-to-catalog.command");
const product_was_added_event_1 = require("../events/product-was-added.event");
let ProductSaga = class ProductSaga {
    constructor() {
        this.productWasAdded = (events$) => {
            return events$
                .pipe(cqrs_1.ofType(product_was_added_event_1.ProductWasAddedEvent), operators_1.delay(1000), operators_1.map(event => {
                common_1.Logger.log('saga call AddProductToCatalogCommand');
                return new add_product_to_catalog_command_1.AddProductToCatalogCommand(event.sku, event.name, event.price, event.currency);
            }));
        };
    }
};
__decorate([
    cqrs_1.Saga(),
    __metadata("design:type", Object)
], ProductSaga.prototype, "productWasAdded", void 0);
ProductSaga = __decorate([
    common_1.Injectable()
], ProductSaga);
exports.ProductSaga = ProductSaga;
//# sourceMappingURL=product.saga.js.map