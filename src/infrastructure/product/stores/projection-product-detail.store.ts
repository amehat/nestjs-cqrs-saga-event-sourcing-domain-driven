import { Injectable } from '@nestjs/common';

import { connection } from '../../../core/databases/database.provider';
import { ProductDetail } from '../entities/product-detail.entity';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProjectionProductDetailStore {
  public eventStoreRepository;

  public constructor() {
    this.getConnexion();
  }

  public async getConnexion() {
    const connectionEventStore = await connection;
    this.eventStoreRepository = connectionEventStore.getRepository(ProductDetail);
  }

  public async save(product: Product) {
    return await this.eventStoreRepository.save(product);
  }

  public async getAll() {
    return await this.eventStoreRepository.find();
  }

  public async getById(id: string) {
    return await this.eventStoreRepository.findOne({ id });
  }

  public async getBySku(sku: string) {
    return await this.eventStoreRepository.findOne({ sku });
  }
}
