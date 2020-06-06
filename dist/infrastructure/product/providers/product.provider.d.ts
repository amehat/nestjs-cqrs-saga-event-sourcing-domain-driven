import { Connection, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
export declare const ProductProvider: {
    provide: string;
    useFactory: (connection: Connection) => Repository<Product>;
    inject: string[];
}[];
