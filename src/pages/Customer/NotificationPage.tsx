import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle,
  MailOpen,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";


import { useDispatch, useSelector } from "react-redux";
import { markAllAsRead } from "../../Redux/notificationSlice";
import { updateNotification } from "../../Services/ApiService/NotificationApiService";
import { formatDistanceToNow } from "date-fns";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: any) => state.notification.notifications);
  const unreadCount = useSelector((state: any) => state.notification.totalUnreaded);

  const handleMarkAllRead = async () => {
    try {
      dispatch(markAllAsRead());
      await updateNotification("all");
    } catch (error) {
      console.error("Failed to mark all as read:", error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
      case "booking_completed":
        return <CheckCircle2 className="text-emerald-500" size={20} />;
      case "warning":
        return <AlertTriangle className="text-amber-500" size={20} />;
      case "error":
        return <XCircle className="text-rose-500" size={20} />;
      default:
        return <Info className="text-blue-500" size={20} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
      case "booking_completed":
        return "bg-emerald-50/50";
      case "warning":
        return "bg-amber-50/50";
      case "error":
        return "bg-rose-50/50";
      default:
        return "bg-blue-50/50";
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
           <div className="h-14 w-14 rounded-[1.2rem] bg-blue-50 flex items-center justify-center text-blue-600 relative">
              <Bell size={26} strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-blue-600 border-2 border-white rounded-full translate-x-1 -translate-y-1" />
              )}
           </div>
           <div>
              <h1 className="text-2xl font-[900] text-slate-800 tracking-tight leading-none">Notifications</h1>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1.5">Stay updated with your activity</p>
           </div>
        </div>

        <div className="flex items-center gap-3">
            <button 
              onClick={handleMarkAllRead}
              disabled={unreadCount === 0}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all border ${
                unreadCount > 0 
                ? "bg-slate-50 hover:bg-white hover:shadow-lg text-slate-600 border-slate-100" 
                : "bg-slate-50 text-slate-300 border-transparent cursor-not-allowed"
              }`}
            >
              <CheckCheck size={16} />
              Mark Read
            </button>
            <button className="flex items-center gap-2 px-5 py-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-black uppercase tracking-widest transition-all border border-rose-100">
              <Trash2 size={16} />
              Clear
            </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-6">
          <AnimatePresence mode='popLayout'>
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6">
                  <MailOpen className="text-slate-200" size={40} />
                </div>
                <h3 className="text-xl font-black text-slate-800 tracking-tight">All caught up!</h3>
                <p className="text-slate-400 text-sm font-medium mt-2">You don't have any notifications right now.</p>
              </div>
            ) : (
              notifications.map((notification: any, index: number) => (
                <motion.div
                  layout
                  key={notification._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group relative p-6 rounded-[2rem] border transition-all cursor-pointer flex gap-6
                    ${notification.isRead 
                      ? "bg-white border-slate-100 opacity-60 hover:opacity-100" 
                      : `${getBgColor(notification.type)} border-transparent shadow-xl shadow-slate-200/40 scale-[1.01]`
                    }
                  `}
                >
                  <div className={`shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center shadow-inner
                    ${notification.isRead ? "bg-slate-50" : "bg-white"}
                  `}>
                    {notification.isRead ? <MailOpen className="text-slate-300" size={24} /> : getIcon(notification.type)}
                  </div>

                  <div className="flex-1 min-w-0 pr-12 text-left">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h4 className={`text-base font-black tracking-tight ${notification.isRead ? "text-slate-500" : "text-slate-900"}`}>
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <span className="h-2 w-2 bg-blue-600 rounded-full animate-pulse" />
                      )}
                    </div>
                    <p className={`text-[13px] font-medium leading-relaxed ${notification.isRead ? "text-slate-400" : "text-slate-600"}`}>
                      {notification.content}
                    </p>
                    <div className="flex items-center gap-2 mt-4">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">
                         {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                       </span>
                       <div className="h-1 w-1 bg-slate-200 rounded-full" />
                       <span className="text-[10px] font-black text-blue-600/40 uppercase tracking-[0.1em]">{notification.type}</span>
                    </div>
                  </div>

                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-3">
                     <button className="h-10 w-10 flex items-center justify-center rounded-xl text-slate-300 hover:text-rose-500 hover:bg-white md:opacity-0 group-hover:opacity-100 transition-all border border-transparent hover:border-rose-100">
                       <Trash2 size={18} />
                     </button>
                     <ChevronRight size={16} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
      </div>

      {/* Footer Info */}
      <div className="mt-10 pt-10 border-t border-slate-50 flex justify-center">
         <div className="flex items-center gap-3 px-8 py-5 bg-indigo-50/50 rounded-[2rem] border border-indigo-100/30 w-full">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/20">
               <Bell size={18} />
            </div>
            <p className="text-xs text-indigo-900 font-bold leading-relaxed">
               Showing your most recent activity. You can customize which alerts you receive in your <span className="underline decoration-indigo-300 underline-offset-4 cursor-pointer hover:text-indigo-600 transition-colors">Security Settings</span>.
            </p>
         </div>
      </div>
    </div>
  );
};

export default NotificationPage;
