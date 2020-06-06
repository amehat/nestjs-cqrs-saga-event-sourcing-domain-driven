import { AggregateRoot } from '@nestjs/cqrs';

import { ProductWasAddedEvent } from '../../infrastructure/product/events/product-was-added.event';
import { EventStoreStore } from '../../core/eventstore/store/eventstore.store';

export class ProductAggregate extends AggregateRoot {
    public eventstore;

    public constructor(private readonly sku: string) {
        super();
        this.eventstore = new EventStoreStore();
    }

    public skuSizeIsValid(sku) {
      return sku.toString().length === 36;
    }

    public registerProduct(sku: string, name: string, price: number, currency: string): void | boolean {
      if (!this.skuSizeIsValid(sku)) {
        throw new Error('Sku not good length.'); // TODO: déclenche un event d'erreur récupérable par la saga mais pas par l'eventstore
      }
      this.apply(new ProductWasAddedEvent(sku, name, price, currency));
      this.eventstore.save('product.registerProduct', 1, { sku, name, price, currency });
    }
}
