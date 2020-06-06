import { ICommandHandler } from '@nestjs/cqrs';
import { ModificationProductCommand } from '../../../infrastructure/product/commands/modification-product.command';
import { ProductStore } from '../../../infrastructure/product/stores/product.store';
import { Product } from '../../../infrastructure/product/entities/product.entity';
export declare class ModificationProductHandler implements ICommandHandler<ModificationProductCommand> {
    private readonly productStore;
    constructor(productStore: ProductStore);
    execute(command: ModificationProductCommand): Promise<Product | Error>;
}
