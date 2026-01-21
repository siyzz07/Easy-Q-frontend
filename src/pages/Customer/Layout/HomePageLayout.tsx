import React, { useEffect } from "react";
import Navbar from "../../../components/Shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../../components/Shared/Footer";
import LandingPageBody from "../../../components/Customer/LandingPageBody";
import { getAccessToken } from "../../../utils/tokenUtils";
import { useDispatch } from "react-redux";
import { fetchNotification } from "../../../Redux/notificationSlice";
import type Store from "../../../Redux/Store";
export type AppDispatch = typeof Store.dispatch;

const HomePageLayout = () => {

   const token = getAccessToken()
   const dispatch = useDispatch<AppDispatch>()
  useEffect(()=>{

    if(token){

      dispatch(fetchNotification())
    }


  },[token,dispatch])


  const menuItems = [
    { label: "Home", path: "/customer" },
    { label: "Bookings", path: "/customer/bookings" },
    { label: "Contract", path: "/customer/contract" },
    { label: "Favorite", path: "/customer/favorite" },
    { label: "About", path: "/customer/about" },
  ];
  return (
<div className="flex flex-col min-h-screen bg-surface">
  <Navbar menu={menuItems} />
  <main className="flex-1 pt-16">
    <Outlet />
  </main>
  <Footer />
</div>
  );
};

export default HomePageLayout;
