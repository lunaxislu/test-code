import { useMemo } from "react";

import { useCartStore } from "@/store/cart-store";

export const useCartSummary = () => {
  const cart = useCartStore((state) => state.cart);
  const totalCount = useCartStore((state) => state.totalCount);
  const totalPrice = useCartStore((state) => state.totalPrice);

  const items = useMemo(() => Object.values(cart), [cart]);

  return {
    items,
    totalCount,
    totalPrice,
    isEmpty: items.length === 0,
  };
};
