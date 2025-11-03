import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/ui/card";
import {
  Users,
  Store,
  ShoppingCart,
  DollarSign,
  Clock,
  PencilRuler,
} from "lucide-react";
import { adminDashbordData } from "../../Services/AdminApiService";
import { vendorDashboard } from "../../Services/VendorApiServices";
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
    <div className="min-h-screen bg-gray-100">


      {blokcBookinModal && <BlookBookisModal onClose={()=>setBlookBookingModal(false)}/>}



      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => (
            <Card
              key={index}
              className="bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-xl border border-gray-200 p-4 flex flex-col justify-between"
            >
              <CardHeader className="flex items-center justify-between p-0 mb-1">
                <CardTitle className="text-sm sm:text-base font-medium text-gray-500">
                  {item.title}
                </CardTitle>
                <span
                  className={`${item.iconBg} p-1.5 sm:p-2 rounded-md flex items-center justify-center`}
                >
                  {item.icon}
                </span>
              </CardHeader>

              <CardContent className="p-0">
                <p className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                  {item.value}
                </p>
                <CardDescription className="text-xs sm:text-sm text-gray-500 mt-0.5">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Buttons Section */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full :w-fullsm md:w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg shadow transition-all duration-200">
            Add Staff
          </button>
          <button
            onClick={()=> setBlookBookingModal(true)}
          className="w-full ms:w-full md:w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-lg shadow transition-all duration-200">
            Block Bookings
          </button>
        </div>
      </main>
    </div>
  );
};

export default DashboardVendor;
