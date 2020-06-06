import { ProductService } from '../services/product.service';
import { ProductRegistrationDto } from '../dto/product-registration.dto';
import { ProductModificationDto } from '../dto/product-modification.dto';
import { Product } from '../entities/product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(): Promise<Product[] | Error>;
    getBySku(sku: string): Promise<Product | Error>;
    productRegistration(productRegistrationDto: ProductRegistrationDto): Promise<Product | Error>;
    productModification(productModificationDto: ProductModificationDto, sku: string): Promise<Product | Error>;
    delete(sku: string): Promise<Product | Error>;
}
