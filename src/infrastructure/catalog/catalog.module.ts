import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../../core/databases/database.module';
import { AddProductToCatalogHandler } from '../../business-logic/domains/catalog/add-product-to-catalog.handler'
import { CatalogStore } from './stores/catalog.store';
import { CatalogProvider } from './providers/catalog.provider';

@Module({
    imports: [
        CqrsModule,
        DatabaseModule,
    ],
    providers: [
        AddProductToCatalogHandler,
        CatalogStore,
        ...CatalogProvider,
    ],
})
export class CatalogModule {}
