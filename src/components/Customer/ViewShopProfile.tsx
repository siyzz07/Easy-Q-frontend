import React, { type FC } from "react";
import { MapPin, Star, Heart, Mail, Clock } from "lucide-react";
import type { IVendroShopData } from "../../Shared/types/Types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { IvendroFullData } from "../../pages/Customer/ViewServicesPage";

interface ViewShopProfileInterface {
  data: IvendroFullData;
}

const ViewShopProfile: FC<ViewShopProfileInterface> = ({ data }) => {


   function isTodayWorking(workingDaysStr?: string[]) {


    if (!workingDaysStr) return false;

    let workingDays =workingDaysStr
  

    const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = daysShort[new Date().getDay()];
      
    return workingDays.includes(today);
  }

  const convertRailwayTime = (time24?: string) => {
    if (!time24) return "--";
    const [hours, minutes] = time24.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hours12 = h % 12 || 12;
    return `${hours12}:${minutes} ${ampm}`;
  };

  return (
    <section className="bg-white border-b-4 border-blue-500 rounded-2xl shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Business Logo */}
          <div className="flex-shrink-0">
            <Avatar className="w-24 h-24 sm:w-28 sm:h-28 ring-2 ring-blue-500 shadow-md">
              <AvatarImage
                src={data.ProfileImage as string}
                className="object-cover w-full h-full"
              />
              <AvatarFallback>Shop</AvatarFallback>
            </Avatar>
          </div>

          {/* Business Info */}
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 break-words">
              {data.shopName}
              <span className="ml-2 text-base font-medium text-gray-500">
                {data.shopType?.serviceName}
              </span>
            </h1>

            {/* Location, Rating, Status */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3 text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{`${data.city}, ${data.state}`}</span>
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span>4.8 (127 reviews)</span>
              </div>
              {/* <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                Open Now
              </div> */}
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  isTodayWorking(data?.workingDays)
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isTodayWorking(data?.workingDays)
                  ? "Open Today"
                  : "Closed Today"}
              </span>
            </div>

            {/* Email */}
            <div className="flex justify-center sm:justify-start items-center gap-2 text-gray-600 mb-2">
              <Mail className="w-4 h-4 text-gray-500" />
              <span className="text-sm sm:text-base">{data.email}</span>
            </div>

            {/* Timing */}
            <div className="flex justify-center sm:justify-start items-center gap-2 text-gray-600 mb-4">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm sm:text-base">
                {convertRailwayTime(data.openAt)}{" "}
                <span className="mx-1">•</span>{" "}
                {convertRailwayTime(data.closeAt)}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base">
                Add Review
              </button>
              <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition">
                <Heart size={22} className="text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ViewShopProfile;
