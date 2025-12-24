import { createSlice } from "@reduxjs/toolkit";
import {  decodeToken, getAccessToken } from "../utils/tokenUtils";
import type { ITokenDdecode } from "../Shared/types/Types";

const tokenDecode: ITokenDdecode | null = decodeToken();

let token: string | null;

if (tokenDecode) {
  if (tokenDecode.role === "Admin") {
    token = getAccessToken();
  } else {
    token = null;
  }
} else {
  token = null;
}



export interface IAdminState {
  adminToken: string | null;
  isAuthenticated: boolean;
}

let initialState: IAdminState = {
  adminToken: token ? token : null,
  isAuthenticated: !!token,
};

const adminSlice = createSlice({
  name: "adminSlice",
  initialState,
  reducers: {
    adminLoginSuccess: (state, action) => {
      state.adminToken = action.payload;
      state.isAuthenticated = true;
    },
    adminLogOut: (state) => {
      state.adminToken = null;
      state.isAuthenticated = false;
    },
  },
});


export const {adminLoginSuccess,adminLogOut} = adminSlice.actions;
export default adminSlice.reducer;
