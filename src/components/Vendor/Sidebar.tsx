import React, { useState } from "react";
import {
  LayoutDashboard,
  List,
  CreditCard,
  Users,
  Briefcase,
  FileText,
  User,
  LogOut,
} from "lucide-react";
import { NavLink, Route, useLocation, useNavigate } from "react-router-dom";
import { boolean } from "yup";
import { logoutVendor } from "../../Services/VendorApiServices";
import { removeToken, vendorRemoveAccessToken } from "../../Utils/tokenUtils";
import { useDispatch } from "react-redux";
import { vendorLogout } from "../../Redux/VendorSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  let location = useLocation();
  let path = location?.pathname.split("/").filter(Boolean);
  const page = path[1]
    ? path[1].charAt(0).toUpperCase() + path[1].slice(1)
    : "";

  let items = [
    { icon: LayoutDashboard, label: "Dashboard", path: "", route: "" },
    { icon: List, label: "Services", path: "Services", route: "services" },
    // { icon: Calendar, label: "Services" ,path:'Services',route:'vendor/dashboard'},
    {
      icon: CreditCard,
      label: "Payments",
      path: "Payments",
      route: "vendor/dashboard",
    },
    { icon: Users, label: "Staffs", path: "Staffs", route: "vendor/dashboard" },
    {
      icon: Briefcase,
      label: "Works",
      path: "Works",
      route: "vendor/dashboard",
    },
    {
      icon: FileText,
      label: "Contract",
      path: "Contract",
      route: "vendor/dashboard",
    },
    {
      icon: User,
      label: "Profile",
      path: "Profile",
      route: "/vendor/profile",
    },
  ];

  const submitLogout = async (e: React.FormEvent) => {
    try {
      const response = await logoutVendor();

      if (response?.status === 200) {
        dispatch(vendorLogout());
        removeToken();
        navigate("/vendor/login");
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <>
      {/* Top bar for mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-slate-800 text-white">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="text-xl font-semibold">Easy Q</span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)}>
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-slate-800 text-white flex flex-col w-64 z-40 transform pt-16 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:pt-0`}
      >
        {/* Desktop header */}
        <div className="p-6 border-b border-slate-700 hidden md:flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="text-xl font-semibold">Easy Q</span>
        </div>

        {/* Navigation */}
        {/* <nav className="flex-1 p-4 mt-4 md:mt-0">
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.route}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    item.path == page
                      ? "bg-slate-700 border-l-4 border-l-blue-500 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav> */}


        <nav className="flex-1 flex flex-col">
  <ul className="flex-1 overflow-y-auto p-4 space-y-2">
    {items.map((item, idx) => (
      <li key={idx}>
        <NavLink
          to={item.route}
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
              page == item.path
                ? "bg-slate-700 border-l-4 border-l-blue-500 text-white"
                : "text-slate-300 hover:bg-slate-700 hover:text-white"
            }`
          }
        >
          <item.icon size={18} />
          <span>{item.label}</span>
        </NavLink>
      </li>
    ))}
  </ul>

  {/* Logout */}
  <div className="p-4 border-t border-slate-700">
    <button
      onClick={submitLogout}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-700 hover:bg-slate-700 hover:text-white w-full transition-colors"
    >
      <LogOut size={18} color="red" />
      <span>Logout</span>
    </button>
  </div>
</nav>

        {/* Logout */}
       
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
