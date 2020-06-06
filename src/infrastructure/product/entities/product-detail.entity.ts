import { Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';

@Entity()
export class ProductDetail {
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
