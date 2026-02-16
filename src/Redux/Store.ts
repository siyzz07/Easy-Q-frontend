import { configureStore } from "@reduxjs/toolkit";

import vendorSlice from "./VendorSlice";
import customerSlice from "./CustomeSlice";
import adminSlice from "./AdminAuthSlice";
import vediCallNotifySlice from "./vediCallNotifySlice";
import notificationSlice from "./notificationSlice";



const Store = configureStore({

    reducer:{
        vendorSlice :vendorSlice,
        customerSlice:customerSlice,
        adminSlice:adminSlice,
        vediCallNotifySlice:vediCallNotifySlice,
        notification :notificationSlice

    }
});

export type RootState = ReturnType<typeof Store.getState>;
export default Store;