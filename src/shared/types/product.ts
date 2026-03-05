export type Category = {
  id: number;
  name: string;
  creationAt?: string;
  updatedAt?: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
};

export type ProductsResponse = {
  products: Product[];
  lastPage: boolean;
};

