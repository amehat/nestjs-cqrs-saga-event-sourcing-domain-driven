import { AmqpConnection } from '@nestjs-plus/rabbitmq';
export declare class PublisherService {
    private readonly amqpConnection;
    constructor(amqpConnection: AmqpConnection);
    publish(exchange: string, routingKey: string, message: any): Promise<void>;
}
