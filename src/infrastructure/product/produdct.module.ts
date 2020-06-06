import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';

import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { CommandHandlers } from '../../business-logic/domains/product';
import { QueriesHandlers } from './queries/handlers';
import { ProductStore } from './stores/product.store';
import { DatabaseModule } from '../../core/databases/database.module';
import { ProductProvider } from './providers/product.provider';
import { ProductSaga } from './sagas/product.saga';
import { ProductWasAddedHandlerEvent } from './events/handlers/product-was-added.handler.event';
import { config } from '../../core/configuration/config';

@Module({
  controllers: [ProductController],
  imports: [
    CqrsModule,
    DatabaseModule,
    // RabbitMQModule.forRoot({
    //   exchanges: [
    //     {
    //       name: 'exchange-eventstore',
    //       type: 'fanout',
    //     },
    //     {
    //       name: 'product.registerProduct',
    //       type: 'fanout',
    //     },
    //   ],
    //   uri: config.RabbitMqUrl,
    // }),
  ],
  providers: [
    ...CommandHandlers,
    ProductService,
    ...ProductProvider,
    ProductStore,
    ...QueriesHandlers,
    ProductSaga,
    ProductWasAddedHandlerEvent,
  ],
})
export class ProductModule {}
