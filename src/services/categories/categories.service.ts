import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../../models/categories/category.model';
import { CreationAttributes } from 'sequelize';
import { ICategoriesService } from './categories.service.interface';

@Injectable()
export class CategoriesService implements ICategoriesService {
  constructor(@InjectModel(Category) private categoryModel: typeof Category) {}

  async create(data: CreationAttributes<Category>) {
    return this.categoryModel.create(data);
  }

  async findAll() {
    const categories = await this.categoryModel.findAll();
    return { data: categories, total: categories.length };
  }

  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: number, data: Partial<Category>) {
    const category = await this.findOne(id);
    return category.update(data);
  }

  async remove(id: number) {
    const category = await this.findOne(id);
    await category.destroy();
    return { message: 'Category deleted' };
  }
}
