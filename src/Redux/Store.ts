import { configureStore } from "@reduxjs/toolkit";

import vendorSlice from "./VendorSlice";
import customerSlice from "./CustomeSlice";
import adminSlice from "./AdminAuthSlice";
import socket from './SocketSlice'
import notificationSlice from './notificationSlice'



const Store = configureStore({

    reducer:{
        vendorSlice :vendorSlice,
        customerSlice:customerSlice,
        adminSlice:adminSlice,
        socket:socket,
        notification :notificationSlice

    }
});

export default Store;