import { Outlet, useNavigate } from "react-router-dom";
import ProfileTabs from "../../../components/Customer/ProfileTabs";
import { LogOut, User, Shield, ChevronRight } from "lucide-react";
import { logoutCustomer } from "../../../Services/ApiService/CustomerApiService";
import { useDispatch } from "react-redux";
import { customerLogOut } from "../../../Redux/CustomeSlice";
import { removeToken } from "../../../utils/tokenUtils";
import { disconnectSocketAction } from "../../../Redux/SocketSlice";
import { motion } from "framer-motion";

const ProfilePageLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitLogout = async () => {
    try {
      const response = await logoutCustomer();

      if (response?.status === 200) {
        dispatch(customerLogOut());
        removeToken();
        dispatch(disconnectSocketAction());
        navigate("/customer/login");
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <section className="min-h-screen w-full bg-[#f8fafc] py-12 font-sans relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50 to-transparent -z-10" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -z-10 animate-pulse" />
      <div className="absolute top-1/2 -left-24 w-72 h-72 bg-indigo-100/30 rounded-full blur-3xl -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative">
        {/* Breadcrumbs/Mini Nav */}
        <div className="mb-8 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
           <span>Account</span>
           <ChevronRight size={12} />
           <span className="text-blue-600">Settings</span>
        </div>
        
        {/* Page Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-[900] text-slate-900 tracking-tight leading-none">
              Account <span className="text-blue-600">Settings</span>
            </h1>
            <p className="text-slate-500 text-base font-medium max-w-md">
              Customize your experience, manage security, and stay updated with your activity.
            </p>
          </div>
          
          <button
            onClick={submitLogout}
            className="group flex items-center gap-3 px-6 py-3.5 text-sm font-black rounded-2xl bg-white text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-300 border border-slate-200 hover:border-red-100 shadow-sm hover:shadow-xl hover:shadow-red-500/10 active:scale-95"
          >
            <div className="p-1.5 bg-slate-100 group-hover:bg-red-100/50 rounded-lg transition-colors">
              <LogOut size={16} className="group-hover:rotate-12 transition-transform" />
            </div>
            Sign Out
          </button>
        </div>

        {/* Main Content Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Sidebar / Navigation Card */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
             <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/30 overflow-hidden p-8">
                <div className="flex flex-col items-center text-center space-y-4 mb-8">
                   <div className="relative group">
                      <div className="h-24 w-24 rounded-3xl bg-gradient-to-tr from-blue-600 via-blue-500 to-indigo-600 p-1 shadow-2xl shadow-blue-500/40 transform group-hover:rotate-6 transition-transform duration-500">
                         <div className="h-full w-full bg-white rounded-[1.3rem] flex items-center justify-center text-blue-600">
                            <User size={40} strokeWidth={1.5} />
                         </div>
                      </div>
                      <div className="absolute -bottom-1 -right-1 h-8 w-8 bg-emerald-500 border-4 border-white rounded-full flex items-center justify-center text-white shadow-lg">
                         <Shield size={14} />
                      </div>
                   </div>
                   <div>
                      <h3 className="text-lg font-black text-slate-900 line-clamp-1">Account Member</h3>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Verified Identity</p>
                   </div>
                </div>

                <div className="space-y-1">
                   <ProfileTabs />
                </div>
             </div>

            
          </div>

          {/* Content Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 xl:col-span-9"
          >
             <div className="bg-white rounded-[3rem] border border-slate-200/60 shadow-2xl shadow-slate-200/40 overflow-hidden min-h-[600px]">
                <Outlet />
             </div>
          </motion.div>
        </div>
        
        <div className="mt-12 text-center text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-none">
          &copy; {new Date().getFullYear()} Easy Q &bull; Made with passion for convenience
        </div>
      </div>
    </section>
  );
};

export default ProfilePageLayout;
