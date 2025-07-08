import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductsController } from '../../controllers/products.controller';
import { ProductsService } from '../../services/products/products.service';
import { Product } from './product.model';
import { Category } from 'src/models/categories/category.model';

@Module({
  imports: [SequelizeModule.forFeature([Product, Category])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
