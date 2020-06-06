import * as chalk from 'chalk';

import { EventStoreStore } from '../../eventstore/store/eventstore.store';
import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';

import { EventStore } from '../../../core/eventstore/entities/eventstore.entity';
import { RabbitMqService } from '../../message-queue/rabbitmq/rabbitmq.service';
import { PublisherService } from '../../message-queue/rabbitmq/publisher.service';

// tslint:disable-next-line:no-console
const log = console.log;

export class EventStoreCommand {
    public constructor(
    @Inject('EVENT_STORE_REPOSITORY')
    private eventStoreProvider: Repository<EventStore>,
    private publisherService: PublisherService,
    private amqpConnection: AmqpConnection,
  ) {}
    public async execute() {
        const allEvents = await this.eventStoreProvider.find();

        this.publisherService.publish('exchange-eventstore', 'product.registerProduct', {
            eventId: 12,
            aggregateId: 'product.registerProduct',
            payload: {
                name: 'arnaud',
            },
        });

        // const dispatchEvent = (event) => {
        //     const currentDate = this.getDate(event);
        //     this.amqpConnection.publish('exchange-eventstore', event.aggregateId, event);
        //     log(`+ [${currentDate}] event ${event.eventId.italic.blue}  replayed`.green);
        // };
        // await allEvents.forEach(dispatchEvent, this);

        // const t = this;
        // await allEvents.forEach(function(event) {
        //     const currentDate = this.getDate(event);
        //     this.amqpConnection.publish('exchange-eventstore', event.aggregateId, event);
        //     log(`+ [${currentDate}] event ${event.eventId.italic.blue}  replayed`.green);
        // }, this);
        log(`${chalk.bgRgb(60, 190, 100).bold.gray(' Replay events finish ')}`);

        process.exit(0);
    }

    public getDate(event: { timestamp: number}) {
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

        return currentDate;
    }
}
