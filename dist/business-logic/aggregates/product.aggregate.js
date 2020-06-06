"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const product_was_added_event_1 = require("../../infrastructure/product/events/product-was-added.event");
const eventstore_store_1 = require("../../core/eventstore/store/eventstore.store");
class ProductAggregate extends cqrs_1.AggregateRoot {
    constructor(sku) {
        super();
        this.sku = sku;
        this.eventstore = new eventstore_store_1.EventStoreStore();
    }
    skuSizeIsValid(sku) {
        return sku.toString().length === 36;
    }
    registerProduct(sku, name, price, currency) {
        if (!this.skuSizeIsValid(sku)) {
            throw new Error('Sku not good length.');
        }
        this.apply(new product_was_added_event_1.ProductWasAddedEvent(sku, name, price, currency));
        this.eventstore.save('product.registerProduct', 1, { sku, name, price, currency });
    }
}
exports.ProductAggregate = ProductAggregate;
//# sourceMappingURL=product.aggregate.js.map