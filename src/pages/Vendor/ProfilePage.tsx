import { useEffect, useState } from "react";
import ShopViews from "../../components/Shared/ShopViews";
import { getShopData } from "../../Services/ApiService/VendorApiServices";
import type {
  IImage,
  IVendroShopData,
  IvendroFullData,
} from "../../Shared/types/Types";
import { AxiosError } from "axios";
import EditProfileModal from "../../components/Vendor/EditProfileModal";
import ViewShopProfile from "../../components/Shared/ViewShopProfile";

// import { shopData, type IVendorState } from "../../Redux/VendorSlice";

const ProfilePage = () => {
  let [vendordata, setVendorData] = useState<IvendroFullData>();
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

  let onClose = () => setShopPopup(false);

  return (
    <>
      <div className=" ">
        {editShopPoppup && (
          <EditProfileModal onClose={onClose} vendorData={vendordata as unknown as IVendroShopData || {}} />
        )}
      </div>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-0  pb-10">
            {/* New Reusable Header */}
             {vendordata && (
                <ViewShopProfile 
                  data={vendordata} 
                  isOwner={true} 
                  onEdit={() => setShopPopup(true)} 
                />
             )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Services List / Shop Views */}
                <div className="w-full">
                <ShopViews
                    isVendor={true}
                    vendorImages={vendordata?.images as IImage[]|[]}
                    isUpdate={() => setUpdate(!update)}
                    vendorId={vendordata?._id}
                />
                </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
