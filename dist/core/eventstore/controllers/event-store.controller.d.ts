import { EvenntStoreService } from '../services/event-store.service';
import { EventStore } from '../entities/eventstore.entity';
export declare class EventStoreController {
    private readonly eventStoreService;
    constructor(eventStoreService: EvenntStoreService);
    getAllEvents(): Promise<EventStore[]>;
    replayAllEvents(): Promise<any[] | Error>;
    getByEventId(eventId: string): Promise<EventStore | Error>;
}
