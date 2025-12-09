import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { connectSocket, disconnectSocket, getSocket } from "../Services/Socket/Socket";
import { registerSocketEvents } from "../Services/Socket/SocketEvents";

interface SocketState {
  connected: boolean;
}


const initialState: SocketState = {
  connected: false,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    connectSocketAction: (state, action: PayloadAction<string>) => {
      const token = action.payload;
      connectSocket(token);
      registerSocketEvents();
      state.connected = true;
    },
    disconnectSocketAction: (state) => {
      disconnectSocket();
      state.connected = false;
    },
  },
});

export const { connectSocketAction, disconnectSocketAction } = socketSlice.actions;
export default socketSlice.reducer;
