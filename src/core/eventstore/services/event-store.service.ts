import { Injectable, Logger } from '@nestjs/common';

import { EventStoreStore } from '../store/eventstore.store';
import { EventStore } from '../entities/eventstore.entity';

@Injectable()
export class EvenntStoreService {
  public constructor(private readonly eventStoreProvider: EventStoreStore) {}

  public async getAllService() {
    return this.eventStoreProvider.getall();
  }

  public async getByEvent(eventId: string): Promise<EventStore | Error> {
    return await this.eventStoreProvider.getByEventId(eventId);
  }

  public async replay() {
    return await this.eventStoreProvider.replayAllEvent();
  }
}