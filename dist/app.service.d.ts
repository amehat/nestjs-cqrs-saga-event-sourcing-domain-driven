import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { RedisService } from 'nestjs-redis';
declare type messageType = {
    message: string;
};
export declare class AppService {
    private readonly amqpConnection;
    private readonly redisService;
    constructor(amqpConnection: AmqpConnection, redisService: RedisService);
    getHello(): string;
    publishEvent(message: messageType, exchange?: string, routingKey?: string): Promise<string>;
    listenEvent(msg: any): Promise<void>;
}
export {};
