import type { Product } from "@/shared/types/product";

export type CartItem = Product & {
  count: number;
};

export type Cart = Record<number, CartItem>;
