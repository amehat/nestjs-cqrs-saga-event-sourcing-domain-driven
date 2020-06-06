import { Module } from '@nestjs/common';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';

import { EventStoreStore } from '../eventstore/store/eventstore.store';
import { DatabaseModule } from '../databases/database.module';
import { DatabaseProvider } from '../databases/database.provider';
import { EventStoreCommand } from './commands/event-store.command';
import { EventStoreModule } from '../eventstore/event-store.module';
import { EventStoreProvider } from '../eventstore/providers/event-store.provider';
import { RabbitMqService } from '../message-queue/rabbitmq/rabbitmq.service';
import { RabbitmqModule } from '../message-queue/rabbitmq.module';
import { PublisherService } from '../message-queue/rabbitmq/publisher.service';
import { config } from '../configuration/config';

@Module({
  imports: [
    DatabaseModule,
    EventStoreModule,
    RabbitmqModule,
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'exchange-eventstore',
          type: 'fanout',
        },
        {
          name: 'product.registerProduct',
          type: 'fanout',
        },
      ],
      uri: config.RabbitMqUrl,
    }),
  ],
  exports: [EventStoreModule],
  providers: [
    AmqpConnection,
    ...DatabaseProvider,
    EventStoreCommand,
    EventStoreStore,
    ...EventStoreProvider,
    PublisherService,
    RabbitMqService,
  ],
})
export class ConsoleModule {}
