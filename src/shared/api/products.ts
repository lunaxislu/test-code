import { http } from "@/shared/api/http";
import type { Category, ProductsResponse } from "@/shared/types/product";

type ProductListParams = {
  offset?: number;
  limit?: number;
  title?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
};

type CategoriesResponse = {
  categories: Category[];
};

export const getProducts = async (params: ProductListParams = {}) => {
  const response = await http.get<ProductsResponse>("/products", { params });
  return response.data;
};

export const getCategories = async () => {
  // 강의: 카테고리 응답 형태를 단일 계약으로 가정
  // 내 프로젝트: 서버/목업 형태 차이를 흡수하기 위해 배열/객체 응답을 모두 허용
  const response = await http.get<Category[] | CategoriesResponse>("/categories");

  return Array.isArray(response.data)
    ? response.data
    : response.data.categories;
};

