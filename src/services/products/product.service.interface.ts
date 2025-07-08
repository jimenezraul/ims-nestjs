import { Product } from '../../models/products/product.model';

export interface IProductsService {
  findAll(query: PaginationDto): Promise<{
    total: number;
    page: number;
    data: Product[];
  }>;

  findOne(id: number): Promise<Product>;

  create(data: AddProductRequest): Promise<Product>;

  update(id: number, data: Product): Promise<Product>;

  delete(id: number): Promise<{ message: string }>;

  search(queryParams: ProductSearchQuery): Promise<{
    total: number;
    page: number;
    data: Product[];
  }>;
}
