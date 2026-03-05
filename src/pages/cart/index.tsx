import CartTable from "@/pages/cart/components/CartTable";
import EmptyNotice from "@/pages/cart/components/EmptyNotice";
import { useCartSummary } from "@/pages/cart/hooks/useCartSummary";

const CartPage = () => {
  const { isEmpty, items, totalCount, totalPrice } = useCartSummary();

  if (isEmpty) {
    return <EmptyNotice />;
  }

  return <CartTable items={items} totalCount={totalCount} totalPrice={totalPrice} />;
};

export default CartPage;
