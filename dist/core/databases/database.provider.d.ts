export declare const connection: Promise<import("typeorm").Connection>;
export declare const DatabaseProvider: {
    provide: string;
    useFactory: () => Promise<import("typeorm").Connection>;
}[];
