import { useQuery } from "@tanstack/react-query";
import { useWatch } from "react-hook-form";

import { getCouponList } from "@/shared/api/purchase";
import { NO_COUPON_ID } from "@/shared/types/coupon";

const COUPON_LIST_QUERY_KEY = ["couponList"] as const;

const useCouponList = () => {
  const selectedCouponId = useWatch({ name: "coupon" });

  const query = useQuery({
    queryKey: COUPON_LIST_QUERY_KEY,
    queryFn: getCouponList,
  });

  const couponList = query.data ?? [];
  const selectedCoupon =
    selectedCouponId === NO_COUPON_ID
      ? null
      : couponList.find((coupon) => coupon.id === selectedCouponId) ?? null;

  return {
    ...query,
    couponList,
    selectedCoupon,
  };
};

export default useCouponList;
