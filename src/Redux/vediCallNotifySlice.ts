import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { disconnectSocket } from "../Services/Socket/Socket"; 
interface SocketState {
  connected: boolean;
  incomingCall: { contractName: string; roomId: string } | null;
}


const initialState: SocketState = {
  connected: false,
  incomingCall: null,
};

const vediCallNotifySlice = createSlice({
  name: "vediCallNotifySlice",
  initialState,
  reducers: {
    connectSocketAction: (state, _action: PayloadAction<string>) => {
      state.connected = true;
    },
    
    disconnectSocketAction: (state) => {
      disconnectSocket(); 
      state.connected = false;
      state.incomingCall = null;
    },

    setIncomingCall: (state, action: PayloadAction<{ contractName: string; roomId: string } | null>) => {
      state.incomingCall = action.payload;
    },

    clearIncomingCall: (state) => {
      state.incomingCall = null;
    }
  },
});

export const { connectSocketAction, disconnectSocketAction, setIncomingCall, clearIncomingCall } = vediCallNotifySlice.actions;
export default vediCallNotifySlice.reducer;
