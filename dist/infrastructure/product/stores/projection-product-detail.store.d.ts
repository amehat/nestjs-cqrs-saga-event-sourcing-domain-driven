import { Product } from '../entities/product.entity';
export declare class ProjectionProductDetailStore {
    eventStoreRepository: any;
    constructor();
    getConnexion(): Promise<void>;
    save(product: Product): Promise<any>;
    getAll(): Promise<any>;
    getById(id: string): Promise<any>;
    getBySku(sku: string): Promise<any>;
}
