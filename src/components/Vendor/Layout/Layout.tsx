import React from "react";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { Divide } from "lucide-react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100 ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
