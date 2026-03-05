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

// 강의: 상세/목록에서 동일 Product 스키마를 사용
// 내 프로젝트: API 계약 명확화를 위해 상세 응답 타입 별칭을 분리
export type ProductDetail = Product;

export type ProductsResponse = {
  products: Product[];
  lastPage: boolean;
};
