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

      <div className="flex h-screen bg-gray-100">
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-4 md:mb-0">
              My Services
            </h1>
            <button
              onClick={() => setAddServicePopup(true)}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow transition-all"
            >
              <Plus size={18} />
              Add Service
            </button>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64 text-gray-500">
              Loading services...
            </div>
          )}

          {/* Empty State */}
          {!loading && services.length === 0 && (
            <div className="text-center text-gray-500 mt-20">
              <p className="text-lg">No services added yet</p>
              <p className="text-sm mt-2">
                Click <span className="font-semibold text-blue-600">“Add Service”</span> to get started.
              </p>
            </div>
          )}

          {/* Services Grid */}
          {!loading && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service:any) => (
                <div
                  key={service._id}
                  className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  {/* Edit Icon (top-right) */}
                  <button
                    onClick={()=>{
                      setSerivceEditData(service)
                      setEditServicePopup(true)
                    }}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white shadow-sm rounded-full p-1.5 transition-all cursor-pointer"
                    title="Edit Service"
                  >
                    <Edit size={16} className="text-blue-600" />
                  </button>

                  {/* Image */}
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.serviceName}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-200 text-gray-400">
                      <ImageOff size={40} />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800 truncate">
                          {service.serviceName}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            service.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {service.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      {/* Description — max 3 lines */}
                      <p
                        title={service.description}
                        className="text-gray-600 text-sm mb-4 line-clamp-3"
                      >
                        {service.description}
                      </p>

                      {/* Duration and Price */}
                      <div className="flex items-center gap-4 text-gray-600 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {service.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <IndianRupee size={14} /> {service.price}
                        </span>
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
