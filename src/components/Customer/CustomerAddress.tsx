import React, { useEffect, useState } from "react";
import { Plus, Map, MapPin, Globe, Home, Edit3, Trash2, Navigation } from "lucide-react";
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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
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
      <div className="bg-white p-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
          <div className="flex items-center gap-4 text-left">
             <div className="p-3 bg-blue-50 text-blue-600 rounded-[1.2rem]">
                <Map size={24} />
             </div>
             <div>
                <h2 className="font-black text-2xl text-slate-900 tracking-tight leading-none">Addresses</h2>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1.5">Manage your service locations</p>
             </div>
          </div>
          
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 rounded-[1.2rem] px-8 py-4 text-sm font-black bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-600/20 text-white transition-all active:scale-95 group shrink-0"
          >
            <Plus size={18} className=" transition-transform duration-300" />
            Add New Address
          </button>
        </div>

        {/* Address Grid */}
        <div>
          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-100">
               <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-slate-200 mb-6 shadow-sm">
                  <Navigation size={40} strokeWidth={1} />
               </div>
               <h3 className="text-xl font-black text-slate-900 tracking-tight">No saved locations</h3>
               <p className="text-sm text-slate-500 max-w-xs mt-3 font-medium leading-relaxed">Save your frequently used addresses to speed up your booking experience.</p>
            </div>
          ) : (
            <div className="grid gap-8  md:grid-cols-2">
              {addresses.map((data, index) => (
                <div
                  key={data._id || index}
                  className="group relative bg-gray-100 border border-slate-100 rounded-[2.5rem] p-8 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-600/5 transition-all duration-500 text-left overflow-hidden"
                >
                  {/* Decorative Background Icon */}
                  <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 rotate-12">
                     <MapPin size={180} />
                  </div>

                  <div className="flex items-start justify-between relative z-10 mb-6">
                    <div className="h-14 w-14 bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 rounded-2xl flex items-center justify-center text-slate-400">
                      <Home size={24} />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEachAddress(data);
                          setEditAddress(true);
                        }}
                        className="p-3 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white hover:shadow-lg transition-all rounded-xl"
                        title="Edit Address"
                      >
                        <Edit3 size={18} strokeWidth={2.5} />
                      </button>
                      {/* <button
                        onClick={() => {
                          setAddresId(data._id || null);
                          setDeletePopup(true);
                        }}
                        className="p-3 bg-slate-50 text-slate-400 hover:text-rose-600 hover:bg-white hover:shadow-lg transition-all rounded-xl"
                        title="Delete Address"
                      >
                        <Trash2 size={18} strokeWidth={2.5} />
                      </button> */}
                    </div>
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div>
                      <h4 className="font-black text-lg text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {data.address}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-2 text-slate-400">
                        <Globe size={14} className="shrink-0" />
                        <span className="text-xs font-bold uppercase tracking-widest">{data.city}, {data.state}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                       <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Country</span>
                          <span className="text-[13px] font-bold text-slate-600">{data.country}</span>
                       </div>
                       <div className="flex flex-col gap-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Contact</span>
                          <span className="text-[13px] font-black text-slate-900 tracking-wide">
                            {data.phone ? `+91 ${data.phone}` : "---"}
                          </span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 pt-10 border-t border-slate-50 flex items-center justify-between">
           {/* <div className="flex items-center gap-3">
              <div className="h-2 w-32 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${Math.min(100, (addresses.length / 5) * 100)}%` }} />
              </div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none">
                 {addresses.length} / 5 Slots Used
              </span>
           </div> */}
           
        
        </div>
      </div>
    </div>
  );
};

export default CustomerAddress;
