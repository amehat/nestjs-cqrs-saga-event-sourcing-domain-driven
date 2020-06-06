export interface EventType {
    payload: any;
    eventId: string;
    aggregateId: string;
    timestamp: number;
}
