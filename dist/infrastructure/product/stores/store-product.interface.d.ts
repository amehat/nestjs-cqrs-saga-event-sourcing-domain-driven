import { Product } from '../entities/product.entity';
export interface StoreProductInterface {
    getAllProducts(): Promise<Product[]>;
    getProductBySku(sku: string): Promise<Product | Error>;
    register(productEntity: Product, sku?: string): Promise<Product | Error>;
    removeProduct(sku: string): Promise<Product | Error>;
}
