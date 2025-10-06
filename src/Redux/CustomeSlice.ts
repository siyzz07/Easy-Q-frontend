import { createSlice } from "@reduxjs/toolkit";
import { customerGetAccessToken } from "../Utils/tokenUtils";

const token = customerGetAccessToken();
console.log("tttoken",token);


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


export const {customerLoginSuccess,customerLogOut} = cusotmerSlice.actions
export default cusotmerSlice.reducer
