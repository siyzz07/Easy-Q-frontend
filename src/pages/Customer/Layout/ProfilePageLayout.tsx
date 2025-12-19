import React from "react";
import Navbar from "../../../components/Shared/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "../../../components/Shared/Footer";
import LandingPageBody from "../../../components/Customer/LandingPageBody";
import ProfileTabs from "../../../components/Customer/ProfileTabs";
import { LogOut,User } from "lucide-react";
import { loginCustomer, logoutCustomer } from "../../../Services/ApiService/CustomerApiService";
import { useDispatch } from "react-redux";
import { customerLogOut } from "../../../Redux/CustomeSlice";
import { removeToken } from "../../../utils/tokenUtils";

const ProfilePageLayout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

 const submitLogout = async (e: React.FormEvent) => {
    try {
      const response = await logoutCustomer();

      if (response?.status === 200) {
        dispatch(customerLogOut());
         removeToken();
        
        navigate("/customer/login");
      } else {
        console.error("Logout failed:", response);
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <section className="w-full bg-[#d2e4f0] py-8">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">
            My Account
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Manage your profile, preferences, and settings
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
          {/* Card Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-lg">
                {/* F */}
                <User/>
              </div>
              <div>
                <p className="text-base md:text-lg font-semibold text-gray-800">
                  Welcome, 
                  {/* <span className="text-blue-600">ftisa4500</span> 👋 */}
                </p>
                <p className="text-sm text-gray-500">
                  Manage your account and preferences here
                </p>
              </div>
            </div>

            <button
              onClick={submitLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors">
              <LogOut size={16} />
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="p-6 border-b border-gray-300">
            <ProfileTabs />
          </div>

          {/* Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePageLayout;
