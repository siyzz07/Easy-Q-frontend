export const ContractStatusEnum = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
  CANCELLED: "cancelled",
} as const;

export type ContractStatusEnum = (typeof ContractStatusEnum)[keyof typeof ContractStatusEnum];
