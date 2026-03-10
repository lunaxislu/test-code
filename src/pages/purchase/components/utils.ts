import type { Coupon } from "@/shared/types/coupon";
import { couponType } from "@/shared/types/coupon";

export const formatCurrency = (price: number) => `$${price.toLocaleString()}`;

export const getDiscountPrice = ({
  coupon,
  totalPrice,
}: {
  coupon: Coupon | null;
  totalPrice: number;
}) => {
  if (!coupon) {
    return 0;
  }

  if (coupon.type === couponType.PRICE) {
    return coupon.value;
  }

  return Math.floor(totalPrice * (coupon.value / 100));
};
