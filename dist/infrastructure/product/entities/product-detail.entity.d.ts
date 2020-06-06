import { ObjectID } from 'typeorm';
export declare class ProductDetail {
    id: ObjectID;
    name: string;
    sku: string;
    price: number;
    currency: string;
}
