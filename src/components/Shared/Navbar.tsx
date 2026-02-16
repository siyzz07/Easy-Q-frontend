import React, { useState, useEffect } from "react";
import NotificationModal from "./NotificationModal";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Bell, Menu, X, User } from "lucide-react";
import { getAccessToken } from "../../utils/tokenUtils";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";


interface NavbarProps {
  menu: { label: string; path: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ menu }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const token = getAccessToken();
  const dispatch = useDispatch();

  const unreadCount = useSelector(
    (state: any) => state.notification.totalUnreaded
  );

  const notifications =
    useSelector((state: any) => state.notification.notifications) || [];


  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    // loadNotifications();
  }, []);

  // const loadNotifications = async () => {
  //     try {
  //       if(!token) return
  //       const result = await fetchNotification();
  //       if (result?.data) {
  //          dispatch(setNotifications(result.data));

  //          console.log('result------------------------:>> ', result);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch notifications", error);
  //     }
  //   };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={` fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-nav py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
            <div className="absolute inset-0 bg-white/20 rotate-45 translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700 ease-in-out" />
            <span className="text-xl font-bold relative z-10">Q</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Easy<span className="text-primary">Q</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative px-1 py-1 transition-colors hover:text-primary ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className={`relative rounded-full border p-2 transition-colors ${
                    isNotificationOpen
                      ? "bg-primary/10 border-primary text-primary"
                      : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                  aria-label="Notifications"
                >
                  <Bell className="h-4 w-4" />
                  {unreadCount > 0 && (
                    <span
                      className="
                       absolute -top-1 -right-1
                       min-w-[18px] h-[18px]
                       px-1
                       flex items-center justify-center
                       rounded-full
                       bg-red-500 text-white
                       text-[11px] font-bold
                       ring-2 ring-background
                     "
                    >
                      {unreadCount}
                    </span>
                  )}
                </motion.button>

                <NotificationModal
                  isOpen={isNotificationOpen}
                  onClose={() => setIsNotificationOpen(false)}
                  // notifications={notifications}
                  // onMarkRead={() => console.log("Mark all read")}
                  // onClear={() => console.log("Clear all")}
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("profile")}
                className="h-9 w-9 flex items-center justify-center rounded-full bg-primary text-primary-foreground font-bold shadow-md cursor-pointer hover:ring-2 hover:ring-primary/20 hover:ring-offset-2 transition-all"
              >
                <User size={18} />
              </motion.div>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/customer/login"
                className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Login
              </Link>
              <Link
                to="/customer/signup"
                className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}

          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col p-4 gap-2">
              {menu.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className="block px-4 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {!token && (
                <Link
                  to="/customer/login"
                  className="block px-4 py-3 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
