import { useEffect, useState } from "react";
import ShopViews from "../../components/Shared/ShopViews";
import type { IImage, IvendroFullData } from "../../Shared/types/Types";
import { AxiosError } from "axios";
import EditProfileModal from "../../components/Vendor/EditProfileModal";
import { useParams, useNavigate } from "react-router-dom";
import { getEachShopData } from "../../Services/ApiService/CustomerApiService";
import ViewShopProfile from "../../components/Shared/ViewShopProfile";

const VendorProfileView = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  let [vendordata, setVendorData] = useState<IvendroFullData | null>(null);
  let [editShopPoppup, setShopPopup] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) getShop();
  }, [id]);

  const getShop = async () => {
    try {
      setLoading(true);
      setError(null);
      let response = await getEachShopData(id as string);
      console.log("response :>> ", response);
      if (response?.data?.data) {
        setVendorData(response?.data?.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
        setError("Failed to load shop profile.");
      }
    } finally {
        setLoading(false);
    }
  };


  let onClose = () => setShopPopup(false);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-background">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground text-lg font-medium animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background px-4">
        <div className="p-8 glass-card rounded-2xl text-center max-w-md w-full">
            <h2 className="text-2xl font-bold text-destructive mb-2">Error</h2>
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
    <>
      <div className="overflow-y-auto max-h-screen">
        {editShopPoppup && (
          <EditProfileModal onClose={onClose} vendorData={vendordata || {}} />
        )}
      </div>
      <div className="min-h-screen bg-background/50 pb-12">
        

        {vendordata && (
            <div className="w-full">
                <ViewShopProfile data={vendordata} />
            </div>
        )}

        <main className="max-w-7xl mx-auto px-4 md:px-6 mt-8">
    
            <div className="w-full">
              <ShopViews
                isVendor={false}
                vendorImages={vendordata?.images as IImage[]|[]}
                vendorId={vendordata?._id}
              />
            </div>
        </main>
      </div>
    </>
  );
};

export default VendorProfileView;
