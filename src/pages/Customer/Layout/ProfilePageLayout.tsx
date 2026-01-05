import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileTabs from "../../../components/Customer/ProfileTabs";
import { LogOut,User } from "lucide-react";
import { logoutCustomer } from "../../../Services/ApiService/CustomerApiService";
import { useDispatch } from "react-redux";
import { customerLogOut } from "../../../Redux/CustomeSlice";
import { removeToken } from "../../../utils/tokenUtils";
import { disconnectSocketAction } from "../../../Redux/SocketSlice";

const ProfilePageLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

 const submitLogout = async (e: React.FormEvent) => {
    try {
      const response = await logoutCustomer();

      if (response?.status === 200) {
        dispatch(customerLogOut());
         removeToken();
         dispatch(disconnectSocketAction())
        
        navigate("/customer/login");
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <section className="min-h-screen w-full bg-gray-50/50 py-12 font-sans">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Account Settings
            </h1>
            <p className="text-gray-500 mt-2 text-sm font-medium">
              Manage your personal information and security preferences.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50 overflow-hidden">
          {/* User Welcome Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <User size={32} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-gray-900">
                  Welcome back
                </h2>
                <p className="text-sm text-gray-500 font-medium">
                  Access and manage your account details below.
                </p>
              </div>
            </div>

            <button
              onClick={submitLogout}
              className="group flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 border border-red-100"
            >
              <LogOut size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              Sign Out
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-8 pt-2 border-b border-gray-100 bg-white sticky top-0 z-10">
            <ProfileTabs />
          </div>

          {/* Content Area */}
          <div className="p-8 bg-gray-50/30 min-h-[400px]">
             <Outlet />
          </div>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-400 font-medium">
          &copy; {new Date().getFullYear()} Easy Q. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default ProfilePageLayout;
