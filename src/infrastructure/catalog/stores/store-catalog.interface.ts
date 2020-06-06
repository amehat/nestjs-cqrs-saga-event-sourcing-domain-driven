import { Catalog } from '../entities/catalog.entity';

export interface StoreCatalogInterface {
  getAllCatalog(): Promise<Catalog[]>;
  getCatalogBySku(sku: string): Promise<Catalog>;
  register(catalogEntity: Catalog, sku?: string): Promise<Catalog | Error>;
  removeCatalog(sku: string): Promise<Catalog | Error>;
}
