import { getRepository } from 'typeorm';
import { Logger } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import 'colors';

import { EventStore } from '../entities/eventstore.entity';
import { connection } from '../../databases/database.provider';
import { RabbitMqService } from '../../message-queue/rabbitmq/rabbitmq.service';

export class EventStoreStore {
         public eventStoreRepository;
         public eventStoreManager;
         public pubSub;

         public constructor() {
           this.getConnection();
           this.pubSub = new RabbitMqService();
         }

         public async getConnection() {
           try {
             const connectionEventStore = await connection;
             this.eventStoreManager = connectionEventStore.manager;
             this.eventStoreRepository = connectionEventStore.getRepository(
               EventStore,
             );
           } catch (e) {
             Logger.error(e, "EventStoreProvider.getConnection() in error");
           }
         }

         public async save(
           aggregateId: string,
           version: number,
           payload: any
         ): Promise<EventStore | Error> {
           try {
             const event = new EventStore();
             event.id = uuid();
             event.eventId = uuid();
             event.aggregateId = aggregateId;
             event.payload = payload;
             event.version = version;
             event.timestamp = Date.now();

             const resultSaved = await this.eventStoreRepository.save(event);
             this.pubSub.publish(event);
             return resultSaved;
           } catch (e) {
             Logger.error(event, "EventStoreProvider.save() in error");
             return new Error(e);
           }
         }

         public async getall(): Promise<EventStore[]> {
           try {
             return await this.eventStoreRepository.find({
               order: {
                 timestamp: "ASC"
               }
             });
           } catch (e) {
             Logger.error(e, "EventStoreProvider.getAll() in error");
           }
         }

         public async getByEventId(
           eventId: string
         ): Promise<EventStore | Error> {
           try {
             return await this.eventStoreRepository.findOne({ eventId });
           } catch (e) {
             Logger.error(
               eventId,
               "EventStoreProvider.getByEventId() in error"
             );
             return new Error(e);
           }
         }

         public async replayAllEvent() {
           try {
             const allEvents = await this.getall();
             const replayed = [];
             const pubSub = this.pubSub;
             allEvents.forEach(event => {
               Logger.log(event.eventId.green, " event replayed".green);
               pubSub.publish(event);
               replayed.push(event.eventId);
             });

             return replayed;
           } catch (e) {
             Logger.error(e, "EventStoreProvider.replay() in error".red);
             return new Error(e);
           }
         }

         public publish(event) {
           return this.pubSub.publish(event);
         }
       }
