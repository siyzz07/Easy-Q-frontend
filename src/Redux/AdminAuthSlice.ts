import { createSlice } from "@reduxjs/toolkit";
import { adminGetAccessToken } from "../Utils/tokenUtils";

const token = adminGetAccessToken()



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


export const {adminLoginSuccess,adminLogOut} = adminSlice.actions
export default adminSlice.reducer
