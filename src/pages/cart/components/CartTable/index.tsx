import { Separator } from "@/components/ui/separator";
import type { CartItem } from "@/shared/types/cart";

import PriceSummary from "@/pages/cart/components/CartTable/PriceSummary";
import ProductInfoTable from "@/pages/cart/components/CartTable/ProductInfoTable";

type CartTableProps = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
};

const CartTable = ({ items, totalCount, totalPrice }: CartTableProps) => {
  return (
    <section className="space-y-4">
      <h1 className="py-3 text-3xl font-semibold">상품 리스트</h1>
      <ProductInfoTable items={items} />
      <Separator />
      <PriceSummary totalCount={totalCount} totalPrice={totalPrice} />
    </section>
  );
};

export default CartTable;
