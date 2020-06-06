"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const catalog_entity_1 = require("../entities/catalog.entity");
exports.CatalogProvider = [
    {
        provide: 'CATALOG_REPOSITORY',
        useFactory: (connection) => connection.getRepository(catalog_entity_1.Catalog),
        inject: ['DATABASE_CONNECTION'],
    },
];
//# sourceMappingURL=catalog.provider.js.map