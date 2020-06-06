"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventstore_entity_1 = require("../entities/eventstore.entity");
exports.EventStoreProvider = [
    {
        provide: 'EVENT_STORE_REPOSITORY',
        useFactory: (connection) => connection.getRepository(eventstore_entity_1.EventStore),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=event-store.provider.js.map