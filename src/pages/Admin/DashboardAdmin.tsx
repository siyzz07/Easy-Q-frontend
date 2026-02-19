import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Users,
  ShoppingCart,
  Clock,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/ui/card";
import { adminDashbordData } from "../../Services/ApiService/AdminApiService";
import PieChartComponent from "../../components/Admin/PieChartComponent";
import ChartMultyChart from "../../components/Vendor/ChartMultyChart";
import PeakHoursChart from "../../components/Vendor/PeakHoursChart";
import BookingStatusChart from "../../components/Vendor/BookingStatusChart";

const DashboardAdmin = () => {
  const [data, setData] = useState<any>({
    totalVendors: 0,
    totalCustomers: 0,
    pendingVendors: 0,
    rejectedVendors: 0,
    verifiedVendors: 0,
    bookingStats: { totalRevenue: 0, totalBookings: 0, completedBookings: 0, cancelledBookings: 0, pendingBookings: 0 },
    contractStats: { totalContracts: 0, openContracts: 0, completedContracts: 0, cancelledContracts: 0 },
  });
  const [pieChartData, setPieChartData] = useState<any[]>([]);
  const [revenueChartData, setRevenueChartData] = useState<any[]>([]);
  const [statusChartData, setStatusChartData] = useState<any[]>([]);
  const [topVendors, setTopVendors] = useState<any[]>([]);
  const [topServices, setTopServices] = useState<any[]>([]);
  const [peakHoursData, setPeakHoursData] = useState<any[]>([]);
  const [userGrowthChartData, setUserGrowthChartData] = useState<any[]>([]);
  const [year, setYear] = useState(new Date().getFullYear());

  const chartConfig = {
    revenue: {
      label: "Revenue",
      color: "hsl(var(--chart-1))",
    },
    bookings: {
      label: "Bookings",
      color: "hsl(var(--chart-2))",
    },
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await adminDashbordData();

        if (response?.data) {
          const resData = response.data;
          setPieChartData([
            {
              browser: "Customers",
              visitors: resData.totalCustomers || 0,
              fill: "#93c5fd",
            },
            {
              browser: "Vendors",
              visitors: resData.totalVendors || 0,
              fill: "#1e40af",
            },
          ]);
          setRevenueChartData(resData.revenueChartData || []);
          setStatusChartData(resData.platformStatusBreakdown || []);
          setTopVendors(resData.topVendors || []);
          setTopServices(resData.topServices || []);
          setPeakHoursData(resData.peakHours || []);
          setUserGrowthChartData(resData.userGrowthChartData || []);
          setData(resData);
        }
      } catch (error) {
        console.error("Dashboard data fetch failed", error);
      }
    };

    fetchDashboardData();
  }, [year]);

  const statsConfig = useMemo(
    () => [
      // {
      //   title: "Platform Revenue",
      //   value: `₹${(data.bookingStats?.totalRevenue || 0).toLocaleString()}`,
      //   icon: TrendingUp,
      //   description: "Gross earnings",
      //   color: "from-blue-600 to-indigo-500",
      //   shadow: "shadow-blue-500/20",
      // },
      {
        title: "Total Bookings",
        value: data.bookingStats?.totalBookings || 0,
        icon: ShoppingCart,
        description: "Service requests",
        color: "from-emerald-500 to-teal-400",
        shadow: "shadow-emerald-500/20",
      },
      {
        title: "Total Contracts",
        value: data.contractStats?.totalContracts || 0,
        icon: ShieldCheck,
        description: "Bidding contracts",
        color: "from-violet-500 to-purple-400",
        shadow: "shadow-violet-500/20",
      },
      {
        title: "Pending Vendors",
        value: data.pendingVendors,
        icon: Clock,
        description: "Awaiting verification",
        color: "from-orange-500 to-amber-400",
        shadow: "shadow-orange-500/20",
      },
      {
        title: "Total Users",
        value: (data.totalCustomers || 0) + (data.totalVendors || 0),
        icon: Users,
        description: "Combined ecosystem",
        color: "from-pink-500 to-rose-400",
        shadow: "shadow-pink-500/20",
      },
      {
        title: "Verified Shops",
        value: data.verifiedVendors || 0,
        icon: ShieldCheck,
        description: "Active partners",
        color: "from-blue-500 to-indigo-400",
        shadow: "shadow-blue-500/20",
      },
    ],
    [data]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  // const itemVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  // };

  return (
    <div className="min-h-full  p-6 lg:p-10 space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Admin Overview
          </h2>
          <p className="text-muted-foreground font-medium mt-1">
            Real-time platform analytics and business performance.
          </p>
        </div>
      </header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
      >
        {statsConfig.map((item, index) => (
          <motion.div key={index}>
            <Card className="glass-card hover:shadow-xl transition-all duration-300 border-none group relative overflow-hidden">
              {/* Smaller Decorative Background element */}
              <div
                className={`absolute -right-2 -top-2 w-16 h-16 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500`}
              />

              <CardContent className="p-4 flex items-center gap-4">
                {/* Smaller, more compact icon container */}
                <div
                  className={`shrink-0 p-2.5 rounded-xl bg-gradient-to-br ${item.color} ${item.shadow} text-white shadow-lg`}
                >
                  <item.icon size={18} />
                </div>

                <div className="min-w-0 flex-1 space-y-0.5">
                  <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">
                    {item.title}
                  </CardTitle>

                  <div className="flex items-baseline gap-2">
                    <p className="text-2xl font-black text-foreground tracking-tight transition-all group-hover:translate-x-0.5 duration-300 overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.value}
                    </p>
                  </div>

                  <CardDescription className="text-[10px] font-medium text-muted-foreground/70 flex items-center gap-1 leading-none">
                    <TrendingUp size={10} className="text-emerald-500" />
                    {item.description}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartMultyChart 
          chartConfig={chartConfig} 
          chartData={revenueChartData} 
          setYear={setYear} 
          title="Revenue & Bookings"
          description="Monthly platform performance"
        />
        <ChartMultyChart 
          chartConfig={{
            customers: { label: "Customers", color: "#3b82f6" },
            vendors: { label: "Vendors", color: "#6366f1" }
          }} 
          chartData={userGrowthChartData} 
          setYear={setYear}
          title="User Growth"
          description="New signups per month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PieChartComponent 
            chartConfig={{
              visitors: { label: "Users" },
              Customers: { label: "Customers", color: "#93c5fd" },
              Vendors: { label: "Vendors", color: "#1e40af" }
            }} 
            title="User Distribution" 
            description="Customers vs Vendors" 
            chartData={pieChartData} 
          />
        </div>
        <div className="lg:col-span-2">
           <BookingStatusChart data={statusChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PeakHoursChart data={peakHoursData} />
        {/* Top Vendors Leaderboard */}
        <Card className="glass-card border-none overflow-hidden h-full">
          <CardHeader className="p-6 border-b border-slate-100/50 bg-slate-50/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Top Performing Vendors</CardTitle>
                <CardDescription className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Revenue Leaders</CardDescription>
              </div>
              <ShieldCheck className="text-blue-500" size={24} />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {topVendors.length > 0 ? topVendors.map((vendor, index) => (
                <div key={index} className="p-4 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? "bg-amber-100 text-amber-600" : 
                      index === 1 ? "bg-slate-100 text-slate-600" : "bg-blue-50 text-blue-500"
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{vendor.shopName}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{vendor.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-black text-slate-900">₹{vendor.revenue.toLocaleString()}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{vendor.bookings} Bookings</p>
                  </div>
                </div>
              )) : (
                <div className="p-10 text-center text-slate-400 font-bold italic">No vendor data available</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Top Services Leaderboard */}
        <Card className="glass-card border-none overflow-hidden">
          <CardHeader className="p-6 border-b border-slate-100/50 bg-slate-50/10">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-black text-slate-900 tracking-tight">Most Popular Services Platform-Wide</CardTitle>
                <CardDescription className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Global Service Demand Breakdown</CardDescription>
              </div>
              <ShoppingCart className="text-emerald-500" size={24} />
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {topServices.length > 0 ? topServices.map((service, index) => (
                <div key={index} className="p-6 rounded-[2rem] bg-slate-50/50 border border-slate-100 hover:shadow-lg transition-all group">
                  <div className="flex items-center justify-between mb-4">
                     <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm bg-white shadow-sm`}>
                        {index + 1}
                     </div>
                     <TrendingUp size={16} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="font-black text-slate-900 truncate">{service.name}</p>
                  <div className="mt-4 flex flex-col">
                    <span className="text-2xl font-black text-slate-900">{service.count}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Bookings</span>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-emerald-600">₹{service.revenue.toLocaleString()}</span>
                  </div>
                </div>
              )) : (
                <div className="col-span-full p-10 text-center text-slate-400 font-bold italic">No service data available</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAdmin;
