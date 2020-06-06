import { ObjectID } from 'typeorm';
export declare class Product {
    id: ObjectID;
    name: string;
    sku: string;
    price: number;
    currency: string;
}
