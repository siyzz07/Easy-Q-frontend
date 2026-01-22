

import React, { useEffect } from "react";
import Navbar from "../../../components/Vendor/Navbar";
import Sidebar from "../../../components/Vendor/Sidebar";
import { Outlet } from "react-router-dom";
import { getAccessToken } from "../../../utils/tokenUtils";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Customer/Layout/HomePageLayout";
import { fetchNotification } from "../../../Redux/notificationSlice";

const Layout = () => {

     const token = getAccessToken()
     const dispatch = useDispatch<AppDispatch>()
    useEffect(()=>{
  
      if(token){
  
        dispatch(fetchNotification())
      }
  
  
    },[token,dispatch])


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
