import React from "react";
import Sidebar from "../../../components/Admin/Sidebar";
import Navbar from "../../../components/Admin/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
     <div className="flex h-screen bg-gray-100 ">
      <Sidebar/>
      <div className="flex-1 flex flex-col ">
        <Navbar/>
      <Outlet/>
      </div>

    </div>
  );
};

export default Layout;