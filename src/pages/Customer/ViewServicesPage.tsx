import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEachShopData, getEachShopServices } from "../../Services/ApiService/CustomerApiService";
import ViewShopProfile from "../../components/Customer/ViewShopProfile";
import ServicesList from "../../components/Customer/ServicesList";
import type { IService, IServiceData, IServiceVendorTypes, IVendroShopData } from "../../Shared/types/Types";
import { AxiosError } from "axios";

export interface IvendroFullData{
  _id?:string
  shopName?: string;
  email?: string;
  isActive?:boolean
  phone?: string;
  password?: string;
  confirmPassword?: string;
  state?: string;
  city?: string;
  shopType?: IServiceVendorTypes;
  openAt?: any;
  closeAt?: any;
  proofImage?:any;
  ProfileImage?: any;
  workingDays?: any;
  coordinates?: any
  isVerified?:"pending" | "verified" | "rejected"; 
}


const ViewServicesPage: React.FC = () => {
  const [shopData, setShopData] = useState<IvendroFullData | null>(null);
  const [shopServiceData, setShopServiceData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchShopDetails();
  }, [id]);

  const fetchShopDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const [shopResponse, serviceResponse] = await Promise.all([
        getEachShopData(id as string),
        getEachShopServices(id as string),
      ]);

      if (shopResponse?.data?.data) setShopData(shopResponse.data.data);
      if (serviceResponse?.data?.data) setShopServiceData(serviceResponse.data.data);

      if(shopResponse?.data?.data){
        if(!shopResponse.data.data.isActive){
          navigate('/customer')
        }
      }
      
      
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        setError("Failed to fetch shop details. Please try again later.");
        console.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };


  

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#E7F0FF]">
        <p className="text-gray-700 text-base sm:text-lg font-medium animate-pulse">
          Loading shop details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#EAF2FF] px-4">
        <p className="text-red-500 text-center font-medium mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-5 sm:px-6 py-2 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm sm:text-base transition-all shadow-md hover:shadow-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e1ebfa] px-3 sm:px-6 md:px-10 lg:px-20 py-6">
      {/* Shop Profile Section */}
      <div className="w-full flex flex-col items-center">
        {shopData && (
          <div className="w-full max-w-5xl">
            <ViewShopProfile data={shopData}   />
          </div>
        )}
      </div>

      {/* Services List Section */}
      <div className="w-full flex flex-col items-center mt-6">
        {shopServiceData.length > 0 ? (
          <div className="w-full max-w-6xl">
            <ServicesList services={shopServiceData} shopId={id as string} shopData={shopData as IvendroFullData} />
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-base sm:text-lg font-medium">
              No services available yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewServicesPage;
