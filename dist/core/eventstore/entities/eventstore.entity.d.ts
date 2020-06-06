import { ObjectID } from 'typeorm';
export declare class EventStore {
    _id: ObjectID;
    id: string;
    eventId: string;
    aggregateId: string;
    version: number;
    payload: any;
    timestamp: number;
}
