import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';
import { RedisModule } from 'nestjs-redis';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './infrastructure/product/produdct.module';
import { CatalogModule } from './infrastructure/catalog/catalog.module';
import { DatabaseModule } from './core/databases/database.module';
import { DatabaseProvider } from './core/databases/database.provider';
import { EventStoreModule } from './core/eventstore/event-store.module';
import { config } from './core/configuration/config';

@Module({
  imports: [
    CatalogModule,
    DatabaseModule,
    EventStoreModule,
    ProductModule,
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'exchange-eventstore',
          type: 'fanout'
        },
        {
          name: 'product.registerProduct',
          type: 'fanout'
        }
      ],
      uri: config.RabbitMqUrl,
    }),
    RedisModule.register({
      host: 'localhost',
      port: 6379,
      password: 'sOmE_sEcUrE_pAsS',
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...DatabaseProvider],
  exports: [...DatabaseProvider]
})
export class AppModule {}
