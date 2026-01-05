import { createSlice } from "@reduxjs/toolkit";
import {
  decodeToken,
  getAccessToken,
} from "../utils/tokenUtils";
import type { ITokenDdecode } from "../Shared/types/Types";

const tokenDecode: ITokenDdecode | null = decodeToken();

let token: string | null;

if (tokenDecode) {
  if (tokenDecode.role === "Customer") {
    token = getAccessToken();
  } else {
    token = null;
  }
} else {
  token = null;
}

export interface ICustomerState {
  customerToken: string | null;
  isAuthenticated: boolean;
  customerData: any | null;
}

let initialState: ICustomerState = {
  customerToken: token ? token : null,
  isAuthenticated: !!token,
  customerData: null,
};

const cusotmerSlice = createSlice({
  name: "customerSlice",
  initialState,
  reducers: {
    customerLoginSuccess: (state, action) => {
      state.customerToken = action.payload;
      state.isAuthenticated = true;
    },
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
    customerLogOut: (state) => {
      state.customerToken = null;
      state.isAuthenticated = false;
      state.customerData = null;
    },
  },
});

export const { customerLoginSuccess, customerLogOut, setCustomerData } = cusotmerSlice.actions;
export default cusotmerSlice.reducer;
