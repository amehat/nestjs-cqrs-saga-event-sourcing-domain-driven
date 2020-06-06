import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';

import { ProductWasAddedEvent } from '../product-was-added.event';

@EventsHandler(ProductWasAddedEvent)
export class ProductWasAddedHandlerEvent implements IEventHandler<ProductWasAddedEvent> {
    handle(event: ProductWasAddedEvent) {
        Logger.log('ProductWasAddedHandlerEvent called');
        return event;
    }
}
