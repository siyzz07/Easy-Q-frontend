import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEachShopData, getEachShopServices } from "../../Services/ApiService/CustomerApiService";
import ViewShopProfile from "../../components/Shared/ViewShopProfile";
import ServicesList from "../../components/Customer/ServicesList";
import type { IService, IServiceData, IVendroShopData, IvendroFullData } from "../../Shared/types/Types";
import { AxiosError } from "axios";


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
      <div className="flex flex-col justify-center items-center min-h-screen bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground text-lg font-medium animate-pulse">
          Loading shop details...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
        <div className="p-8 glass-card rounded-2xl text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-destructive mb-2">Oops!</h2>
            <p className="text-muted-foreground font-medium mb-6">{error}</p>
            <button
            onClick={() => navigate(-1)}
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-medium transition-all shadow-lg shadow-primary/20"
            >
            Go Back
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background/50 pb-12">
      {/* Shop Profile Section */}
      <div className="w-full">
        {shopData && (
          <div className="w-full">
            <ViewShopProfile data={shopData} />
          </div>
        )}
      </div>

      {/* Services List Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {shopServiceData.length > 0 ? (
          <ServicesList services={shopServiceData} shopId={id as string} shopData={shopData as IvendroFullData} />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground bg-white/50 dark:bg-black/20 rounded-3xl border border-dashed border-border mx-auto max-w-4xl">
             <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mb-4">
                 <span className="text-4xl">🏷️</span>
             </div>
            <p className="text-lg font-medium">
              No services available yet
            </p>
            <p className="text-sm opacity-70">Check back later for updates</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ViewServicesPage;
