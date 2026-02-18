import {
  User,
  Shield,
  MapPin,
  Wallet,
  ChevronRight,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const items = [
  { label: "Profile", Icon: User, path: "/customer/profile", route: "profile" },
  { label: "Addresses", Icon: MapPin, path: "/customer/profile/customer-address", route: "customer-address" },
  { label: "Wallet", Icon: Wallet, path: "wallet", route: "wallet" },
  // { label: "Notifications", Icon: Bell, path: "/customer/profile/notifications", route: "notifications" },
  { label: "Security", Icon: Shield, path: "/customer/profile/security", route: "security" },
];

function ProfileTabs() {
  const location = useLocation();
  let pageArray = location.pathname.split("/").filter(Boolean);
  let page = pageArray[pageArray.length - 1] || "profile";

  if (location.pathname === "/customer/profile") {
    page = "profile";
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map(({ label, Icon, path, route }) => {
        const isActive = page === route || (route === "profile" && location.pathname === "/customer/profile");

        return (
          <Link
            key={label}
            to={path}
            className={`group relative flex items-center justify-between p-4 rounded-2xl transition-all duration-300
              ${isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}
            `}
          >
            <div className="flex items-center gap-3 relative z-10">
              <div className={`p-2 rounded-xl transition-colors duration-300 ${isActive ? "bg-white/20" : "bg-slate-100 group-hover:bg-white"}`}>
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[15px] font-bold tracking-tight ${isActive ? "text-white" : "text-slate-600"}`}>
                {label}
              </span>
            </div>

            {isActive ? (
              <motion.div 
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-600 rounded-2xl -z-0"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            ) : (
               <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500 group-hover:translate-x-1 transition-all" />
            )}
            
            {/* Notification Badge Mockup for Notifications */}
            {label === "Notifications" && !isActive && (
               <span className="absolute top-4 right-10 h-2 w-2 bg-blue-600 rounded-full" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default ProfileTabs;
