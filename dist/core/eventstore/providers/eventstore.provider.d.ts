import 'colors';
import { EventStore } from '../entities/eventstore.entity';
export declare class EventStoreProvider {
    eventStoreRepository: any;
    eventStoreManager: any;
    pubSub: any;
    constructor();
    getConnection(): Promise<void>;
    save(aggregateId: string, version: number, payload: any): Promise<EventStore | Error>;
    getall(): Promise<EventStore[]>;
    getByEventId(eventId: string): Promise<EventStore | Error>;
    replayAllEvent(): Promise<any[] | Error>;
    publish(event: any): any;
}
