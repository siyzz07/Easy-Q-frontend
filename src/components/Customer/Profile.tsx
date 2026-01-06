import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { getCustomerData } from "../../Services/ApiService/CustomerApiService";
import type { ICustomer } from "../../Shared/types/Types";
import { User, Mail, Phone, Pencil, Briefcase, Calendar, ShieldCheck } from "lucide-react";

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Edit Modal */}
      {editPopup && customerData && (
        <EditProfileModal
          name={customerData.name}
          email={customerData.email}
          phone={customerData.phone}
          onClose={() => setEditPopup(false)}
        />
      )}

      {/* Header Section with Glassmorphism */}
      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-[3rem] overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
         </div>
         <div className="absolute bottom-6 left-10 flex items-center gap-6">
            <div className="h-24 w-24 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 p-1.5 shadow-2xl">
               <div className="h-full w-full bg-white rounded-[1.2rem] flex items-center justify-center text-blue-600 shadow-inner">
                  <User size={48} strokeWidth={1} />
               </div>
            </div>
            <div className="pb-2">
               <h2 className="text-2xl font-black text-white tracking-tight leading-none">
                  {customerData?.name || "Member Name"}
               </h2>
               <p className="text-blue-100 text-sm font-bold mt-1 uppercase tracking-widest opacity-80">
                  Customer Account
               </p>
            </div>
         </div>
         
         <button
            onClick={() => setEditPopup(true)}
            className="absolute bottom-8 right-10 flex items-center gap-2 text-xs font-black text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all py-2.5 px-5 rounded-2xl active:scale-95"
          >
            <Pencil size={14} strokeWidth={2.5} />
            Edit Profile
          </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96 bg-white rounded-b-[3rem]">
           <div className="space-y-4 text-center">
              <div className="h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Loading Preferences...</p>
           </div>
        </div>
      ) : (
        <div className="bg-white rounded-b-[3rem] p-10">
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
                   <Briefcase size={20} />
                </div>
                <div>
                   <h3 className="font-black text-xl text-slate-900 tracking-tight">Personal Information</h3>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Contact & Social details</p>
                </div>
             </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {/* Info Cards */}
            <div className="space-y-8">
               <div className="group space-y-3">
                  <div className="flex items-center gap-2 ml-1">
                     <User size={14} className="text-blue-600" />
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Display Name
                     </label>
                  </div>
                  <div className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-[15px] font-bold text-slate-700 group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-all leading-none">
                     {customerData?.name || "Not provided"}
                  </div>
               </div>

               <div className="group space-y-3">
                  <div className="flex items-center gap-2 ml-1">
                     <Mail size={14} className="text-blue-600" />
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Email Address
                     </label>
                  </div>
                  <div className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-[15px] font-bold text-slate-400 italic group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-all leading-none">
                     {customerData?.email || "Not provided"}
                  </div>
               </div>

               <div className="group space-y-3">
                  <div className="flex items-center gap-2 ml-1">
                     <Phone size={14} className="text-blue-600" />
                     <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                        Phone Number
                     </label>
                  </div>
                  <div className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-[1.5rem] text-[15px] font-bold text-slate-700 group-hover:border-blue-200 group-hover:bg-blue-50/30 transition-all leading-none">
                     {customerData?.phone ? `+91 ${customerData.phone}` : "Not provided"}
                  </div>
               </div>
            </div>

            {/* Status Section */}
            <div className="space-y-6">
               <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-6 opacity-20">
                     <ShieldCheck size={80} strokeWidth={1} />
                  </div>
                  <div className="relative z-10">
                     <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] w-fit border border-white/20">
                        System Status
                     </div>
                     <h4 className="text-xl font-black mt-4">Account Verified</h4>
                     <p className="text-blue-100/80 text-sm mt-2 font-medium leading-relaxed">
                        Your account is currently active and secured with 256-bit encryption. All your bookings are synced.
                     </p>
                     <div className="flex items-center gap-4 mt-8">
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Security</span>
                           <span className="text-sm font-bold">Optimal</span>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10" />
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black uppercase tracking-widest text-blue-200">Tier</span>
                           <span className="text-sm font-bold">Premium</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center text-slate-400">
                        <Calendar size={20} />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Member Since</p>
                        <p className="text-base font-black text-slate-700">January 2024</p>
                     </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300" />
               </div>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-6">
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
               Latest Update: <span className="text-slate-600">Today, 10:03 AM</span>
            </p>
            <button
               onClick={() => setEditPopup(true)}
               className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-[1.5rem] text-sm font-black hover:bg-blue-600 hover:shadow-2xl hover:shadow-blue-600/30 transition-all active:scale-95"
            >
               Update Profile Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const ChevronRight = ({ size, className }: { size: number, className: string }) => (
   <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
   >
      <path d="m9 18 6-6-6-6"/>
   </svg>
);

export default Profile;
