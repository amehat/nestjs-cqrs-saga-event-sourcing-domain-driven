import { ICommandHandler } from '@nestjs/cqrs';
import { RemoveProductCommand } from '../../../infrastructure/product/commands/remove-product.command';
import { ProductStore } from '../../../infrastructure/product/stores/product.store';
import { Product } from '../../../infrastructure/product/entities/product.entity';
export declare class RemoveProductHandler implements ICommandHandler<RemoveProductCommand> {
    private readonly productStore;
    constructor(productStore: ProductStore);
    execute(command: RemoveProductCommand): Promise<Product | Error>;
}
