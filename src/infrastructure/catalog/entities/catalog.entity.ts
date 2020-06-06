import { PrimaryGeneratedColumn, Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class Catalog {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column()
  price: number;

  @Column()
  currency: string;
}
