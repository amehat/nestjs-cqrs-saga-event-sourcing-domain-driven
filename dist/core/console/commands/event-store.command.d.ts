import { Repository } from 'typeorm';
import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { EventStore } from '../../../core/eventstore/entities/eventstore.entity';
import { PublisherService } from '../../message-queue/rabbitmq/publisher.service';
export declare class EventStoreCommand {
    private eventStoreProvider;
    private publisherService;
    private amqpConnection;
    constructor(eventStoreProvider: Repository<EventStore>, publisherService: PublisherService, amqpConnection: AmqpConnection);
    execute(): Promise<void>;
    getDate(event: {
        timestamp: number;
    }): string;
}
