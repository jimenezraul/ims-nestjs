import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from '../categories/category.model';

@Table
export class Product extends Model<Product> {
  @Column
  declare name: string;

  @Column
  declare sku: string;

  @Column(DataType.TEXT)
  declare description: string;

  @Column(DataType.INTEGER)
  declare quantity: number;

  @Column(DataType.FLOAT)
  declare price: number;

  @ForeignKey(() => Category)
  @Column
  declare categoryId: number;

  @BelongsTo(() => Category)
  declare category: Category;

  @Column
  declare location: string;
}
