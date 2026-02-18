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
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/ui/card";
import { adminDashbordData } from "../../Services/ApiService/AdminApiService";
import PieChartComponent from "../../components/Admin/PieChartComponent";
import ChartMultyChart from "../../components/Vendor/ChartMultyChart";

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ChartMultyChart 
            chartConfig={chartConfig} 
            chartData={revenueChartData} 
            setYear={setYear} 
          />
        </div>
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
      </div>
    </div>
  );
};

export default DashboardAdmin;
