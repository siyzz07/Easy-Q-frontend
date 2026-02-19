import { useEffect, useState } from "react"; // Dashboard for Vendor overview
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/ui/card";
import {
  Users,
  ShoppingCart,
  DollarSign,
  Clock,
  TrendingUp,
  CheckCircle2,
  Award,
  Calendar,
  Sparkles,
} from "lucide-react";

import { vendorDashboard } from "../../Services/ApiService/VendorApiServices";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BlookBookisModal from "../../components/Vendor/BlookBookisModal";
import type { ChartConfig } from "../../components/ui/chart";
import ChartMultyChart from "../../components/Vendor/ChartMultyChart";
import VendorWeeklyChart from "../../components/Vendor/VendorWeeklyChart";
import ServiceDistributionPieChart from "../../components/Vendor/ServiceDistributionPieChart";
import PeakHoursChart from "../../components/Vendor/PeakHoursChart";
import BookingStatusChart from "../../components/Vendor/BookingStatusChart";


const DashboardVendor = () => {
  const navigate = useNavigate();
  let hasShop = useSelector((state: any) => state.vendorSlice.hasShop);
  const [blokcBookinModal,setBlookBookingModal] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [weeklyChartData, setWeeklyChartData] = useState<any[]>([]);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [pendingBookingsCount, setPendingBookingsCount] = useState<number>(0);
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [completionRate, setCompletionRate] = useState<number>(0);
  const [topServices, setTopServices] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [staffPerformance, setStaffPerformance] = useState<any[]>([]);
  const [statusBreakdown, setStatusBreakdown] = useState<any[]>([]);
  const [peakHours, setPeakHours] = useState<any[]>([]);
  const shopInfo = useSelector((state: any) => state.vendorSlice.shopData);

  const chartConfig = {
    bookings: {
      label: "Bookings",
      color: "hsl(var(--chart-1))", 
    },
    contracts: {
      label: "Contracts",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const weeklyChartConfig = {
    bookings: {
      label: "Bookings",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    dashboardDocument(year);
    if (hasShop == false) {
      navigate("/vendor/shop-data");
    }
  }, [year]);

  const dashboardDocument = async (selectedYear: number) => {
    try {
      let response = await vendorDashboard(selectedYear);
      if (response?.data?.data) {
        setChartData(response.data.data.chartData || []);
        setWeeklyChartData(response.data.data.weeklyChartData || []);
        setTotalRevenue(response.data.data.totalRevenue || 0);
        setCustomerCount(response.data.data.customerCount || 0);
        setPendingBookingsCount(response.data.data.pendingBookingsCount || 0);
        setTotalBookings(response.data.data.totalBookings || 0);
        setCompletionRate(response.data.data.completionRate || 0);
        setTopServices(response.data.data.topServices || []);
        setRecentBookings(response.data.data.recentBookings || []);
        setStaffPerformance(response.data.data.staffPerformance || []);
        setStatusBreakdown(response.data.data.statusBreakdown || []);
        setPeakHours(response.data.data.peakHours || []);
      }
    } catch (error: unknown) {
      console.log("error to fetch vendor dashbord data");
    }
  };

  const mainStats = [
    {
      title: "Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      change: "+12.5%",
      icon: <DollarSign size={20} />,
      color: "from-blue-600 to-indigo-700",
      shadow: "shadow-blue-500/20",
    },
    {
      title: "Total Bookings",
      value: totalBookings,
      change: "+18.2%",
      icon: <ShoppingCart size={20} />,
      color: "from-violet-600 to-purple-700",
      shadow: "shadow-violet-500/20",
    },
    {
      title: "Customers",
      value: customerCount,
      change: "+5.4%",
      icon: <Users size={20} />,
      color: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/20",
    },
    {
      title: "Completion",
      value: `${completionRate.toFixed(1)}%`,
      change: "+2.1%",
      icon: <CheckCircle2 size={20} />,
      color: "from-amber-500 to-orange-600",
      shadow: "shadow-amber-500/20",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-12">
      {blokcBookinModal && (
        <BlookBookisModal onClose={() => setBlookBookingModal(false)} />
      )}

      {/* Hero Section */}
      <div className="bg-slate-900 pt-8 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <div className="flex items-center gap-2 text-primary">
                <Sparkles size={16} />
                <span className="text-sm font-semibold uppercase tracking-wider">Business Intelligence</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">{shopInfo?.shopName || 'Partner'}</span>
              </h1>
              <p className="text-slate-400 max-w-lg">
                Your business is growing! You have <span className="text-white font-medium">{pendingBookingsCount} pending</span> requests to review today.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3"
            >
              <button
                onClick={() => setBlookBookingModal(true)}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/10 font-bold px-6 py-3 rounded-2xl transition-all flex items-center gap-2 group"
              >
                <Clock size={18} className="group-hover:rotate-12 transition-transform" />
                <span>Block Time</span>
              </button>
              <button
                onClick={() => navigate("/vendor/staffs")}
                className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-2xl shadow-xl shadow-primary/20 transition-all flex items-center gap-2"
              >
                <Users size={18} />
                <span>Team View</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-10">
        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {mainStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-none shadow-xl border-white/20 bg-white/80 backdrop-blur-xl overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                <CardContent className="p-0">
                  <div className={`h-1.5 bg-gradient-to-r ${stat.color}`} />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg ${stat.shadow}`}>
                        {stat.icon}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <TrendingUp size={10} />
                          {stat.change}
                        </span>
                        <span className="text-xs text-slate-400 mt-1">vs last month</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">{stat.title}</p>
                      <h3 className="text-3xl font-black text-slate-900 mt-1 tracking-tight">{stat.value}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Charts Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100">
              <ChartMultyChart chartConfig={chartConfig} chartData={chartData} setYear={setYear}/>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Booking Status - CIRCLE GRAPH */}
              <BookingStatusChart data={statusBreakdown} />

              {/* Weekly Trend */}
              <VendorWeeklyChart chartConfig={weeklyChartConfig} chartData={weeklyChartData} />
            </div>

          
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Top Services Highlight */}
            <Card className="border-none shadow-2xl rounded-[2rem] bg-slate-900 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Award size={120} />
              </div>

              <CardContent className="p-8 pt-2 relative z-10 space-y-5">
                {topServices.slice(0, 3).map((service, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                      idx === 0 ? 'bg-amber-400 text-amber-950' : 
                      idx === 1 ? 'bg-slate-300 text-slate-800' : 'bg-orange-400 text-orange-950'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-sm truncate">{service.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{service.count} Bookings</span>
                        <span className="text-xs font-bold text-white">₹{service.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => navigate('/vendor/services')}
                  className="w-full py-3 mt-4 text-xs font-bold text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5"
                >
                  Manage All Services
                </button>
              </CardContent>
            </Card>

            {/* Quick Activity */}
            <Card className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden">
              <CardHeader className="p-6">
                <CardTitle className="text-xl font-black text-slate-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-50">
                  {recentBookings.map((booking, idx) => (
                    <div key={idx} className="p-6 hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                            {booking.customerId?.name?.charAt(0) || 'U'}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{booking.customerId?.name || 'Customer'}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{booking.serviceId?.serviceName}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter ${
                          booking.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 
                          booking.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-red-100 text-red-600'
                        }`}>
                          {booking.status}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(booking.createdAt).toLocaleDateString()}
                        </span>
                        <span className="text-slate-900">₹{booking.totalAmount}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => navigate('/vendor/bookings')}
                  className="w-full py-4 text-xs font-black text-slate-400 hover:text-primary transition-colors hover:bg-slate-50 border-t border-slate-50"
                >
                  VIEW ALL TRANSACTIONS
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardVendor;
