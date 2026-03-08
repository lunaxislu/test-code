import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";

import { getProducts } from "@/shared/api/products";
import type { FilterState } from "@/shared/types/filter";

type UseProductsOptions = {
  filter: FilterState;
  limit: number;
};

export const useProducts = ({ filter, limit }: UseProductsOptions) => {
  const query = useInfiniteQuery({
    queryKey: ["products", filter, limit],
    initialPageParam: 0,
    queryFn: ({ pageParam }) =>
      getProducts({
        offset: pageParam,
        limit,
        title: filter.title || undefined,
        categoryId: filter.categoryId ?? undefined,
        minPrice: filter.minPrice ? Number(filter.minPrice) : undefined,
        maxPrice: filter.maxPrice ? Number(filter.maxPrice) : undefined,
      }),
    // 강의(v4): 페이지 계산을 내부 헬퍼가 담당
    // 내 프로젝트(v5): getNextPageParam으로 다음 offset을 명시
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.lastPage) {
        return undefined;
      }

      return allPages.length * limit;
    },
  });

  const products = useMemo(
    () => query.data?.pages.flatMap((page) => page.products) ?? [],
    [query.data],
  );

  return {
    ...query,
    products,
  };
};
