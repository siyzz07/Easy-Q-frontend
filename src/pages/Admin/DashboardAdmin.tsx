import { useEffect, useState } from "react";
import { adminDashboardData } from "../../Services/ApiService/AdminApiService";
import { 
  Users, 
  Store, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity,
  Calendar,
  Clock,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const DashboardAdmin = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await adminDashboardData();
      if (response?.data?.data) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const stats = [
    {
      title: "Total Customers",
      value: data?.customers_count || 0,
      icon: Users,
      trend: "+12.5%",
      isUp: true,
      color: "from-blue-500/20 to-indigo-500/20",
      iconColor: "text-blue-500"
    },
    {
      title: "Active Vendors",
      value: data?.vendors_count || 0,
      icon: Store,
      trend: "+8.2%",
      isUp: true,
      color: "from-emerald-500/20 to-teal-500/20",
      iconColor: "text-emerald-500"
    },
    {
      title: "System Uptime",
      value: "99.9%",
      icon: Activity,
      trend: "Stable",
      isUp: true,
      color: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-500"
    }
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 lg:p-10 space-y-10 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-4xl font-black text-foreground tracking-tighter">System Overview</h1>
            <Sparkles className="text-primary w-6 h-6 animate-pulse" />
          </div>
          <p className="text-muted-foreground font-medium flex items-center gap-2">
            <Calendar size={14} />
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-card/50 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/5 shadow-xl">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <Clock size={18} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground leading-none">Status</p>
            <p className="text-sm font-bold text-foreground">Live Monitoring Active</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className={`relative group overflow-hidden bg-card glass-card p-6 rounded-[2rem] border-none shadow-2xl hover:shadow-primary/5 transition-all duration-500`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} blur-[50px] opacity-20 -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700`} />
            
            <div className="relative flex items-center justify-between mb-8">
              <div className={`w-14 h-14 rounded-2xl bg-secondary/50 flex items-center justify-center ${stat.iconColor} shadow-inner`}>
                <stat.icon size={26} strokeWidth={2.5} />
              </div>
              <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${stat.isUp ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>

            <div className="relative space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.title}</p>
              <h3 className="text-4xl font-black text-foreground tracking-tighter">
                {stat.value.toLocaleString()}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Analytics Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-card bg-card/30 h-80 flex flex-col items-center justify-center text-center p-10 border-dashed border-2 border-white/5"
        >
          <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4 text-muted-foreground">
            <Activity size={32} />
          </div>
          <h4 className="text-lg font-bold text-foreground">Traffic Analysis coming soon</h4>
          <p className="text-sm text-muted-foreground max-w-xs mt-2">We're finalizing the real-time data visualization engine for your command center.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="glass-card bg-card/30 h-80 flex flex-col items-center justify-center text-center p-10 border-dashed border-2 border-white/5"
        >
          <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mb-4 text-muted-foreground">
            <Calendar size={32} />
          </div>
          <h4 className="text-lg font-bold text-foreground">Event Timeline placeholder</h4>
          <p className="text-sm text-muted-foreground max-w-xs mt-2">Log data and user session audits will be presented here in an interactive format.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
