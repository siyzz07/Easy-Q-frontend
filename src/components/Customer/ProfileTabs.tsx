"use client";

import {
  PencilLine,
  Lock,
  CreditCard,
  MapPin,
  Wallet,
  Bell,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const items = [
  { label: "Profile", Icon: PencilLine , path:"/customer/profile" , route:"profile"},
  { label: "Addresses", Icon: MapPin, path:"/customer/profile/customer-address", route:"customer-address" },
  { label: "Wallet", Icon: Wallet , path:"/profile" , route:"wallet"},
  { label: "Bookings", Icon: CreditCard , path:"/customer/bookings" , route:"bookings" },
  { label: "Notifications", Icon: Bell , path:"/customer/profile/notifications" , route:"notifications" },
  { label: "Security", Icon: Lock , path:"/customer/profile/security", route:"security" },
];

function ProfileTabs() {
  const location = useLocation();
  let pageArray = location.pathname.split("/").filter(Boolean);
  let page = pageArray[pageArray.length-1] || "profile";
  
  // Handle edge case where /customer/profile index is just "profile"
  if (location.pathname === "/customer/profile") {
      page = "profile";
  }

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex w-max items-center gap-8">
        {items.map(({label, Icon, path, route}) => {
          // Simple active check logic
          const isActive = page === route || (route === "profile" && location.pathname === "/customer/profile");

          return (
            <Link
              key={label}
              to={path}
              className={`group relative flex items-center gap-2 py-4 text-sm font-medium transition-colors duration-200
                ${isActive ? "text-blue-600" : "text-gray-500 hover:text-gray-900"}
              `}
              aria-label={label}
            >
              <Icon 
                size={18} 
                className={`transition-colors duration-200 ${isActive ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"}`} 
              />
              <span className="tracking-wide">{label}</span>
              
              {/* Active Bottom Border */}
              {isActive && (
                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 rounded-t-full" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default ProfileTabs;
