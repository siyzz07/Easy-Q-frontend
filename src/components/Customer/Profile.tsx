import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { getCustomerData } from "../../Services/ApiService/CustomerApiService";
import type { ICustomer } from "../../Shared/types/Types";
import { User, Mail, Phone, Pencil, Briefcase } from "lucide-react";

function Profile() {
  const [editPopup, setEditPopup] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<ICustomer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getData();
  }, [editPopup]);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getCustomerData();
      if (response?.data?.data) {
        setCustomerData(response.data.data);
      }
    } catch (error: unknown) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Edit Modal */}
      {editPopup && customerData && (
        <EditProfileModal
          name={customerData.name}
          email={customerData.email}
          phone={customerData.phone}
          onClose={() => setEditPopup(false)}
        />
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-8 pb-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                <Briefcase size={20} />
             </div>
             <h2 className="font-bold text-xl text-gray-900 tracking-tight">Personal Information</h2>
          </div>
          
          <button
            onClick={() => setEditPopup(true)}
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors py-2 px-4 rounded-xl hover:bg-blue-50"
          >
            <Pencil size={14} strokeWidth={2.5} />
            Quick Edit
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
             <div className="animate-pulse flex flex-col items-center gap-2">
                <div className="h-2 w-24 bg-gray-200 rounded-full" />
                <div className="h-2 w-32 bg-gray-100 rounded-full" />
             </div>
          </div>
        ) : (
          <div className="p-8 mt-4 grid gap-8 md:grid-cols-2">
            {/* Name Field */}
            <div className="space-y-3 group">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                  <User size={18} strokeWidth={2} />
                </div>
                <div className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 ring-offset-white transition-all">
                  {customerData?.name || "Not provided"}
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-3 group">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} strokeWidth={2} />
                </div>
                <div className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-500 italic ring-offset-white transition-all">
                  {customerData?.email || "Not provided"}
                </div>
              </div>
            </div>

            {/* Phone Field */}
            <div className="space-y-3 group">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Phone size={18} strokeWidth={2} />
                </div>
                <div className="w-full pl-11 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-2xl text-sm font-medium text-gray-700 ring-offset-white transition-all text-[15px]">
                  {customerData?.phone ? `+91 ${customerData.phone}` : "Not provided"}
                </div>
              </div>
            </div>

            {/* Stats or Info */}
            <div className="bg-blue-600/5 rounded-3xl p-6 border border-blue-600/10 flex flex-col justify-between">
                <div>
                   <h4 className="text-blue-900 font-bold text-sm">Account Status</h4>
                   <p className="text-blue-700/70 text-xs mt-1 font-medium leading-relaxed">
                     Your account is fully verified and active. You can book services and manage your favorites.
                   </p>
                </div>
                <div className="mt-4 flex items-center gap-2">
                   <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                   <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Fully Secured</span>
                </div>
            </div>
          </div>
        )}

        <div className="p-8 pt-0 mt-4 flex items-center justify-end gap-3 border-t border-gray-50 bg-gray-50/10 py-6">
          <p className="text-xs text-gray-400 font-medium mr-auto">
             Account creation date: <span className="text-gray-600">Jan 2024</span>
          </p>
          <button
            onClick={() => setEditPopup(true)}
            className="inline-flex items-center justify-center rounded-2xl px-8 py-3.5 text-[15px] font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 text-white transition-all active:scale-95"
          >
            Update Profile Settings
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
