import { ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RegisterProductCommand } from '../../../infrastructure/product/commands/register-product.command';
import { ProductStore } from '../../../infrastructure/product/stores/product.store';
import { Product } from '../../../infrastructure/product/entities/product.entity';
export declare class RegisterProductHandler implements ICommandHandler<RegisterProductCommand> {
    private readonly productStore;
    private readonly publisher;
    constructor(productStore: ProductStore, publisher: EventPublisher);
    execute(command: RegisterProductCommand): Promise<Product | Error>;
}
