import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import ProductCard from "@/pages/home/components/ProductList/ProductCard";
import ProductCardSkeleton from "@/pages/home/components/ProductList/ProductCardSkeleton";
import { useProducts } from "@/pages/home/hooks/useProducts";
import { pageRoutes } from "@/shared/config/routes";
import type { Product } from "@/shared/types/product";
import { useCartStore } from "@/store/cart-store";
import { useFilterStore } from "@/store/filter-store";
import { useUserStore } from "@/store/user-store";
const PRODUCT_PAGE_LIMIT = 20;

interface Props {
  limit?: number;
}
const ProductList = ({ limit = PRODUCT_PAGE_LIMIT }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const title = useFilterStore((state) => state.title);
  const categoryId = useFilterStore((state) => state.categoryId);
  const minPrice = useFilterStore((state) => state.minPrice);
  const maxPrice = useFilterStore((state) => state.maxPrice);
  const filter = useMemo(
    () => ({ title, categoryId, minPrice, maxPrice }),
    [title, categoryId, minPrice, maxPrice],
  );
  const add = useCartStore((state) => state.add);
  const isLogin = useUserStore((state) => state.isLogin);
  const {
    products,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useProducts({ filter, limit });

  const goLogin = () => {
    navigate(pageRoutes.login, {
      state: { prevPath: location.pathname },
    });
  };

  const handleClickCard = (productId: number) => {
    const nextPath = pageRoutes.productDetail.replace(
      ":productId",
      String(productId),
    );
    navigate(nextPath);
  };

  const handleClickAddCart = (product: Product) => {
    if (!isLogin) {
      goLogin();
      return;
    }

    add(product, 1);
    toast.success(`${product.title} 장바구니 추가 완료!`);
  };

  const handleClickPurchase = (product: Product) => {
    if (!isLogin) {
      goLogin();
      return;
    }

    add(product, 1);
    navigate(pageRoutes.cart);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {isPending
          ? Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClickCard={handleClickCard}
                onClickAddCart={handleClickAddCart}
                onClickPurchase={handleClickPurchase}
              />
            ))}
      </div>

      {hasNextPage ? (
        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "불러오는 중..." : "Show more"}
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default ProductList;
