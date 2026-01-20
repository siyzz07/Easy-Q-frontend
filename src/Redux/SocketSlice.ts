import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { disconnectSocket } from "../Services/Socket/Socket"; // We can keep disconnect if we want, but ideally remove too.

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
