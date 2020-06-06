import { EventStoreStore } from '../store/eventstore.store';
import { EventStore } from '../entities/eventstore.entity';
export declare class EvenntStoreService {
    private readonly eventStoreProvider;
    constructor(eventStoreProvider: EventStoreStore);
    getAllService(): Promise<EventStore[]>;
    getByEvent(eventId: string): Promise<EventStore | Error>;
    replay(): Promise<any[] | Error>;
}
