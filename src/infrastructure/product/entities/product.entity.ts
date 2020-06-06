import { Entity, PrimaryGeneratedColumn, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity()
export class Product {
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
