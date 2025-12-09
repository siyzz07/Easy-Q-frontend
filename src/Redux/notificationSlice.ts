import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface INotification {
  title: string;
  message?: string;
  createdAt: string;
}

const initialState: INotification = {
  title: "",
  message: "",
  createdAt: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action: PayloadAction<INotification>) => {
      state.title = action.payload.title;
      state.message = action.payload.message || "";
      state.createdAt = action.payload.createdAt;
    },

    clearNotification: (state) => {
      state.title = "";
      state.message = "";
      state.createdAt = "";
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
