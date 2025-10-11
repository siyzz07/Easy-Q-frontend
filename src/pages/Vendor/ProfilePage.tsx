import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { CreditCard } from "lucide-react";
import { MapPin, Phone, Mail, Clock, Star, Circle, Pencil } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const ProfilePage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
            {/* <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus size={16} className="mr-2" />
              Add Service
            </button> */}

            <Card className="w-full rounded-2xl border bg-white p-5 md:p-8 shadow-sm hover:shadow-md transition">
              {/* ---------- HEADER ---------- */}
              <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-0">
                <div className="flex items-start md:items-center gap-4 w-full">
                  {/* Shop Image */}
                  <img
                    src="/barber-logo-round.jpg"
                    alt="Shop logo"
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full border object-cover shadow-sm"
                  />

                  {/* Shop Info */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between w-full">
                      <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                        Premium Cuts Barbershop
                      </h1>

                      {/* Edit button */}
                      <Link
                        to="#"
                        aria-label="Edit profile"
                        className="p-2 rounded-full hover:bg-gray-100 transition"
                      >
                        <Pencil className="w-5 h-5 text-gray-600 hover:text-blue-600" />
                      </Link>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      Your trusted neighborhood grooming experts ✂️
                    </p>
                  </div>
                </div>
              </CardHeader>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4" />

              {/* ---------- DETAILS ---------- */}
              <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 p-0">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>123 Main Street, Downtown City</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span>+264 476 4355</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <span>shop@gmail.com</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>
                    Open - 9:00 AM <span className="mx-1">•</span> Close - 8:00
                    PM
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
                  <span className="mx-2 inline-flex items-center gap-1 text-green-600 font-medium">
                    <Circle className="w-2 h-2 fill-green-600 text-green-600" />
                    Open Now
                  </span>
                </div>
              </CardContent>

              {/* Divider */}
              <div className="border-t border-gray-200 my-4" />

              {/* ---------- BODY SECTION ---------- */}
              <CardFooter className="flex flex-col items-start p-0">
                <h2 className="text-base font-semibold text-gray-800 mb-2">
                  About This Shop
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  At Premium Cuts Barbershop, we take pride in giving our
                  customers the perfect look they deserve. From classic trims to
                  modern fades, our skilled barbers bring experience and
                  precision to every cut. Visit us today to experience the art
                  of grooming done right.
                </p>
              </CardFooter>
            </Card>
          </div>

          {/* Services List */}
          <div className="w-full md:grid-cols-2 gap-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
