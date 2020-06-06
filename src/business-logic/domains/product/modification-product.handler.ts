import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ModificationProductCommand } from '../../../infrastructure/product/commands/modification-product.command';
import { ProductStore } from '../../../infrastructure/product/stores/product.store';
import { Product } from '../../../infrastructure/product/entities/product.entity';

@CommandHandler(ModificationProductCommand)
export class ModificationProductHandler
  implements ICommandHandler<ModificationProductCommand> {
  public constructor(private readonly productStore: ProductStore) {}

  public async execute(command: ModificationProductCommand): Promise<Product | Error> {
    try {
      const { sku, name, price, currency } = command;
      const productEntity = new Product();
      productEntity.sku = sku;
      productEntity.name = name;
      productEntity.price = price;
      productEntity.currency = currency;

      const product = this.productStore.register(productEntity, sku);
      if (product instanceof Error) {
        throw product;
      }

      return product;
    } catch (e) {
      return new Error(e);
    }
  }
}
