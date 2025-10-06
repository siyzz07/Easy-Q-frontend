import { configureStore } from "@reduxjs/toolkit";

import vendorSlice from './VendorSlice'
import customerSlice from './CustomeSlice'
import adminSlice from './AdminAuthSlice'



const Store = configureStore({

    reducer:{
        vendorSlice :vendorSlice,
        customerSlice:customerSlice,
        adminSlice:adminSlice

    }
})

export default Store