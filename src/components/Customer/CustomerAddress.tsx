import React, { useEffect, useState } from "react";
import { Plus, Map, MapPin, Globe, Home, Edit3, Trash2, Phone as PhoneIcon } from "lucide-react";
import AddAddressModal from "./AddAddressModal";
import {
  deleteCustomerAddress,
  getAddress,
} from "../../Services/ApiService/CustomerApiService";
import ConfirmationModal from "../Shared/ConfirmationModal";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import EditAddressModal from "./EditAddressModal";

interface AddressData {
  _id?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const CustomerAddress: React.FC = () => {
  const [addresses, setAddresses] = useState<AddressData[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [addressId, setAddresId] = useState<string | null>(null);
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<boolean>(false);
  const [eachAddres, setEachAddress] = useState<AddressData | null>(null);

  useEffect(() => {
    getAllAddress();
  }, [showModal, addressId, editAddress]);

  const getAllAddress = async () => {
    try {
      let response = await getAddress();
      if (response?.data?.data) {
        setAddresses(response.data.data);
      }
    } catch (error: unknown) {
      console.error("Error fetching addresses:", error);
    }
  };

  const deleteAddressAction = async (id?: string) => {
    try {
      if (id) {
        let response = await deleteCustomerAddress(id);
        if (response?.data?.message) {
          toast.success(response.data.message);
        }
        await getAllAddress();
        setAddresId(null);
        setDeletePopup(false);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Delete address error", error);
        toast.error(error.response?.data?.message || "Failed to delete address");
      }
    }
  };

  const deleteAddressDescription = "This action will permanently remove this address from your saved list. You won’t be able to recover it.";

  return (
    <>
      {/* Modals */}
      {showModal && <AddAddressModal onClose={() => setShowModal(false)} />}
      
      {deletePopup && (
        <ConfirmationModal
          payload={addressId || undefined}
          submit={deleteAddressAction}
          description={deleteAddressDescription}
          text="Delete Address?"
          close={() => setDeletePopup(false)}
        />
      )}
      
      {editAddress && eachAddres && (
        <EditAddressModal 
          onClose={() => setEditAddress(false)} 
          data={eachAddres} 
        />
      )}

      {/* Main Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-8 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Map size={20} />
             </div>
             <div>
                <h2 className="font-bold text-xl text-gray-900 tracking-tight">Saved Addresses</h2>
                <p className="text-xs text-gray-400 font-medium mt-0.5">Manage your shipping and service locations.</p>
             </div>
          </div>
          
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 text-white transition-all active:scale-95 group shrink-0"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            Add New Address
          </button>
        </div>

        {/* Address Grid */}
        <div className="p-8 pt-6">
          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
               <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
                  <MapPin size={40} strokeWidth={1.5} />
               </div>
               <h3 className="text-lg font-bold text-gray-900">No addresses yet</h3>
               <p className="text-sm text-gray-500 max-w-xs mt-2 font-medium">Add an address to speed up your booking process and manage locations easily.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {addresses.map((data, index) => (
                <div
                  key={data._id || index}
                  className="group relative bg-white border border-gray-100 rounded-[2rem] p-6 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-600/5 transition-all duration-300 text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-2.5 bg-gray-50 group-hover:bg-blue-50 text-gray-400 group-hover:text-blue-500 rounded-2xl transition-colors">
                      <Home size={20} />
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          setEachAddress(data);
                          setEditAddress(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Edit Address"
                      >
                        <Edit3 size={16} strokeWidth={2.5} />
                      </button>
                      <button
                        onClick={() => {
                          setAddresId(data._id || null);
                          setDeletePopup(true);
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Delete Address"
                      >
                        <Trash2 size={16} strokeWidth={2.5} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-bold text-gray-900 line-clamp-1 group-hover:text-blue-700 transition-colors">
                        {data.address}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                        <Globe size={12} className="shrink-0" />
                        <span className="text-xs font-medium">{data.city}, {data.state}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-50 space-y-2">
                       <div className="flex items-center gap-2 text-gray-600">
                          <MapPin size={14} className="text-gray-400" />
                          <span className="text-[13px] font-medium">{data.country}</span>
                       </div>
                       <div className="flex items-center gap-2 text-gray-600">
                          <PhoneIcon size={14} className="text-gray-400" />
                          <span className="text-[13px] font-semibold tracking-wide">
                            {data.phone ? `+91 ${data.phone}` : "No phone provided"}
                          </span>
                       </div>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500 scale-0 group-hover:scale-100 transition-transform duration-500" />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 pt-0 flex items-center justify-between mt-4">
           <div className="h-1 flex-1 bg-gray-50 rounded-full overflow-hidden">
              <div className="h-full bg-blue-100/50 w-full" style={{ width: `${Math.min(100, (addresses.length / 5) * 100)}%` }} />
           </div>
           <span className="ml-4 text-[11px] font-bold text-gray-300 uppercase tracking-widest leading-none">
              {addresses.length} {addresses.length === 1 ? 'Location' : 'Locations'} saved
           </span>
        </div>
      </div>
    </>
  );
};

export default CustomerAddress;
