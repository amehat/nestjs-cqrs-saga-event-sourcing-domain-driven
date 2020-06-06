import { IEventHandler } from '@nestjs/cqrs';
import { ProductWasAddedEvent } from '../product-was-added.event';
export declare class ProductWasAddedHandlerEvent implements IEventHandler<ProductWasAddedEvent> {
    handle(event: ProductWasAddedEvent): ProductWasAddedEvent;
}
