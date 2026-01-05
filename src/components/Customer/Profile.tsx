import { useEffect, useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { getCustomerData } from "../../Services/ApiService/CustomerApiService";
import type { ICustomer } from "../../Shared/types/Types";
import { User, Mail, Phone, Shield, CreditCard, MapPin, BadgeCheck, Clock, ArrowUpRight } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCustomerData as setReduxCustomerData } from "../../Redux/CustomeSlice";

function Profile() {
  const [editPopup, setEditPopup] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<ICustomer | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [editPopup]);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await getCustomerData();
      if (response?.data?.data) {
        setCustomerData(response.data.data);
        dispatch(setReduxCustomerData(response.data.data));
      }
    } catch (error: unknown) {
      console.error("Error fetching customer data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-0 divide-y divide-border">
      {/* Edit Modal */}
      {editPopup && customerData && (
        <EditProfileModal
          name={customerData.name}
          email={customerData.email}
          phone={customerData.phone}
          onClose={() => setEditPopup(false)}
        />
      )}

      {/* Header Section */}
      <div className="p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-card transition-all">
        <div className="space-y-1">
          <h2 className="text-2xl font-black text-foreground tracking-tight">Personal Details</h2>
          <p className="text-muted-foreground text-sm font-medium">Manage your personal information and account identity.</p>
        </div>
        <button
          onClick={() => setEditPopup(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-xl shadow-primary/10 transition-all duration-300 active:scale-95 shrink-0"
        >
          <User size={16} />
          Modify Profile
        </button>
      </div>

      {/* Profile Info Grid */}
      <div className="p-8 sm:p-10 bg-muted/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Standard Detail Rows */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              {[
                { icon: User, label: "Official Name", value: customerData?.name, color: "text-primary" },
                { icon: Mail, label: "Primary Email", value: customerData?.email, color: "text-primary" },
                { icon: Phone, label: "Contact Number", value: customerData?.phone, color: "text-primary" },
              ].map((item, idx, arr) => (
                <div 
                  key={idx} 
                  className={`flex items-center justify-between p-5 ${idx !== arr.length - 1 ? 'border-b border-border' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg bg-muted ${item.color}`}>
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.label}</p>
                      <p className="text-sm font-bold text-foreground mt-0.5">{loading ? "..." : (item.value || "Not specified")}</p>
                    </div>
                  </div>
                  <BadgeCheck size={16} className="text-muted/50" />
                </div>
              ))}
            </div>

            {/* Account Status Card */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between h-32">
                <div className="flex items-center justify-between">
                  <Clock size={18} className="text-amber-500" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Active Status</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground">Member Since</p>
                  <p className="text-base font-black text-foreground">Jan 2024</p>
                </div>
              </div>
              <div className="p-5 rounded-2xl border border-border bg-card shadow-sm flex flex-col justify-between h-32">
                <div className="flex items-center justify-between">
                  <Shield size={18} className="text-emerald-500" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Trust Score</span>
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground">Verification</p>
                  <p className="text-base font-black text-foreground">Verified</p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Support Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-slate-950 text-white shadow-xl shadow-slate-200/10 relative overflow-hidden group h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/30 transition-all" />
              
              <div>
                <BadgeCheck className="text-primary mb-4" size={32} />
                <h3 className="text-xl font-bold leading-tight">Elite Member Benefits</h3>
                <p className="text-muted-foreground text-xs mt-3 font-medium leading-relaxed">You have early access to new service lists and exclusive platform discounts.</p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Next Tier</p>
                  <p className="text-sm font-bold">Gold Member</p>
                </div>
                <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="p-8 sm:p-10 bg-card flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center">
                <User size={12} className="text-muted-foreground" />
              </div>
            ))}
          </div>
          <p className="text-xs font-bold text-muted-foreground">Joined by 2k+ standard members today</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted rounded-lg transition-colors border border-border">
            <CreditCard size={14} /> View Bookings
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-muted-foreground hover:bg-muted rounded-lg transition-colors border border-border">
            <MapPin size={14} /> My Addresses
          </button>
        </div>
      </div>
    </div>
  );
}
export default Profile;
