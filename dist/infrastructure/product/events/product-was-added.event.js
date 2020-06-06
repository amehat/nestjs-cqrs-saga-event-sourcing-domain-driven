"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
class ProductWasAddedEvent {
    constructor(name, sku, price, currency) {
        this.name = name;
        this.sku = sku;
        this.price = price;
        this.currency = currency;
        common_1.Logger.log('ProductWasAddedEvent called');
    }
}
exports.ProductWasAddedEvent = ProductWasAddedEvent;
//# sourceMappingURL=product-was-added.event.js.map