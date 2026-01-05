import { useState } from "react";
import {
  LayoutDashboard,
  Store,
  Users,
  Wrench,
  CreditCard,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Settings,
  Bell
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logoutAdmin } from "../../Services/ApiService/AdminApiService";
import { useDispatch } from "react-redux";
import { adminLogOut } from "../../Redux/AdminAuthSlice";
import { removeToken } from "../../utils/tokenUtils";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const path = location?.pathname.split("/").filter(Boolean);
  
  const page = path[1]
    ? path[1].charAt(0).toUpperCase() + path[1].slice(1)
    : "Dashboard";

  const items = [
    { icon: LayoutDashboard, label: "Dashboard", path: "Dashboard", route: "/admin/dashboard" },
    { icon: Store, label: "Vendors", path: "Vendors", route: "/admin/vendors" },
    { icon: Users, label: "Customers", path: "Customers", route: "/admin/customers" },
    { icon: ShieldCheck, label: "Verifications", path: "Verification-requests", route: "/admin/verification-requests" },
    { icon: Wrench, label: "Service Types", path: "Services", route: "/admin/services" },
    { icon: CreditCard, label: "Revenue", path: "Payments", route: "/admin/payments" },
  ];

  const submitLogout = async () => {
    try {
      const response = await logoutAdmin();
      if (response?.status === 200) {
        dispatch(adminLogOut());
        removeToken();
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 glass-nav text-foreground">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-primary-foreground font-black text-xl">Q</span>
          </div>
          <span className="text-xl font-bold tracking-tighter">Easy Q Command</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-foreground transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`h-0.5 w-full bg-foreground transition-all ${isOpen ? "opacity-0" : ""}`} />
            <span className={`h-0.5 w-full bg-foreground transition-all ${isOpen ? "-rotate-45 -translate-y-2.5" : ""}`} />
          </div>
        </button>
      </div>

      {/* Sidebar Desktop */}
      <aside
        className={`fixed top-0 left-0 h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col w-72 z-40 transform transition-all duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static p-6`}
      >
        {/* Branding */}
        <div className="mb-12 hidden md:flex items-center gap-4">
          <div className="w-14 h-14 bg-primary rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-primary/40 transform transition hover:scale-105">
            <span className="text-primary-foreground font-black text-2xl italic">Q</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tighter text-foreground">COMMAND</span>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] leading-none mt-1">Administrator</span>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 space-y-10 overflow-y-auto custom-scrollbar">
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.25em] mb-6 px-4 opaciy-50">Operational Hub</p>
            <nav className="space-y-2">
              {items.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.route}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) => `
                    group flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden
                    ${isActive 
                      ? "bg-primary text-primary-foreground shadow-2xl shadow-primary/30" 
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }
                  `}
                >
                  <div className="flex items-center gap-4 font-bold relative z-10 text-xs uppercase tracking-widest">
                    <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"}`} />
                    <span>{item.label}</span>
                  </div>
                  {page.toLowerCase() === item.path.toLowerCase() && (
                    <motion.div layoutId="active-pill" className="relative z-10">
                      <ChevronRight size={16} className="opacity-70" />
                    </motion.div>
                  )}
                  {/* Decorative background hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Quick Stats Panel */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-secondary/50 to-transparent border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-muted-foreground uppercase">System Status</span>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="space-y-3">
              <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="h-full bg-primary" />
              </div>
              <p className="text-[10px] font-bold text-muted-foreground flex justify-between">
                <span>CPU Load</span>
                <span>85% Optimal</span>
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-border mt-auto space-y-4">
          <div className="flex items-center gap-3 px-4 py-2 hover:bg-secondary/30 rounded-2xl transition-all cursor-pointer group">
             <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:text-primary">
                <Settings size={16} />
             </div>
             <span className="text-xs font-bold text-muted-foreground">Preferences</span>
          </div>
          
          <button
            onClick={submitLogout}
            className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-500 w-full group overflow-hidden font-black text-xs uppercase tracking-widest border border-rose-500/10"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/80 backdrop-blur-md z-30 md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
