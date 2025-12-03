import React from "react";
import Navbar from "../../../components/Shared/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../../components/Shared/Footer";
import LandingPageBody from "../../../components/Customer/LandingPageBody";

const HomePageLayout = () => {
  const menuItems = [
    { label: "Home", path: "/customer" },
    { label: "Bookings", path: "/customer/bookings" },
    { label: "Contract", path: "/customer/contract" },
    { label: "Favorite", path: "/customer/favorite" },
    { label: "About", path: "/customer/about" },
  ];
  return (
    <>
      <div className="flex flex-col min-h-screen bg-surface">
        <Navbar menu={menuItems} />

        <main className="flex-1  ">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HomePageLayout;
