import { ICommandHandler } from '@nestjs/cqrs';
import { AddProductToCatalogCommand } from '../../../infrastructure/catalog/commands/add-product-to-catalog.command';
import { CatalogStore } from '../../../infrastructure/catalog/stores/catalog.store';
import { Catalog } from '../../../infrastructure/catalog/entities/catalog.entity';
export declare class AddProductToCatalogHandler implements ICommandHandler<AddProductToCatalogCommand> {
    private readonly catalogStore;
    constructor(catalogStore: CatalogStore);
    execute(command: AddProductToCatalogCommand): Promise<Catalog>;
}
