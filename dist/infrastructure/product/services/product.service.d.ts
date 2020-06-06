import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Product } from '../entities/product.entity';
export declare class ProductService {
    private commandBus;
    private queryBus;
    constructor(commandBus: CommandBus, queryBus: QueryBus);
    productRegistration(name: string, sku: string, price: number, currency: string): Promise<Product | Error>;
    productModification(name: string, sku: string, price: number, currency: string): Promise<Product | Error>;
    removeProduct(sku: string): Promise<Product | Error>;
    getAll(): Promise<Product[]>;
    getBySku(sku: string): Promise<Product>;
    subscribe(msg: any): Promise<any>;
}
