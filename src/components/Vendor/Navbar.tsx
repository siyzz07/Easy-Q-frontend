import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Bell } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import NotificationModal from "../Shared/NotificationModal";
import { motion } from "framer-motion";

const Navbar = () => {

  const location = useLocation();
  const path = location?.pathname.split("/").filter(Boolean);

  const page = path[1]
    ? path[1].charAt(0).toUpperCase() + path[1].slice(1)
    : "";

  const dispatch = useDispatch();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const unreadCount =
    useSelector((state: any) => state.notification.totalUnreaded) || 0;

  return (
    <header className="bg-slate-800 border-b border-gray-700 px-4 sm:px-8 py-4">
      <div className="flex items-center justify-between">

        {/* LEFT : PAGE TITLE */}
        <h1 className="hidden sm:block text-2xl font-semibold text-white">
          {page === "" ? "Dashboard" : page}
        </h1>

     
        <h1 className="sm:hidden text-lg font-semibold text-white">
          {page === "" ? "Dashboard" : page}
        </h1>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* NOTIFICATION */}
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className={`relative flex items-center justify-center
                rounded-full border p-2 transition-colors
                ${
                  isNotificationOpen
                    ? "bg-white/10 border-white text-white"
                    : "border-slate-600 text-slate-400 hover:bg-slate-700 hover:text-white"
                }
              `}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />

              {/* BADGE */}
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

            {/* MODAL */}
            <NotificationModal
              isOpen={isNotificationOpen}
              onClose={() => setIsNotificationOpen(false)}
            />
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
