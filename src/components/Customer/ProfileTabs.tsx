import {
  PencilLine,
  Lock,
  CreditCard,
  MapPin,
  Wallet,
  Bell,
  ChevronRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const items = [
  { label: "Profile Details", Icon: PencilLine, path: "/customer/profile", route: "profile" },
  { label: "Addresses", Icon: MapPin, path: "/customer/profile/customer-address", route: "customer-address" },
  { label: "Wallet Balance", Icon: Wallet, path: "/profile", route: "Profile" },
  { label: "My Bookings", Icon: CreditCard, path: "/customer/bookings", route: "bookings" },
  { label: "Notifications", Icon: Bell, path: "/profile", route: "Profile" },
  { label: "Account Security", Icon: Lock, path: "/customer/profile/security", route: "security" },
];

function ProfileTabs() {
  const location = useLocation();
  const pageArray = location.pathname.split("/").filter(Boolean);
  const page = pageArray[pageArray.length - 1] || "profile";

  return (
    <nav className="flex flex-col gap-1 w-full">
      {items.map(({ label, Icon, path, route }) => {
        const isActive = page === route;
        return (
          <Link
            key={label}
            to={path}
            className="group relative"
            aria-label={label}
          >
            <div
              className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-primary/5 text-primary font-bold"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon 
                  size={18} 
                  strokeWidth={isActive ? 2.5 : 2} 
                  className={isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"} 
                />
                <span className="text-sm tracking-tight font-medium">
                  {label}
                </span>
              </div>
              
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}

              <ChevronRight 
                size={14} 
                className={`transition-all duration-200 ${
                  isActive ? "text-primary opacity-100" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-muted-foreground/40"
                }`} 
              />
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

export default ProfileTabs;
