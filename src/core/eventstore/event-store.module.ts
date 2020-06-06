import { Module } from '@nestjs/common';
import { ConsoleModule } from 'nestjs-console';

import { EventStoreController } from './controllers/event-store.controller';
import { EvenntStoreService } from './services/event-store.service';
import { ConsoleService } from './services/console.service';
import { EventStoreStore } from './store/eventstore.store';
import { EventStoreProvider } from './providers/event-store.provider';
import { RabbitMqService } from '../message-queue/rabbitmq/rabbitmq.service';

import { DatabaseModule } from '../databases/database.module';

@Module({
  controllers: [EventStoreController],
  imports: [ConsoleModule, DatabaseModule],
  providers: [
    ConsoleService,
    ...EventStoreProvider,
    EvenntStoreService,
    EventStoreStore,
    RabbitMqService,
  ],
  exports: [ConsoleService, EventStoreStore],
})
export class EventStoreModule {}
