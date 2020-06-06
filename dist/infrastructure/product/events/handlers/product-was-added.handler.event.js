"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const product_was_added_event_1 = require("../product-was-added.event");
let ProductWasAddedHandlerEvent = class ProductWasAddedHandlerEvent {
    handle(event) {
        common_1.Logger.log('ProductWasAddedHandlerEvent called');
        return event;
    }
};
ProductWasAddedHandlerEvent = __decorate([
    cqrs_1.EventsHandler(product_was_added_event_1.ProductWasAddedEvent)
], ProductWasAddedHandlerEvent);
exports.ProductWasAddedHandlerEvent = ProductWasAddedHandlerEvent;
//# sourceMappingURL=product-was-added.handler.event.js.map