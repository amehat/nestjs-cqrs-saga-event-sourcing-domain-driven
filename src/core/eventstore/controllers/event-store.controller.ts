import { Controller, Get, Param, Logger } from '@nestjs/common';

import { EvenntStoreService } from '../services/event-store.service';
import { EventStore } from '../entities/eventstore.entity';

@Controller('eventstore')
export class EventStoreController {
  public constructor(private readonly eventStoreService: EvenntStoreService) {}
  @Get('/')
  public async getAllEvents() {
    return this.eventStoreService.getAllService();
  }

  @Get('/replay')
  public async replayAllEvents() {
    return await this.eventStoreService.replay();
  }

  @Get('/:eventId')
  public async getByEventId(@Param('eventId') eventId: string): Promise<EventStore | Error> {
    return await this.eventStoreService.getByEvent(eventId);
  }
}
