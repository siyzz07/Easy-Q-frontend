import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";

import { MapPin, Phone, Mail, Clock, Star, Pencil } from "lucide-react";

import ShopViews from "../../components/Shared/ShopViews";
import { getShopData } from "../../Services/VendorApiServices";
import type {
  IImage,
  IVendor,
  IVendroShopData,
} from "../../Shared/types/Types";
import { AxiosError } from "axios";
import EditProfileModal from "../../components/Vendor/EditProfileModal";
import ShopImageUpload from "../../components/Shared/ShopImageUpload&Preview";
// import { shopData, type IVendorState } from "../../Redux/VendorSlice";

const ProfilePage = () => {
  let [vendordata, setVendorData] = useState<IVendroShopData>();
  let [editShopPoppup, setShopPopup] = useState<boolean>(false);
  let [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    getShop();
  }, [editShopPoppup, update]);

  const getShop = async () => {
    try {
      let response = await getShopData();
      if (response?.data?.data) {
        setVendorData(response?.data?.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  function isTodayWorking(workingDaysStr?: string[]) {
    if (!workingDaysStr) return false;

    let workingDays = workingDaysStr;

    const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = daysShort[new Date().getDay()];

    return workingDays.includes(today);
  }

  function convertRailwayTime(time24?: string) {
    if (!time24) return "--";
    const [hours, minutes] = time24.split(":");
    const h = parseInt(hours, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const hours12 = h % 12 || 12;
    return `${hours12}:${minutes} ${ampm}`;
  }

  let onClose = () => setShopPopup(false);

  return (
    <>
      <div className="overflow-y-auto max-h-screen">
        {editShopPoppup && (
          <EditProfileModal onClose={onClose} vendorData={vendordata || {}} />
        )}
      </div>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 md:p-8 ">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
              <Card className="w-full rounded-2xl border bg-white p-5 md:p-8 shadow-sm hover:shadow-md transition">
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-0">
                  <div className="flex items-start md:items-center gap-4 w-full">
                    {/* Shop Image */}
                    <img
                      src={vendordata?.ProfileImage}
                      alt="Shop logo"
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full border object-cover shadow-sm"
                    />

                    {/* Shop Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between w-full">
                        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                          {vendordata?.shopName}
                        </h1>

                        {/* Edit button */}
                        <button
                          onClick={() => setShopPopup(true)}
                          aria-label="Edit profile"
                          className="p-2 rounded-full hover:bg-gray-100 transition"
                        >
                          <Pencil className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                {/* Divider */}
                <div className="border-t border-gray-200 my-4" />

                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 p-0">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{` ${vendordata?.city} ${vendordata?.state}`}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span>{vendordata?.phone}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span>{vendordata?.email}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>
                      {convertRailwayTime(vendordata?.openAt)}
                      <span className="mx-1">•</span>
                      {convertRailwayTime(vendordata?.closeAt)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 sm:col-span-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-gray-900 font-medium">
                      4.8{" "}
                      <span className="text-gray-500 font-normal">
                        (127 reviews)
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 sm:col-span-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        isTodayWorking(vendordata?.workingDays)
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isTodayWorking(vendordata?.workingDays)
                        ? "Open Today"
                        : "Closed Today"}
                    </span>
                  </div>
                </CardContent>

                {/* Divider */}
                <div className=" my-4" />
              </Card>
            </div>

            {/* Services List */}
            <div className="w-full md:grid-cols-2 gap-6">
              <ShopViews
                isVendor={true}
                vendorImages={vendordata?.images as IImage[]|[]}
                vendorId={vendordata?._id as string}
                isUpdate={() => setUpdate(!update)}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
