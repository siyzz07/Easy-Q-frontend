export const TransactionTypeEnum = {
  RAZORPAY: "razorpay",
  WALLET: "wallet",
  PAYATSHOP: "payAtShop",
} as const;

export type TransactionTypeEnum = (typeof TransactionTypeEnum)[keyof typeof TransactionTypeEnum];

export const TransactionStatusEnum = {
  CREATED: "created",
  SUCCESS: "success",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

export type TransactionStatusEnum = (typeof TransactionStatusEnum)[keyof typeof TransactionStatusEnum];
