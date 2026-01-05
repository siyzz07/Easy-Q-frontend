import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Users, Store, ShoppingCart, Clock, 
  ArrowUpRight, TrendingUp, ShieldCheck, UserCheck 
} from "lucide-react";

// UI Components
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../../components/ui/card";
import { adminDashbordData } from "../../Services/ApiService/AdminApiService";

// Types
interface DashboardStats {
  totalVendors: number;
  totalCustomers: number;
  pendingVendors: number;
  rejectedVendors: number;
  verifiedVendors: number;
}

const DashboardAdmin = () => {
  const [data, setData] = useState<DashboardStats>({
    totalVendors: 0,
    totalCustomers: 0,
    pendingVendors: 0,
    rejectedVendors: 0,
    verifiedVendors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await adminDashbordData();
        if (response?.data) {
          setData({
            totalVendors: response.data.totalVednors || 0,
            totalCustomers: response.data.totalCutomers || 0,
            pendingVendors: response.data.pendingVendors || 0,
            rejectedVendors: response.data.rejectedVendors || 0,
            verifiedVendors: response.data.verifiedVendors || 0,
          });
        }
      } catch (error) {
        console.error("Dashboard data fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Memoize stats to prevent recalculation on every render
  const statsConfig = useMemo(() => [
    {
      title: "Total Platform Users",
      value: data.totalVendors + data.totalCustomers,
      icon: Users,
      description: "Aggregate of all members",
      color: "from-blue-500 to-cyan-400",
      shadow: "shadow-blue-500/20",
    },
    {
      title: "Service Vendors",
      value: data.totalVendors,
      icon: Store,
      description: "Registered businesses",
      color: "from-emerald-500 to-teal-400",
      shadow: "shadow-emerald-500/20",
    },
    {
      title: "Active Customers",
      value: data.totalCustomers,
      icon: ShoppingCart,
      description: "End-user profiles",
      color: "from-violet-500 to-purple-400",
      shadow: "shadow-violet-500/20",
    },
    {
      title: "Pending Approval",
      value: data.pendingVendors,
      icon: Clock,
      description: "Awaiting review",
      color: "from-orange-500 to-amber-400",
      shadow: "shadow-orange-500/20",
    },
    {
      title: "Verified Partners",
      value: data.verifiedVendors,
      icon: ShieldCheck,
      description: "Trusted vendors",
      color: "from-pink-500 to-rose-400",
      shadow: "shadow-pink-500/20",
    },
    {
      title: "Revenue (M.T.D)",
      value: 54820, // Should eventually come from API
      isCurrency: true,
      icon: TrendingUp,
      description: "Month-to-date earnings",
      color: "from-indigo-500 to-blue-400",
      shadow: "shadow-indigo-500/20",
    }
  ], [data]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  // const itemVariants = {
  //   hidden: { y: 20, opacity: 0 },
  //   visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  // };

  return (
    <div className="min-h-full p-6 lg:p-10 space-y-10">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Overview Dashboard</h2>
          <p className="text-muted-foreground font-medium mt-1">Welcome back. Here's what's happening with Easy Q today.</p>
        </div>
        <div className="px-4 py-2 bg-secondary/50 rounded-xl border border-border flex items-center gap-2 w-fit">
          <Clock size={16} className="text-muted-foreground" />
          <span className="text-sm font-bold text-foreground">
            {loading ? "Updating..." : "Last updated: Just now"}
          </span>
        </div>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {statsConfig.map((item, index) => (
          <motion.div key={index} >
            <Card className="glass-card hover:shadow-2xl transition-all duration-500 border-none group relative overflow-hidden h-full">
              <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700`} />
              
              <CardHeader className="p-6 pb-2">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} ${item.shadow} text-white`}>
                    <item.icon size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-500/10 px-2.5 py-1 rounded-full">
                    <ArrowUpRight size={14} />
                    <span>12%</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-2">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{item.title}</CardTitle>
                  <p className="text-4xl font-black text-foreground tracking-tighter transition-all group-hover:scale-105 origin-left duration-300">
                    {item.isCurrency 
                      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.value)
                      : item.value.toLocaleString()}
                  </p>
                  <CardDescription className="text-xs font-semibold text-muted-foreground/80 mt-2 flex items-center gap-1.5">
                    <TrendingUp size={12} className="text-emerald-500" />
                    {item.description}
                  </CardDescription>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Analytics Placeholders */}
      <footer className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-10">
        <PlaceholderCard 
          icon={<TrendingUp size={32} />} 
          title="Analytics Coming Soon" 
          desc="We're working on powerful data visualizations for your business metrics."
          color="text-primary"
          bgColor="bg-primary/10"
        />
        <PlaceholderCard 
          icon={<UserCheck size={32} />} 
          title="User Activity" 
          desc="Real-time monitoring of customer and vendor interactions will appear here."
          color="text-violet-500"
          bgColor="bg-violet-500/10"
        />
      </footer>
    </div>
  );
};

const PlaceholderCard = ({ icon, title, desc, color, bgColor }: any) => (
  <Card className="glass-card border-none min-h-[300px] flex flex-col items-center justify-center p-10 text-center space-y-4">
    <div className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground max-w-xs mx-auto text-sm mt-2 font-medium">{desc}</p>
    </div>
  </Card>
);

export default DashboardAdmin;