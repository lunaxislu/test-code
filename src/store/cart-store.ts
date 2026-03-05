import { create } from "zustand";

import type { Cart, CartItem } from "@/shared/types/cart";
import type { Product } from "@/shared/types/product";

type CartStore = {
  cart: Cart;
  totalCount: number;
  totalPrice: number;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: number) => void;
  changeCount: (productId: number, quantity: number) => void;
  clear: () => void;
};

const getSummary = (cart: Cart) => {
  const items = Object.values(cart);
  const totalCount = items.reduce((acc, item) => acc + item.count, 0);
  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.count,
    0,
  );

  return { totalCount, totalPrice };
};

const updateCart = (cart: Cart) => ({
  cart,
  ...getSummary(cart),
});

export const useCartStore = create<CartStore>((set) => ({
  // 강의: cart를 itemId 기반 객체 맵으로 관리
  // 내 프로젝트: 동일한 소유권/조회 전략을 TS Record<number, CartItem>으로 타입 안전하게 유지
  cart: {},
  totalCount: 0,
  totalPrice: 0,
  add: (product, quantity = 1) =>
    set((state) => {
      const prev = state.cart[product.id];
      const nextItem: CartItem = {
        ...product,
        count: (prev?.count ?? 0) + quantity,
      };
      const nextCart = {
        ...state.cart,
        [product.id]: nextItem,
      };

      return updateCart(nextCart);
    }),
  remove: (productId) =>
    set((state) => {
      const nextCart = { ...state.cart };
      delete nextCart[productId];

      return updateCart(nextCart);
    }),
  changeCount: (productId, quantity) =>
    set((state) => {
      const target = state.cart[productId];
      if (!target) {
        return state;
      }

      const nextCart = {
        ...state.cart,
        [productId]: {
          ...target,
          count: quantity,
        },
      };

      return updateCart(nextCart);
    }),
  clear: () => set(updateCart({})),
}));
