import { ObjectID } from 'typeorm';
export declare class Catalog {
    id: ObjectID;
    name: string;
    sku: string;
    price: number;
    currency: string;
}
