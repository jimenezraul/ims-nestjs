import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Product } from '../../models/products/product.model';
import { CreationAttributes } from 'sequelize';
import { IProductsService } from './product.service.interface';

@Injectable()
export class ProductsService implements IProductsService {
  constructor(@InjectModel(Product) private productModel: typeof Product) {}

  // Pagination
  async findAll(query: PaginationDto) {
    const { page = '1', limit = '10' } = query;
    const offset = (parseInt(String(page)) - 1) * parseInt(String(limit));
    const where: any = {};

    const products = await this.productModel.findAndCountAll({
      where,
      limit: parseInt(String(limit)),
      offset,
    });

    return {
      total: products.count,
      page: parseInt(String(page)),
      data: products.rows,
    };
  }

  // Find one by ID
  async findOne(id: number) {
    const product = await this.productModel.findByPk(id);
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  // Create New Product
  async create(data: AddProductRequest) {
    const { name, sku, quantity, price, categoryId, location } = data;

    if (
      !name ||
      !sku ||
      quantity == null ||
      price == null ||
      !categoryId ||
      !location
    ) {
      throw new BadRequestException('Missing required fields');
    }

    const parsedQuantity = Number(quantity);
    const parsedPrice = Number(price);
    if (isNaN(parsedQuantity) || isNaN(parsedPrice)) {
      throw new BadRequestException('Quantity and price must be numbers');
    }

    return this.productModel.create({
      name: data.name,
      sku: data.sku,
      quantity: Number(data.quantity),
      price: Number(data.price),
      categoryId: data.categoryId,
      location: data.location,
      description: data.description,
    } as CreationAttributes<Product>);
  }

  // Update Product
  async update(id: number, data: Product) {
    const product = await this.productModel.findByPk(id);
    if (!product) throw new NotFoundException('Product not found');
    return product.update(data);
  }

  //  Delete Product
  async delete(id: number) {
    const product = await this.productModel.findByPk(id);
    if (!product) throw new NotFoundException('Product not found');
    await product.destroy();
    return { message: 'Product deleted' };
  }

  // Search product by Query or Category
  async search(queryParams: ProductSearchQuery) {
    const {
      query = '',
      page = '1',
      limit = '10',
      categoryId = 0,
    } = queryParams;

    const offset = (parseInt(String(page)) - 1) * parseInt(String(limit));
    const where: any = {};
    const filters: Record<string, any>[] = [];

    const searchTerm = (query as string).trim();

    // Add search filters if query is not empty
    if (searchTerm.length > 0) {
      filters.push({
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchTerm}%` } },
          { sku: { [Op.iLike]: `%${searchTerm}%` } },
        ],
      });
    }

    // Add category filter if categoryId is a valid number (> 0)
    const parsedCategoryId = parseInt(String(categoryId));
    if (!isNaN(parsedCategoryId) && parsedCategoryId > 0) {
      filters.push({ categoryId: parsedCategoryId });
    }

    // Apply filters only if any exist
    if (filters.length > 0) {
      where[Op.and] = filters;
    }

    const products = await this.productModel.findAndCountAll({
      where,
      limit: parseInt(String(limit)),
      offset,
    });

    return {
      total: products.count,
      page: parseInt(String(page)),
      data: products.rows,
    };
  }
}
