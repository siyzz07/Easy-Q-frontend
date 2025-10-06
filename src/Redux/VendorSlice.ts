

import { createSlice } from "@reduxjs/toolkit";
import { vendorGetAccessToken } from "../Utils/tokenUtils";
import { act } from "react";



const token:string|null = vendorGetAccessToken()

export interface IVendorState{
    vendorToken :string|null
    isAuthenticated :boolean
    hasShop: boolean;
    shopData?: any;
 
}

const initialState:IVendorState = {
    vendorToken : token?token:null,
    isAuthenticated:(!!token),  
    hasShop: false,
    shopData: undefined,
   
}


const vendorSlice = createSlice({
    name :'vendorSlice',
    initialState,
    reducers:{
        vendorLoginSuccess:(state,action)=>  {
                state.vendorToken =action.payload
                state.isAuthenticated=true
        },
        vendorLogout :(state) => {
                state.vendorToken = null
                state.isAuthenticated = false
        },
        shopData :(state,action) =>{

                state.shopData = action.payload
        },
        hasShopData:(state,action)=>{

                state.hasShop = action.payload
        }
    }

})


export const {vendorLogout,vendorLoginSuccess,shopData,hasShopData} = vendorSlice.actions
export default vendorSlice.reducer