import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  MailOpen
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for immediate UI visualization
const MOCK_NOTIFICATIONS = [
  {
    id: "1",
    title: "Booking Confirmed",
    message: "Your appointment at 'Gentlemen's Cut' has been successfully scheduled for tomorrow at 10:00 AM.",
    type: "success",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
  },
  {
    id: "2",
    title: "Account Security",
    message: "Your password was changed successfully. If you didn't do this, please contact support immediately.",
    type: "info",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: "3",
    title: "Payment Reminder",
    message: "Your pending payment for 'Spa Wellness' is due in 2 hours. Complete it now to avoid cancellation.",
    type: "warning",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: "4",
    title: "Service Unavailable",
    message: "The 'Deep Tissue Massage' service is currently undergoing maintenance and will be back online soon.",
    type: "error",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
  }
];

const NotificationPage = () => {
  // Using mock data so you can see the UI immediately
  const notifications = MOCK_NOTIFICATIONS;

  const getIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle2 className="text-emerald-500" size={20} />;
      case "warning": return <AlertTriangle className="text-amber-500" size={20} />;
      case "error": return <XCircle className="text-rose-500" size={20} />;
      default: return <Info className="text-blue-500" size={20} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success": return "bg-emerald-50/50";
      case "warning": return "bg-amber-50/50";
      case "error": return "bg-rose-50/50";
      default: return "bg-blue-50/50";
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 bg-slate-50/30 rounded-[3rem]">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="flex items-center gap-4">
           <div className="h-14 w-14 rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 relative">
              <Bell size={26} strokeWidth={1.5} />
              <span className="absolute top-3 right-3 h-2.5 w-2.5 bg-blue-600 border-2 border-white rounded-full" />
           </div>
           <div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">Notification Center</h1>
              <p className="text-slate-400 text-sm font-medium mt-0.5">Stay updated with your platform journey.</p>
           </div>
        </div>

        <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold transition-all border border-slate-100 shadow-sm">
              <CheckCheck size={16} />
              Mark all as read
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold transition-all border border-rose-100/50 shadow-sm">
              <Trash2 size={16} />
              Clear All
            </button>
        </div>
      </div>

      <div className="space-y-4">
          <AnimatePresence mode='popLayout'>
            {notifications.map((notification, index) => (
              <motion.div
                layout
                key={notification.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`group relative p-5 md:p-6 rounded-[2.5rem] border transition-all cursor-pointer flex gap-4 md:gap-6
                  ${notification.isRead 
                    ? "bg-white/60 border-slate-100 opacity-70" 
                    : `${getBgColor(notification.type)} border-transparent shadow-xl shadow-slate-200/40 scale-[1.01]`
                  }
                `}
              >
                <div className={`shrink-0 h-12 w-12 rounded-2xl flex items-center justify-center shadow-sm
                  ${notification.isRead ? "bg-slate-50" : "bg-white"}
                `}>
                  {notification.isRead ? <MailOpen className="text-slate-400" size={20} /> : getIcon(notification.type)}
                </div>

                <div className="flex-1 min-w-0 pr-10 text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`text-sm md:text-base font-bold truncate ${notification.isRead ? "text-slate-500" : "text-slate-900"}`}>
                      {notification.title}
                    </h4>
                    {!notification.isRead && (
                      <span className="h-2 w-2 bg-blue-600 rounded-full shrink-0" />
                    )}
                  </div>
                  <p className={`text-xs md:text-sm font-medium leading-relaxed ${notification.isRead ? "text-slate-400 text-left" : "text-slate-600 text-left"}`}>
                    {notification.message}
                  </p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">
                    Today, 10:24 AM
                  </p>
                </div>

                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
                   <button className="h-10 w-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-rose-500 hover:bg-white md:opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-rose-100">
                     <Trash2 size={18} />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
      </div>

      {/* Pro Tip Section */}
      <div className="pt-6 flex justify-center">
         <div className="flex items-center gap-3 px-6 py-4 bg-indigo-50/50 rounded-3xl border border-indigo-100/30">
            <div className="h-8 w-8 rounded-xl bg-indigo-500 flex items-center justify-center text-white">
               <Bell size={16} />
            </div>
            <p className="text-xs text-indigo-700 font-semibold">
               Configure your notification preferences in the <span className="underline cursor-pointer">Security settings</span>.
            </p>
         </div>
      </div>
    </div>
  );
};

export default NotificationPage;
