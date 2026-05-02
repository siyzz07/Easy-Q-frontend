export const NotificationCategoryEnum = {
  BOOKING: "booking",
  CONTRACT: "contract",
  MESSAGE: "message",
} as const;

export type NotificationCategoryEnum = (typeof NotificationCategoryEnum)[keyof typeof NotificationCategoryEnum];

export const BookingNotificationTypeEnum = {
  BOOKING_COMPLETED: "booking_completed",
  BOOKING_CANCELLED: "booking_cancelled",
  BOOKING_RESCHEDULED: "booking_rescheduled",
  BOOKING_NEW: "new_booking",
} as const;

export type BookingNotificationTypeEnum = (typeof BookingNotificationTypeEnum)[keyof typeof BookingNotificationTypeEnum];
