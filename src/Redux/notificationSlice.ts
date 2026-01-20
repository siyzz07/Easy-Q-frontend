import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface INotification {
  _id: string;
  __v: number;

  title: string;
  content: string;

  type: string;
  category: string;

  recipient: string;
  recipientType: "Customer" | "Vendor" | "Admin";

  isRead: boolean;

  metaData?: {
    booking?: {
      id: string;
      date: string;
      time: string;
    };
  };

  createdAt: string;
  updatedAt: string;
}

interface NotificationState {
  notifications: INotification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<INotification[]>) => {
      state.notifications = action.payload;
    },

    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload
      );
      if (notification) notification.isRead = true;
    },

    markAllAsRead: (state) => {
      state.notifications.forEach((n) => (n.isRead = true));
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n._id !== action.payload
      );
    },

    clearAll: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setNotifications,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAll,
} = notificationSlice.actions;

export default notificationSlice.reducer;