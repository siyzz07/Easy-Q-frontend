import { Plus, Edit, Clock, IndianRupee, ImageOff } from "lucide-react";
import { useEffect, useState } from "react";
import AddService from "../Vendor/AddService";
import { getServices } from "../../Services/ApiService/VendorApiServices";
import { AxiosError } from "axios";
import EditService from "./EditService";
import type { IService } from "../../Shared/types/Types";

interface ServiceData {
  _id: string;
  serviceName: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  isActive: boolean;
}

const Services = () => {
  const [addServicePopup, setAddServicePopup] = useState(false);
  const [editServicePopup,setEditServicePopup] = useState(false)
  const [services, setServices] = useState<ServiceData[]>([]);
  const [serviceEditData,setSerivceEditData] = useState<IService|null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServicesData();
  }, [addServicePopup,editServicePopup]);

  const getServicesData = async () => {
    try {
      setLoading(true);
      const response = await getServices();
      if (response.data?.data) {
        setServices(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Error fetching vendor services:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {addServicePopup && <AddService onClose={() => setAddServicePopup(false)} />}
      {editServicePopup && <EditService onClose={()=>setEditServicePopup(false) } data={serviceEditData as IService}/> }

      <div className="flex h-screen bg-gray-50">
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <div>
               <h1 className="text-2xl font-bold text-gray-900">My Services</h1>
               <p className="text-gray-500 mt-1">Manage the services you offer to your customers.</p>
            </div>
            
            <button
              onClick={() => setAddServicePopup(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-all"
            >
              <Plus size={18} />
              Add Service
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-4 animate-pulse h-80">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4 w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && services.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center p-8 bg-white rounded-2xl shadow-sm border border-dashed border-gray-300">
               <div className="bg-blue-50 p-4 rounded-full mb-4">
                  <Plus size={32} className="text-blue-500" />
               </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Services Added</h3>
              <p className="text-gray-500 max-w-sm mb-6">
                You haven't added any services yet. Create your first service to start accepting bookings.
              </p>
              <button
                onClick={() => setAddServicePopup(true)}
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Create new service
              </button>
            </div>
          )}

          {/* Services Grid */}
          {!loading && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service: any) => (
                <div
                  key={service._id}
                  className="group relative bg-white rounded-xl shadow-xs border border-gray-100 ring-1 ring-gray-900/5 hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Edit Button - Visible on hover */}
                  <button
                    onClick={() => {
                      setSerivceEditData(service);
                      setEditServicePopup(true);
                    }}
                    className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-blue-600 shadow-sm rounded-lg p-2 transition-all opacity-0 group-hover:opacity-100 translate-y-[-10px] group-hover:translate-y-0"
                    title="Edit Service"
                  >
                    <Edit size={16} />
                  </button>

                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                     {service.image ? (
                    <img
                      src={service.image}
                      alt={service.serviceName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <ImageOff size={40} />
                    </div>
                  )}
                    <div className="absolute top-3 left-3">
                         <span
                          className={`px-2.5 py-1 text-xs font-semibold tracking-wide uppercase rounded-md shadow-sm backdrop-blur-md ${
                            service.isActive
                              ? "bg-green-500/90 text-white"
                              : "bg-red-500/90 text-white"
                          }`}
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </span>
                    </div>
                  </div>

                 

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1 mb-1" title={service.serviceName}>
                        {service.serviceName}
                      </h3>
                       <p
                        title={service.description}
                        className="text-gray-500 text-sm line-clamp-2 min-h-[2.5em]"
                      >
                        {service.description || "No description available."}
                      </p>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-gray-600">
                         <div className="flex items-center gap-1.5 bg-blue-50 px-2.5 py-1 rounded-md text-blue-700 text-sm font-medium">
                          <Clock size={14} /> 
                          {service.duration} min
                        </div>
                        <div className="flex items-center gap-1 text-gray-900 font-bold text-lg">
                          <IndianRupee size={16} className="text-gray-400" />
                          {service.price}
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Services;
