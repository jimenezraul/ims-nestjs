// src/categories/category.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from './category.model';
import { CategoriesService } from '../../services/categories/categories.service';
import { CategoriesController } from '../../controllers/categories.controller';
import { Product } from '../products/product.model';

@Module({
  imports: [SequelizeModule.forFeature([Category, Product])],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoryModule {}
