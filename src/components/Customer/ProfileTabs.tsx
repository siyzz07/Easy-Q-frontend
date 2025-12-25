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
  { label: "Edit Profile", Icon: PencilLine , path:"/customer/profile" , route:"profile"},
  { label: "Addresses", Icon: MapPin, path:"/customer/profile/customer-address", route:"customer-address" },
  { label: "Wallet", Icon: Wallet , path:"/profile" , route:"Profile"},
  { label: "Bookings", Icon: CreditCard , path:"/customer/bookings" , route:"bookings" },
  { label: "Notifications", Icon: Bell , path:"/profile" , route:"Profile" },
  { label: "Security", Icon: Lock , path:"/customer/profile/security", route:"security" },
];




function ProfileTabs() {
    
const location = useLocation();
let pageArray = location.pathname.split("/").filter(Boolean);
let page = pageArray[pageArray.length-1]+"";






  return (
    <div className="flex w-full flex-wrap items-center gap-x-6 gap-y-3  pb-3">
      {items.map(({label, Icon,path,route }) => (
        <Link
          key={label}
          to={path}
          className={`inline-flex items-center gap-2  transition hover:text-black hover:font-semibold ${page == route ? " text-md font-semibold ":"text-gray-500 text-sm" }`}
          aria-label={label}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          <span className="uppercase tracking-tight text-foreground/90">
            {label}
          </span>
        </Link>
      ))}
      <div className="mt-3 w-full border-1 border-gray-300" />
    </div>
  );
}

export default ProfileTabs;
