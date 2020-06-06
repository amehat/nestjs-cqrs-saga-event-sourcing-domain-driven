export declare class CreateProductSheetProjectionCommand {
    readonly eventId: string;
    readonly payload: {
        sku: string;
        name: string;
        price: number;
        currency: string;
    };
    constructor(eventId: string, payload: {
        sku: string;
        name: string;
        price: number;
        currency: string;
    });
}
