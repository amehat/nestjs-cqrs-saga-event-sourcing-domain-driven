import { Connection } from 'typeorm';
import { EventStore } from '../entities/eventstore.entity';
export declare const EventStoreProvider: {
    provide: string;
    useFactory: (connection: Connection) => import("typeorm").Repository<EventStore>;
    inject: string[];
}[];
