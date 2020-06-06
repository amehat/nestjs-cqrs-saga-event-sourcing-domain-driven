import { Message } from '../types/message.type';
import { Subscriber } from '../types/subscriber.type';
import { Subscription } from '../subscription.interface';
export declare class RabbitMqService {
    private channel;
    private exchanges;
    publish(message: Message): Promise<any>;
    subscribe(aggregation: string, subscriber: Subscriber): Promise<Subscription>;
    private getChannel;
    private getConnection;
    private ensureExchange;
}
