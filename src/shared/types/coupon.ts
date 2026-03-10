export const NO_COUPON_ID = 0;

export const couponType = {
  PRICE: "price",
  PERCENT: "percent",
} as const;

export type CouponType = (typeof couponType)[keyof typeof couponType];

export type Coupon = {
  id: number;
  name: string;
  type: CouponType;
  value: number;
};

export type CouponListResponse = {
  couponList: Coupon[];
};
