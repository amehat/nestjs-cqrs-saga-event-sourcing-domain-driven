import { Repository } from 'typeorm';
import { Catalog } from '../entities/catalog.entity';
import { StoreCatalogInterface } from './store-catalog.interface';
export declare class CatalogStore implements StoreCatalogInterface {
    private catalogRepository;
    constructor(catalogRepository: Repository<Catalog>);
    getAllCatalog(): Promise<Catalog[]>;
    getCatalogBySku(sku: string): Promise<Catalog>;
    register(catalogEntity: Catalog, sku?: string): Promise<Catalog | Error>;
    private create;
    private update;
    removeCatalog(sku: string): Promise<Catalog | Error>;
}
