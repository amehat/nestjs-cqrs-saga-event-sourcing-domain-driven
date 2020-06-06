import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { StoreProductInterface } from './store-product.interface';
export declare class ProductStore implements StoreProductInterface {
    private productRepository;
    constructor(productRepository: Repository<Product>);
    getAllProducts(): Promise<Product[]>;
    getProductBySku(sku: string): Promise<Product | Error>;
    register(productEntity: Product, sku?: string): Promise<Product | Error>;
    private create;
    private update;
    removeProduct(sku: string): Promise<Product | Error>;
}
