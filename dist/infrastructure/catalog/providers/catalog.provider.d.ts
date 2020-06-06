import { Connection } from 'typeorm';
import { Catalog } from '../entities/catalog.entity';
export declare const CatalogProvider: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<Catalog>;
    inject: string[];
}[];
