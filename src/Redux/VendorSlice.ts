import { createSlice } from "@reduxjs/toolkit";
import {
  decodeToken,
  getAccessToken,
} from "../utils/tokenUtils";
import { act } from "react";
import type { ITokenDdecode } from "../Shared/types/Types";

const tokenDecode: ITokenDdecode | null = decodeToken();

let token: string | null;

if (tokenDecode) {
  if (tokenDecode.role === "Vendor") {
    token = getAccessToken();
  } else {
    token = null;
  }
} else {
  token = null;
}


export interface IVendorState {
  vendorToken: string | null;
  isAuthenticated: boolean;
  hasShop: boolean;
  shopData?: any;
}

const initialState: IVendorState = {
  vendorToken: token ? token : null,
  isAuthenticated: !!token,
  hasShop: false,
  shopData: undefined,
};

const vendorSlice = createSlice({
  name: "vendorSlice",
  initialState,
  reducers: {
    vendorLoginSuccess: (state, action) => {
      state.vendorToken = action.payload;
      state.isAuthenticated = true;
    },
    vendorLogout: (state) => {
      state.vendorToken = null;
      state.isAuthenticated = false;
    },
    shopData: (state, action) => {
      state.shopData = action.payload;
    },
    hasShopData: (state, action) => {
      state.hasShop = action.payload;
    },
  },
});

export const { vendorLogout, vendorLoginSuccess, shopData, hasShopData } =
  vendorSlice.actions;
export default vendorSlice.reducer;
