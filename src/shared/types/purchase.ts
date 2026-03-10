export const PHONE_PATTERN = /^\d{2,3}-\d{3,4}-\d{4}$/;
export const SHIPPING_COST = 5;

export const paymentMethod = {
  ACCOUNT_TRANSFER: "accountTransfer",
  CREDIT_CARD: "creditCard",
  PHONE: "phone",
  DEPOSIT_WITHOUT_PASSBOOK: "depositWithoutPassbook",
} as const;

export type PaymentMethod =
  (typeof paymentMethod)[keyof typeof paymentMethod];

export type PurchaseFormValues = {
  name: string;
  address: string;
  phone: string;
  requests: string;
  coupon: number;
  payment: PaymentMethod;
};
