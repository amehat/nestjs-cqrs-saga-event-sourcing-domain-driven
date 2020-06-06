import { EventType as Event } from './event.type';

export interface Message {
  payload: Event;
  aggregateId: string;
  eventId: string;
  version: number;
  timestamp: number;
}