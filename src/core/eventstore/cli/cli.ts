import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Command } from 'commander';
import 'colors';
import { get as emoji } from 'node-emoji';

import { EventStoreModule } from '../event-store.module';
import { ConsoleService } from '../services/console.service';
import { AppModule } from '../../../../src/app.module';
import { EventStoreStore } from '../store/eventstore.store';

(async () => {
  const context = await NestFactory.createApplicationContext(AppModule);
  const module = await context.select<EventStoreModule>(EventStoreModule);
  const eventStoreProvider = module.get<EventStoreStore>(EventStoreStore);

  const program = new Command();

  program.option('-r, --replay', 'replay all events');
  program.parse(process.argv);

  process.stdout.write('\u001b[2J\u001b[0;0H');

  const emitEvent = (event) => {
    try {
      Logger.debug('emit event');
      eventStoreProvider.publish(event);
    } catch (e) {
      Logger.error(e, 'emit event in error')
    }
  };

  if (program.replay) {
      Logger.log('> replay events ------------------------------------------------------------');
      const allEvents = await eventStoreProvider.getall();
      const replayed = [];
      allEvents.forEach(event => {
        const date = new Date(event.timestamp);
        let currentDate = 'date-not-define    ';
        if (!isNaN(date.getUTCDate())) {
            const currentDay = `${date.getUTCDate() < 10 ? 0 : ''}${date.getUTCDate()}`;
            const currentMonth = `${date.getMonth() < 10 ? 0 : ''}${date.getMonth()}`;
            const currentYear = `${date.getUTCFullYear()}`;
            const currentHour = `${date.getUTCHours() < 10 ? 0 : ''}${date.getUTCHours()}`;
            const currentMinute = `${date.getUTCMinutes() < 10 ? 0 : '' }${date.getUTCMinutes()}`;
            const currentSecond = `${date.getSeconds() < 10 ? 0 : ''}${date.getSeconds()}`;
            currentDate = `${currentHour}:${currentMinute}:${currentSecond} ${currentDay}/${currentMonth}/${currentYear}`;
        }
        Logger.log(`+ [${currentDate}] event ${event.eventId.italic.blue}  replayed`.green);
        emitEvent(event);
        eventStoreProvider.pubSub.publish(event);
        replayed.push(event.eventId);
      });
      process.exit(0);
  }
})();
