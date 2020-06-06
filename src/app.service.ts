import { Injectable, Logger } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@nestjs-plus/rabbitmq';
import { RedisService } from 'nestjs-redis';

type messageType = {
  message: string;
}

@Injectable()
export class AppService {
  public constructor(
    private readonly amqpConnection: AmqpConnection,
    private readonly redisService: RedisService,
  ) {}

  public getHello(): string {
    return 'Nestjs with CQRS SAGA EVENT SOURCING DOMAIN-DESIGN DRIVEN';
  }

  public async publishEvent(message: messageType, exchange = 'exchange-eventstore', routingKey = 'product.registerProduct'): Promise<string> {
    const client = await this.redisService.getClient('test');
    await this.amqpConnection.publish(exchange, routingKey, message);
    return 'message published';
  }

  @RabbitSubscribe({
    exchange: 'exchange-eventstore',
    routingKey: 'product.registerProduct',
  })
  public async listenEvent(msg: any): Promise<void> {
    console.log('listent msg msg', msg);
    Logger.warn(msg, 'Listen message');
  }
}
