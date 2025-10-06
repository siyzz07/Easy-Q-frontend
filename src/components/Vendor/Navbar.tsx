import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  let path = location?.pathname.split("/").filter(Boolean);
  const page = path[1]
    ? path[1].charAt(0).toUpperCase() + path[1].slice(1)
    : "";

  return (
    <header className="bg-slate-800 border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">
          {page == "" ? "Dashboard" : page}
        </h1>
        <div className="flex items-center gap-4">
          {/* <button  className="bg-slate-700 text-white border-slate-700 hover:bg-slate-600">
                Recharge Plans
              </button> */}
          {/* <span className="text-gray-600">Blade Shop</span> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
