
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Vendor/Navbar";
import Sidebar from "../../../components/Vendor/Sidebar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getAccessToken } from "../../../utils/tokenUtils";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../Customer/Layout/HomePageLayout";
import { fetchNotification } from "../../../Redux/notificationSlice";

const Layout = () => {
const [inChat, setInChat] = useState(true);
  const { pathname } = useLocation();
  const navigate = useNavigate();  
     const token = getAccessToken()
     const dispatch = useDispatch<AppDispatch>()

  console.log('pathname :>> ', pathname);

       useEffect(() => {
         const pathSegments = pathname.split("/").filter(v => v.length > 0);
         const isInsideChat = pathSegments[0] === "Vendor" && pathSegments[1] === "video-call" && pathSegments.length === 3;
         setInChat(!isInsideChat);
       }, [pathname]);



    useEffect(()=>{
  
      if(token){
  
        dispatch(fetchNotification())
      }
  
  
    },[token,dispatch])


  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
     {inChat && <Sidebar />}

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
