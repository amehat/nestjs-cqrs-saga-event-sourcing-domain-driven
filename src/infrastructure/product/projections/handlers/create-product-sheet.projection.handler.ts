import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { CreateProductSheetProjectionCommand } from '../create-product-sheet.projection.command';
import { ProjectionProductDetailStore } from '../../stores/projection-product-detail.store';
import { Product } from '../../entities/product.entity';

@CommandHandler(CreateProductSheetProjectionCommand)
export class CreateProductSheetProjectionHandler
  implements ICommandHandler<CreateProductSheetProjectionCommand> {
  public async execute(command: CreateProductSheetProjectionCommand): Promise<any> {
    console.log('event id handler', command.eventId);
    const { sku, name, price, currency } = command.payload;
    const store = new ProjectionProductDetailStore();
    const product = new Product();
    product.sku = sku;
    product.name = name;
    product.price = price;
    product.currency = currency;
    store.save(product);
  }
}
