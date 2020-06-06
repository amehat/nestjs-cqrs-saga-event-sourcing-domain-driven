import { Injectable, Logger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { RabbitSubscribe } from '@nestjs-plus/rabbitmq';

import { Product } from '../entities/product.entity';
import { RegisterProductCommand } from '../commands/register-product.command';
import { GetAllProductsQuery} from '../queries/get-all-products.query';
import { ModificationProductCommand } from '../commands/modification-product.command';
import { GetBySkuProductQuery } from '../queries/get-by-sku-product.query';
import { RemoveProductCommand } from '../commands/remove-product.command';
import { CreateProductSheetProjectionCommand } from '../projections/create-product-sheet.projection.command';

@Injectable()
export class ProductService {
  public constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  public async productRegistration(
    name: string,
    sku: string,
    price: number,
    currency: string,
  ): Promise<Product | Error> {
    return this.commandBus.execute(
      new RegisterProductCommand(name, sku, price, currency),
    );
  }

  public async productModification(
    name: string,
    sku: string,
    price: number,
    currency: string,
  ): Promise<Product | Error> {
    return this.commandBus.execute(
      new ModificationProductCommand(name, sku, price, currency),
    );
  }

  public async removeProduct(sku: string): Promise<Product | Error> {
    return this.commandBus.execute(new RemoveProductCommand(sku));
  }

  public async getAll(): Promise<Product[]> {
    return this.queryBus.execute(new GetAllProductsQuery());
  }

  public async getBySku(sku: string): Promise<Product> {
    return this.queryBus.execute(new GetBySkuProductQuery(sku));
  }

  @RabbitSubscribe({
    exchange: 'exchange-eventstore',
    routingKey: 'product.registerProduct',
  })
  public async subscribe(msg) {
    Logger.log(msg, 'subscribe msg');
    return;
    return this.commandBus.execute(new CreateProductSheetProjectionCommand(msg.eventId, msg.payload));
  }
}
