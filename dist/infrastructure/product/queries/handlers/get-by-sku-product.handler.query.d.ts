import { IQueryHandler } from '@nestjs/cqrs';
import { GetBySkuProductQuery } from '../get-by-sku-product.query';
import { ProductStore } from '../../stores/product.store';
import { Product } from '../../entities/product.entity';
export declare class GetBySkuProductHandlerQuery implements IQueryHandler<GetBySkuProductQuery> {
    private readonly productStore;
    constructor(productStore: ProductStore);
    execute(query: GetBySkuProductQuery): Promise<Product | Error>;
}
