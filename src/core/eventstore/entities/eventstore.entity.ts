import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class EventStore {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id: string;

  @Column({ unique: true })
  eventId: string;

  @Column()
  aggregateId: string;

  @Column()
  version: number;

  @Column()
  payload: any;

  @Column()
  timestamp: number;
}
