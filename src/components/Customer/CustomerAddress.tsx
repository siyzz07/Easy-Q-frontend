import React, { useEffect, useState } from "react";
import { Edit, Plus, MapPin, Phone, Trash2, Globe, ShieldCheck, Navigation } from "lucide-react";
import AddAddressModal from "./AddAddressModal";
import {
  deleteCustomerAddress,
  getAddress,
} from "../../Services/ApiService/CustomerApiService";
import ConfirmationModal from "../Shared/ConfirmationModal";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import EditAddressModal from "./EditAddressModal";
import { motion, AnimatePresence } from "framer-motion";

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
  const [addressId, setAddresId] = useState<any | null>(null);
  const [deletePopup, setDeletePopup] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<boolean>(false);
  const [eachAddres, setEachAddress] = useState<any | null>(null);

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
      console.log(error);
    }
  };

  const deleteAddress = async (id?: string) => {
    try {
      if (id) {
        let response = await deleteCustomerAddress(id);
        if (response?.data?.message) {
          toast.success(response.data.message);
        }
        setAddresId(null);
        setDeletePopup(false);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to delete address");
      }
    }
  };

  return (
    <div className="space-y-0 divide-y divide-border transition-all">
      {/* Modals */}
      {showModal && <AddAddressModal onClose={() => setShowModal(false)} />}
      
      {deletePopup && (
        <ConfirmationModal
          payload={addressId}
          submit={deleteAddress}
          description="This action will permanently remove this address from your saved list. You won’t be able to recover it."
          text="Delete Address?"
          close={() => setDeletePopup(false)}
        />
      )}

      {editAddress && (
        <EditAddressModal 
          onClose={() => setEditAddress(false)} 
          data={eachAddres} 
        />
      )}

      {/* Header Section */}
      <div className="p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-card shrink-0">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-foreground tracking-tight">Shipping Destinations</h2>
          <p className="text-muted-foreground text-sm font-medium">Manage your delivery and service locations across the globe.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/10 transition-all duration-300 active:scale-95 shrink-0"
        >
          <Plus size={16} />
          New Location
        </button>
      </div>

      {/* Address Content */}
      <div className="p-8 sm:p-10 bg-muted/20 min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {addresses.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="h-16 w-16 bg-card rounded-2xl flex items-center justify-center text-muted-foreground shadow-sm border border-border mb-4">
                <MapPin size={32} />
              </div>
              <p className="text-muted-foreground font-black uppercase tracking-widest text-[10px]">Registry Empty</p>
              <p className="text-muted-foreground/60 text-sm mt-1">No addresses have been saved to your account yet.</p>
            </motion.div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {addresses.map((data) => (
                <motion.div
                  key={data._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group relative bg-card p-6 rounded-2xl border border-border shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all">
                      <Navigation size={18} />
                    </div>
                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all">
                      <button
                        onClick={() => {
                          setEditAddress(true);
                          setEachAddress(data);
                        }}
                        className="p-2 rounded-lg text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setAddresId(data._id);
                          setDeletePopup(true);
                        }}
                        className="p-2 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-foreground font-bold leading-tight line-clamp-1">{data.address}</h3>
                        <ShieldCheck size={14} className="text-primary/60 shrink-0" />
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground font-bold text-[10px] uppercase tracking-wider">
                        <Globe size={12} />
                        <span>{data.city}, {data.state}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border flex items-center justify-between">
                      <div className="flex items-center gap-2 text-foreground font-bold text-xs">
                        <Phone size={14} className="text-primary" />
                        {data.phone}
                      </div>
                      <div className="px-2 py-0.5 bg-muted rounded text-[9px] font-black text-muted-foreground uppercase tracking-widest">
                        Verified
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="p-8 sm:p-10 bg-card flex items-center gap-4">
        <div className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <ShieldCheck size={16} />
        </div>
        <p className="text-xs font-bold text-muted-foreground">Your address data is encrypted and securely stored following industry standards.</p>
      </div>
    </div>
  );
};

export default CustomerAddress;
