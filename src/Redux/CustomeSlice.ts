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
}

let initialState: ICustomerState = {
  customerToken: token ? token : null,
  isAuthenticated: !!token,
};

const cusotmerSlice = createSlice({
  name: "customerSlice",
  initialState,
  reducers: {
    customerLoginSuccess: (state, action) => {
      state.customerToken = action.payload;
      state.isAuthenticated = true;
    },
    customerLogOut: (state) => {
      state.customerToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { customerLoginSuccess, customerLogOut } = cusotmerSlice.actions;
export default cusotmerSlice.reducer;
