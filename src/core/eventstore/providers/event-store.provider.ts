import { Connection } from 'typeorm';

import { EventStore } from '../entities/eventstore.entity';

export const EventStoreProvider = [
  {
      provide: 'EVENT_STORE_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(EventStore),
      inject: ['DATABASE_CONNECTION'],
  },
];
