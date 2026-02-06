import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogOut } from "../../Redux/AdminAuthSlice";
import { logoutAdmin } from "../../Services/ApiService/AdminApiService";
import { removeToken } from "../../utils/tokenUtils";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Store,
  ShieldCheck,
  Layers,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Hexagon
} from "lucide-react";
import { ADMIN_ROUTES } from "../../Shared/Constants/RouteConstants";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", route: "/admin", icon: LayoutDashboard, path: "admin" },
    { label: "Customers", route: `/admin${ADMIN_ROUTES.CUSTOMERS_DATA}`, icon: Users, path: "customers" },
    { label: "Vendors", route: `/admin${ADMIN_ROUTES.VEDORS_DATA}`, icon: Store, path: "vendors" },
    { label: "Requests", route: `/admin/${ADMIN_ROUTES.VERIFICATION}`, icon: ShieldCheck, path: "verification-requests" },
    { label: "Services", route: `/admin${ADMIN_ROUTES.SERVICES}`, icon: Layers, path: "services" },
  ];

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      dispatch(adminLogOut());
      removeToken();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
      dispatch(adminLogOut());
      removeToken();
      navigate("/admin/login");
    }
  };

  const isActiveLink = (route: string) => {
      if (route === "/admin" && location.pathname === "/admin") return true;
      if (route !== "/admin" && location.pathname.startsWith(route)) return true;
      return false;
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-xl shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={`fixed md:relative z-50 h-screen w-72 bg-black border-r border-white/10 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo Section */}
        <div className="p-8 pb-4">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/25">
              Q
            </div>
            <span className="text-2xl font-extrabold text-white tracking-tight">Easy Q</span>
          </div>
          
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
         
          
          {navItems.map((item, index) => {
             const active = isActiveLink(item.route);
             
             return (
            <NavLink
              key={index}
              to={item.route}
              onClick={() => setIsOpen(false)}
              className={() => `
                group flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 relative overflow-hidden
                ${active
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 font-bold" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white font-medium"
                }
              `}
            >
          
                {active && (
                   <motion.div
                     layoutId="activeNavIndicator"
                     className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                   />
                )}

              <div className="flex items-center gap-3.5 z-10">
                <item.icon 
                    size={20} 
                    className={`transition-transform duration-300 ${active ? "scale-110" : "group-hover:scale-110"}`} 
                    strokeWidth={active ? 2.5 : 2}
                />
                <span className="tracking-wide text-sm">{item.label}</span>
              </div>
              
              {active && (
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="z-10"
                >
                  <ChevronRight size={16} className="opacity-80" strokeWidth={3} />
                </motion.div>
              )}
            </NavLink>
          );})}
        </nav>

        {/* Footer Section */}
        <div className="p-4 mt-auto">
         

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-2xl transition-all duration-300 group font-medium text-sm"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>Sign Out</span>
          </button>
          
          <div className="text-center mt-4 pb-2">
              <p className="text-[10px] text-muted-foreground/40">© 2024 Easy Q Admin v1.0</p>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
