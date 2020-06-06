import { Injectable, Inject, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Product } from '../entities/product.entity';
import { StoreProductInterface } from './store-product.interface';

@Injectable()
export class ProductStore implements StoreProductInterface {
  public constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
  ) {}

  public async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  public async getProductBySku(sku: string): Promise<Product | Error> {
    try {
      return await this.productRepository.findOne({ sku });
    } catch (e) {
      Logger.error(sku, 'ProductStore.create() in error');
      return new Error(e);
    }
  }

  public async register(
    productEntity: Product,
    sku?: string,
  ): Promise<Product | Error> {
    if (sku) {
      return await this.update(productEntity, sku);
    } else {
      return await this.create(productEntity);
    }
  }

  private async create(productEntity: Product): Promise<Product | Error> {
    try {
      const product = this.productRepository.create(productEntity);
      return await this.productRepository.save(product);
    } catch (e) {
      Logger.error(productEntity, 'ProductStore.create() in error');
      return new Error(e);
    }
  }

  private async update(
    productEntity: Product,
    sku: string,
  ): Promise<Product | Error> {
    try {
      await this.productRepository.update({ sku }, productEntity);
      return this.productRepository.findOne({ sku });
    } catch (e) {
      Logger.error(productEntity, `ProductStore.update(${sku}) in error`);
      return new Error(e);
    }
  }

  public async removeProduct(sku: string): Promise<Product | Error> {
    try {
      const product = this.productRepository.findOne({ sku });
      await this.productRepository.delete({ sku });

      return product;
    } catch (e) {
      Logger.error(sku, 'ProductStore.removeProduct() in error');
      return new Error(e);
    }
  }
}
