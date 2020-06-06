import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@nestjs-plus/rabbitmq';

import { config } from '../configuration/config';
import { PublisherService } from './rabbitmq/publisher.service';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      exchanges: [
        {
          name: 'exchange-eventstore',
          type: 'fanout',
        },
        {
          name: 'product.registerProduct',
          type: 'fanout',
        },
      ],
      uri: config.RabbitMqUrl,
    }),
  ],
  providers: [PublisherService],
  exports: [PublisherService],
})
export class RabbitmqModule {}
