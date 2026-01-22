import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotification } from "../../Redux/notificationSlice"; // Adjust path if needed
import NotificationModal from "../Shared/NotificationModal"; // Adjust path if needed
import { motion } from "framer-motion";

const Navbar = () => {
  let location = useLocation();
  let path = location?.pathname.split("/").filter(Boolean);
  const page = path[1]
    ? path[1].charAt(0).toUpperCase() + path[1].slice(1)
    : "";

  const dispatch = useDispatch();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const unreadCount = useSelector((state: any) => state.notification.totalUnreaded) || 0;

  // useEffect(() => {
  //   // @ts-ignore
  //   dispatch(fetchNotification());
  // }, [dispatch]);

  return (
    <header className="bg-slate-800 border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">
          {page == "" ? "Dashboard" : page}
        </h1>
        <div className="flex items-center gap-4">
          
          {/* Notification Bell */}
           <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className={`relative rounded-full border p-2 transition-colors ${
                    isNotificationOpen
                      ? "bg-white/10 border-white text-white"
                      : "border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white"
                  }`}
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span
                      className="
                       absolute -top-1 -right-1
                       min-w-[18px] h-[18px]
                       px-1
                       flex items-center justify-center
                       rounded-full
                       bg-red-500 text-white
                       text-[11px] font-bold
                       ring-2 ring-slate-800
                     "
                    >
                      {unreadCount}
                    </span>
                  )}
                </motion.button>
             
             <NotificationModal
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
             />
           </div>

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
