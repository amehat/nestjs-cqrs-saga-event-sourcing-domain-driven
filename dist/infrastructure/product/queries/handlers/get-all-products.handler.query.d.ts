import { IQueryHandler } from '@nestjs/cqrs';
import { GetAllProductsQuery } from '../get-all-products.query';
import { ProductStore } from '../../stores/product.store';
export declare class GetAllProductHandlerQuery implements IQueryHandler<GetAllProductsQuery> {
    private readonly productStore;
    constructor(productStore: ProductStore);
    execute(query: GetAllProductsQuery): Promise<import("../../entities/product.entity").Product[]>;
}
