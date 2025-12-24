import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../../components/ui/card";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Clock,
  PencilRuler,
} from "lucide-react";

import { vendorDashboard } from "../../Services/ApiService/VendorApiServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BlookBookisModal from "../../components/Vendor/BlookBookisModal";

const DashboardVendor = () => {
  const navigate = useNavigate();
  let hasShop = useSelector((state: any) => state.vendorSlice.hasShop);
  const [totalStaff, setTotalStaff] = useState<number>(0);
  const [availableStaff, setAvailableStaff] = useState<number>(0);
  const [UnavailableStaff, setToalUnavailableStaff] = useState<number>(0);

  const [totalServices, setTotalServices] = useState<number>(0);
  const [availabelServices, setTotalAvailabelServices] = useState<number>(0);
  const [unavailabelServices, setUnavailabelServices] = useState<number>(0);
  const [blokcBookinModal,setBlookBookingModal] = useState<boolean>(false)



  useEffect(() => {
    dashboardDocument();
    if (hasShop == false) {
      navigate("/vendor/shop-data");
    }
  }, []);

  const dashboardDocument = async () => {
    try {
      let response = await vendorDashboard();
      if (response?.data?.data) {
        setTotalStaff(response.data.data.totalStaff);
        setAvailableStaff(response.data.data.availableStaff);
        setToalUnavailableStaff(response.data.data.totalUnavailableStaff);
        setTotalServices(response.data.data.totalService);
        setTotalAvailabelServices(response.data.data.totalAvailableService);
        setUnavailabelServices(response.data.data.totalUnavailableService);
      }
    } catch (error: unknown) {
      console.log("error to fetch vendor dashbord data");
    }
  };

  const stats = [
    {
      title: "Total Staff",
      value: totalStaff,
      icon: <Users className="text-blue-600" size={18} />,
      description: "All registered users",
      iconBg: "bg-blue-100",
    },
    {
      title: "Available Staff",
      value: availableStaff,
      icon: <Users className="text-green-600" size={18} />,
      description: "All registered users",
      iconBg: "bg-green-100",
    },
    {
      title: "Unavailable Staff",
      value: UnavailableStaff,
      icon: <Users className="text-red-600" size={18} />,
      description: "All registered users",
      iconBg: "bg-red-100",
    },

    {
      title: "Total Services",
      value: totalServices,
      icon: <PencilRuler className="text-green-600" size={18} />,
      description: "All business vendors",
      iconBg: "bg-green-100",
    },

    {
      title: "Unavailable Services",
      value: unavailabelServices,
      icon: <PencilRuler className="text-red-600" size={18} />,
      description: "All business vendors",
      iconBg: "bg-red-100",
    },

    {
      title: "Available Services",
      value: availabelServices,
      icon: <PencilRuler className="text-green-600" size={18} />,
      description: "All business vendors",
      iconBg: "bg-green-100",
    },

    {
      title: "Total Customers",
      value: 0,
      icon: <ShoppingCart className="text-purple-600" size={18} />,
      description: "Active customer profiles",
      iconBg: "bg-purple-100",
    },

    {
      title: "Total Revenue",
      value: "0",
      icon: <DollarSign className="text-yellow-600" size={18} />,
      description: "Revenue this month",
      iconBg: "bg-yellow-100",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50">
      {blokcBookinModal && (
        <BlookBookisModal onClose={() => setBlookBookingModal(false)} />
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Overview of your business performance and staff.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/vendor/add-staff")} 
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <Users size={18} />
              <span>Manage Staff</span>
            </button>
            <button
               onClick={() => setBlookBookingModal(true)}
              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-medium px-4 py-2 rounded-lg shadow-sm transition-all flex items-center gap-2"
            >
              <Clock size={18} />
              <span>Block Time</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <Card
              key={index}
              className="border-none shadow-sm ring-1 ring-gray-900/5 bg-white hover:shadow-md transition-all duration-300 rounded-xl overflow-hidden group"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-5">
                <CardTitle className="text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                  {item.title}
                </CardTitle>
                <div
                  className={`${item.iconBg} p-2 rounded-lg transition-transform group-hover:scale-110 duration-300`}
                >
                  {item.icon}
                </div>
              </CardHeader>
              <CardContent className="p-5 pt-0">
                <div className="text-2xl font-bold text-gray-900">
                  {item.value}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions / Featured Section could go here if needed, for instance Recent Bookings or Top Staff */}
        
        {/* Buttons Section - Legacy support if preferred, but Header buttons are better */}
        {/* Quick Actions - Compact Style */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => navigate("/vendor/staffs")}
              className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-sm hover:shadow"
            >
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2.5 rounded-lg text-blue-600">
                  <Users size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Staff Management</h3>
                  <p className="text-sm text-gray-500">Manage staff and schedules</p>
                </div>
              </div>
              <div className="bg-gray-100 p-1.5 rounded-full text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>

            <div
              onClick={() => setBlookBookingModal(true)}
              className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center justify-between cursor-pointer transition-all shadow-sm hover:shadow"
            >
              <div className="flex items-center gap-4">
                <div className="bg-red-100 p-2.5 rounded-lg text-red-600">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Unavailable Time</h3>
                  <p className="text-sm text-gray-500">Block dates for maintenance</p>
                </div>
              </div>
              <div className="bg-gray-100 p-1.5 rounded-full text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default DashboardVendor;
