import type { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificaionAxiosInstance } from "../config/AxiosInstance";

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
  loading: boolean;
  error: string | null;
  totalUnreaded: number | 0;
}

const initialState: NotificationState = {
  notifications: [],
  loading: false,
  error: null,
  totalUnreaded: 0,
};

export const fetchNotification = createAsyncThunk<
  INotification[],
  void,
  { rejectValue: string }
>("notification/notifications", async (_, { rejectWithValue }) => {
  try {
    const response = await NotificaionAxiosInstance.get(
      "/notification/notifications"
    );
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error?.response?.data?.message || "Failed to fetch notifications"
    );
  }
});

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<INotification[]>) => {
      state.notifications = action.payload;
    },

    addNotification: (state, action: PayloadAction<INotification>) => {
      state.notifications.unshift(action.payload);

      if (!action.payload.isRead) {
        state.totalUnreaded += 1;
      }
    },

    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        (n) => n._id === action.payload
      );
      if (notification) notification.isRead = true;
      if(state.totalUnreaded >0){
        
        state.totalUnreaded = state.totalUnreaded - 1;
      }
    },

   

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (n) => n._id !== action.payload
      );
    },

    markAllAsRead: (state) => {
      state.notifications.forEach((n) => {
        n.isRead = true;
      });
      state.totalUnreaded = 0;
    },

    clearAll: (state) => {
      state.notifications = [];
      state.totalUnreaded = 0;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotification.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
        state.totalUnreaded = action.payload.reduce((acc, data) => {
          if (!data.isRead) {
            acc++;
          }
          return acc;
        }, 0);
      })
      .addCase(fetchNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Fetch failed";
      });
  },
});

export const {
  setNotifications,
  markAsRead,
  markAllAsRead, 
  removeNotification,
  clearAll,
  addNotification 
} = notificationSlice.actions;

export default notificationSlice.reducer;
