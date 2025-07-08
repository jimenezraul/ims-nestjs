import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from '../products/product.model';

@Table
export class Category extends Model<Category> {
  @Column
  declare name: string;

  @Column(DataType.TEXT)
  declare description: string;

  @HasMany(() => Product)
  declare products: Product[];
}
