import { Category } from '../../models/categories/category.model';
import { CreationAttributes } from 'sequelize';

export interface ICategoriesService {
  create(data: CreationAttributes<Category>): Promise<Category>;

  findAll(): Promise<{
    data: Category[];
    total: number;
  }>;

  findOne(id: number): Promise<Category>;

  update(id: number, data: Partial<Category>): Promise<Category>;

  remove(id: number): Promise<{ message: string }>;
}
