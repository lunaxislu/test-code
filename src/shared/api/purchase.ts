import { http } from "@/shared/api/http";
import type { CouponListResponse } from "@/shared/types/coupon";
import type { PurchaseFormValues } from "@/shared/types/purchase";

export const getCouponList = async () => {
  const response = await http.get<CouponListResponse>("/couponList");
  return response.data.couponList;
};

export const purchase = async (payload: PurchaseFormValues) => {
  await http.post("/purchase", payload);
};
