export const BookingStatusEnum = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  NO_SHOW: "no_show",
  RESCHEDULED: "rescheduled",
} as const;

export type BookingStatusEnum = (typeof BookingStatusEnum)[keyof typeof BookingStatusEnum];
