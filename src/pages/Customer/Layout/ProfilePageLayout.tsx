import { Outlet, useNavigate } from "react-router-dom";
import ProfileTabs from "../../../components/Customer/ProfileTabs";
import { LogOut, User, Settings, ExternalLink } from "lucide-react";
import { logoutCustomer } from "../../../Services/ApiService/CustomerApiService";
import { useDispatch, useSelector } from "react-redux";
import { customerLogOut } from "../../../Redux/CustomeSlice";
import { removeToken } from "../../../utils/tokenUtils";
import { disconnectSocketAction } from "../../../Redux/SocketSlice";
import { motion } from "framer-motion";
import type { RootState } from "../../../Redux/Store";

const ProfilePageLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customer = useSelector((state: RootState) => state.customerSlice.customerData);

  const submitLogout = async () => {
    try {
      const response = await logoutCustomer();
      if (response?.status === 200) {
        dispatch(customerLogOut());
        removeToken();
        dispatch(disconnectSocketAction());
        navigate("/customer/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Refined Header Section */}
      <div className="relative h-64 w-full bg-slate-950 overflow-hidden">
        {/* Subtle Mesh/Grid Effect */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(var(--primary)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div className="flex items-center gap-6">
            <div className="h-24 w-24 rounded-2xl bg-card p-1 shadow-2xl">
              <div className="h-full w-full rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
                <User size={40} strokeWidth={1.5} />
              </div>
            </div>
            <div className="pb-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">{customer?.name || "Member Profile"}</h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-primary-foreground/80 font-medium">
                  {customer?.email || "Account Management"}
                </p>
                <span className="h-1 w-1 rounded-full bg-primary/40" />
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-foreground/60">Premium Member</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Navigation */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden sticky top-8">
              <div className="p-4 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-black uppercase tracking-[0.2em] px-2">
                  <Settings size={12} />
                  Settings Menu
                </div>
              </div>
              
              <div className="p-2">
                <ProfileTabs />
              </div>

              <div className="p-4 bg-muted/30 border-t border-border flex flex-col gap-2">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-background border border-border">
                  <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-black text-muted-foreground uppercase tracking-wider">System Online</span>
                </div>
                
                <button
                  onClick={submitLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-muted-foreground hover:text-destructive transition-colors rounded-xl group"
                >
                  <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                  Sign Out
                </button>
              </div>
            </div>

            {/* Support Card */}
            <div className="mt-4 p-5 rounded-2xl bg-primary shadow-lg shadow-primary/10 text-primary-foreground relative overflow-hidden group">
              <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
              <h4 className="font-bold mb-1 relative z-10 text-sm">Need help?</h4>
              <p className="text-[11px] text-primary-foreground/80 mb-4 font-medium leading-relaxed">Our support team is available 24/7 for your assistance.</p>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-white text-primary px-4 py-2 rounded-lg hover:bg-white/90 transition-colors">
                Contact Support <ExternalLink size={12} />
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden"
            >
              <div className="p-0">
                <Outlet />
              </div>
            </motion.div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default ProfilePageLayout;
