import { Injectable, Logger } from '@nestjs/common';
import * as amqp from 'amqplib';

import { config } from '../../configuration/config';
import { Message } from '../types/message.type';
import { Subscriber } from '../types/subscriber.type';
import { Subscription } from '../subscription.interface';

@Injectable()
export class RabbitMqService {
    private channel: amqp.Channel;
    private exchanges: Set<string> = new Set();

    public async publish(message: Message) {
        console.log('message', message);
        console.log(message.aggregateId);
        try {
            const channel = await this.getChannel();
            console.log('channel', channel);
            await this.ensureExchange(message.aggregateId, channel);
            console.log('aggregation:', message.aggregateId);
            return await channel.publish(message.aggregateId, '', Buffer.from(JSON.stringify(message)));
        } catch (e) {
            Logger.error(e, 'RabbitMqService.publish in error');
        }
    }

    public async subscribe(aggregation: string, subscriber: Subscriber): Promise<Subscription> {
        const channel = await this.getChannel();
        await this.ensureExchange(aggregation, channel);

        const q = await channel.assertQueue('', { exclusive: config.RabbitMQExclusive });
        channel.bindQueue(q.queue, aggregation, '');
        const response = await channel.consume(q.queue, (msg: any) => {
            subscriber(JSON.parse(msg.toString()));
        }, { noAck: config.RabbitMqNoAck });
        const consumerTag = response.consumerTag;

        return {
            remove: async () => {
                await channel.cancel(consumerTag);
                await channel.deleteQueue(q.queue);
            },
        };
    }

    private async getChannel() {
        console.log('>>> getChannel');
        console.log("this.channel:", this.channel);
        if (!this.channel) {
            const connection = await this.getConnection();
            console.log('getChanne connection');
            this.channel = await connection.createChannel();
            console.log('getChanne channel', this.channel);
            return this.channel;
        } else {
        console.log('<<<< getChanne return channel');

        return this.channel;
        }
    }

    private async getConnection() {
      try {
        Logger.log('getConnection called');
        Logger.log(config.RabbitMqUrl, 'config.RabbitMqUrl');
        const conn = await amqp.connect(`${config.RabbitMqUrl}?heartbeat=60`)
        .then(c => {
            console.log('C:', c)
            return c
        })
        .catch(e => {
            console.log('e', e)});
        Logger.log('=========> get connection <==========');
        return conn;
      } catch (e) {
        Logger.error(e, 'Error connection amqp');
      }
    }

    private async ensureExchange(aggregation: string, channel: amqp.Channel) {
        if (!this.exchanges.has(aggregation)) {
            await channel.assertExchange(aggregation, config.RabbitMqType, { durable: config.RabbitMqDurable, deleteQueue: config.RabbitMqDelete });
            this.exchanges.add(aggregation);
        }
    }
}
