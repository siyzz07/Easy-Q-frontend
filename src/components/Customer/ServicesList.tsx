import React, { useState } from "react";
import type { IService } from "../../Shared/types/Types";
import type { FC } from "react";
import { Clock, DollarSign } from "lucide-react";
import BookNow from "./BookNow";
import type { data } from "react-router-dom";

interface InterfaceServicesList {

  services: IService[];
}

const ServicesList: FC<InterfaceServicesList> = ({ services }) => {

  
    const [bookService,setBookService] = useState<boolean>(false)
    const [serviceData,setServiceData] = useState<IService|null>(null)
    console.log(serviceData);
    
  return (

    <>
      {/* book now modal */}

    {bookService && <BookNow onClose={()=>setBookService(false)} data={serviceData as IService}/>}


    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Services</h2>
        <span className="text-gray-600 text-sm sm:text-base">
          {services.filter((s: IService) => s.isActive).length} services available
        </span>
      </div>

      {/* Service List */}
      <div className="space-y-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start border border-gray-200 shadow-sm hover:shadow-md transition"
          >
            {/* Service Image */}
            <div className="flex-shrink-0 w-full sm:w-auto">
              <img
                src={(service.image as string) || "/placeholder.svg"}
                alt={service.serviceName}
                className="w-full sm:w-24 h-40 sm:h-24 rounded-lg object-cover"
              />
            </div>

            {/* Service Details */}
            <div className="flex-1 w-full">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                {service.serviceName}
              </h3>

              <div className="flex flex-wrap items-center gap-3 mb-2 text-gray-600 text-xs sm:text-sm">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{service.duration} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign size={14} />
                  <span>${service.price}</span>
                </div>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    service.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {service.isActive ? "✓ Active" : "Inactive"}
                </span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-3 sm:line-clamp-none">
                {service.description}
              </p>
            </div>

            {/* Book Button */}
            <div className="w-full sm:w-auto">
              {service.isActive ? (
                <button
                  onClick={()=>{
                    setBookService(true)
                    setServiceData(service)}}
                className="w-full sm:w-auto px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition">
                  Book Now
                </button>
              ) : (
                <button className="w-full sm:w-auto px-5 py-2 bg-gray-300 text-gray-600 rounded-lg font-medium cursor-not-allowed">
                  Unavailable
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default ServicesList;
