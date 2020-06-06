import { AmqpConnection } from '@nestjs-plus/rabbitmq';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PublisherService {
    public constructor(private readonly amqpConnection: AmqpConnection) {}

    public async publish(
    exchange: string,
    routingKey: string,
    message: any,
  ): Promise<void> {
    try {
        await this.amqpConnection.publish(exchange, routingKey, message);
    } catch (e) {
        Logger.error(
          {
            error: e,
            exchange,
            routingKey,
            message,
          },
          'Error publish RabbitMq',
        );
    }
  }
}