import { useState } from "react";
import {
  LayoutDashboard,
  List,
  CreditCard,
  Users,
  Briefcase,
  FileText,
  User,
  LogOut,
  Calendar,
  Wallet,
  X,
  Menu,
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutVendor } from "../../Services/ApiService/VendorApiServices";
import { removeToken } from "../../utils/tokenUtils";
import { useDispatch, useSelector } from "react-redux";
import { vendorLogout } from "../../Redux/VendorSlice";
import { disconnectSocketAction } from "../../Redux/SocketSlice";
import { Bell } from "lucide-react";
import NotificationModal from "../Shared/NotificationModal";
import { motion } from "framer-motion";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const unreadCount =
    useSelector((state: any) => state.notification.totalUnreaded) || 0;

  let location = useLocation();
  let path = location?.pathname.split("/").filter(Boolean);
  const page = path[1]
    ? path[1].charAt(0).toUpperCase() + path[1].slice(1)
    : "";

  let items = [
    { icon: LayoutDashboard, label: "Dashboard", path: "", route: "" },
    { icon: List, label: "Services", path: "Services", route: "services" },
    { icon: Calendar, label: "Bookings" ,path:"Bookings",route:"bookings"},
    { icon: Wallet, label: "Wallet", path: "Wallet", route: "wallet" },
    { icon: Users, label: "Staffs", path: "Staffs", route: "/vendor/staffs" },
    {
      icon: Briefcase,
      label: "Works",
      path: "Works",
      route: "/vendor/works",
    },
    {
      icon: FileText,
      label: "Contract",
      path: "Contract",
      route: "/vendor/contracts",
    },
    {
      icon: User,
      label: "Profile",
      path: "Profile",
      route: "/vendor/profile",
    },
  ];

  const submitLogout = async () => {
    try {
      const response = await logoutVendor();

      if (response?.status === 200) {
        dispatch(vendorLogout());
        removeToken();
        dispatch(disconnectSocketAction());
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
      <div className="md:hidden fixed top-0 left-0 right-0 z-[60] flex items-center justify-between p-4 bg-slate-800 border-b border-slate-700 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-black text-sm">Q</span>
          </div>
          <span className="text-lg font-bold text-white tracking-tight">Easy Q</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <div className="relative">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className={`p-2 rounded-xl transition-all ${
                isNotificationOpen ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              <Bell size={22} />
              {unreadCount > 0 && (
                <span className="absolute top-1 border right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-slate-800">
                  {unreadCount}
                </span>
              )}
            </motion.button>
            <NotificationModal isOpen={isNotificationOpen} onClose={() => setIsNotificationOpen(false)} />
          </div>

          {/* Toggle Sidebar Button */}
          <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-400 hover:text-white">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
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
       

        <nav className="flex-1 flex flex-col">
          <ul className="flex-1 overflow-y-auto p-4 space-y-2">
            {items.map((item, idx) => (
              <li key={idx}>
                <NavLink
                  to={item.route}
                  onClick={()=>setIsOpen(false)}
                  className={() =>
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
          className="fixed inset-0 bg-[#00000046] bg-opacity-30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
