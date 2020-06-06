import { AggregateRoot } from '@nestjs/cqrs';
export declare class ProductAggregate extends AggregateRoot {
    private readonly sku;
    eventstore: any;
    constructor(sku: string);
    skuSizeIsValid(sku: any): boolean;
    registerProduct(sku: string, name: string, price: number, currency: string): void | boolean;
}
