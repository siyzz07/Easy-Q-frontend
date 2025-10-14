// import React from "react";
// import Navbar from "../../../components/Vendor/Navbar";
// import Sidebar from "../../../components/Vendor/Sidebar";
// import { Divide } from "lucide-react";
// import { Outlet } from "react-router-dom";

// const Layout = () => {
//   return (
//    <div className="flex h-screen bg-gray-100">
//   <Sidebar />
//   <div className="flex-1 flex flex-col">
//     <Navbar />
//     <Outlet />
//   </div>
// </div>
//   );
// };

// export default Layout;


import React from "react";
import Navbar from "../../../components/Vendor/Navbar";
import Sidebar from "../../../components/Vendor/Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
