import React, { useEffect, useState, useMemo } from "react"; 
import { motion, AnimatePresence } from "framer-motion";


import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  MailOpen,
  Check,
  X,
  Eye,
  EyeOff,
  CheckCheck
} from "lucide-react";
import { updateNotification } from "../../Services/ApiService/NotificationApiService";
import { useDispatch, useSelector } from "react-redux";
import { markAsRead, markAllAsRead, type INotification } from "../../Redux/notificationSlice";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ 
  isOpen, 
  onClose, 
}) => {
  const dispatch = useDispatch();
  const notifications = useSelector((state: any) => state.notification.notifications);
  const unreadCount = useSelector((state: any) => state.notification.totalUnreaded);
  


  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`; 
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
      setShowOnlyUnread(false);
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  
  const displayNotifications = useMemo(() => {
    const sorted = [...notifications].sort((a: INotification, b: INotification) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    if (showOnlyUnread) {
      return notifications.filter((n: INotification) => !n.isRead);
    }
    return sorted;
  }, [notifications, showOnlyUnread]);

  const noitficaitonMarkAsRead = async (id: string) => {
    try {
      dispatch(markAsRead(id));
      await updateNotification("one", id);
    } catch (error) {
      console.log("notification error :>> ", error);
    }
  };

  const markAllNoitficaitonAsRead = async () => {
    try {
      dispatch(markAllAsRead());
      await updateNotification("all");
    } catch (error) {
      console.log("notification error :>> ", error);
    }
  };


  const getBgColor = (type: string) => {
    switch (type) {
      case "success": return "bg-emerald-50/60 border-emerald-100";
      case "warning": return "bg-amber-50/60 border-amber-100";
      case "error": return "bg-rose-50/60 border-rose-100";
      default: return "bg-blue-50/60 border-blue-100";
    }
  };

  return ( 
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-[40] bg-black/20 backdrop-blur-[2px]" onClick={onClose} />
          
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            className="fixed top-20 left-4 right-4 md:absolute md:top-full md:right-0 md:left-auto md:mt-4 md:w-[480px] bg-white rounded-3xl shadow-2xl border border-slate-200 z-[50] flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-extrabold text-slate-800">Notifications</h3>
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-sm">
                  {unreadCount}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                {/* 3. TOGGLE BUTTON */}
                <button 
                  onClick={() => setShowOnlyUnread(!showOnlyUnread)}
                  className={`p-2 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold ${
                    showOnlyUnread 
                    ? "bg-blue-100 text-blue-700" 
                    : "hover:bg-slate-100 text-slate-500"
                  }`}
                  title={showOnlyUnread ? "Show all" : "Show unread only"}
                >
                  {showOnlyUnread ? <Eye size={18} /> : <EyeOff size={18} />}
                  <span className="hidden sm:inline">{showOnlyUnread ? "All" : "Unread"}</span>
                </button>

                {unreadCount > 0 && (
                  <button 
                    onClick={markAllNoitficaitonAsRead}
                    className="p-2 rounded-xl hover:bg-emerald-50 text-slate-500 hover:text-emerald-600 transition-all flex items-center gap-1.5 text-xs font-bold"
                    title="Mark all as read"
                  >
                    <CheckCheck size={18} />
                    <span className="hidden sm:inline">Mark all</span>
                  </button>
                )}

                <div className="w-[1px] h-6 bg-slate-200 mx-1" />
                
                {/* <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-rose-600 transition-all">
                  <Trash2 size={20} />
                </button> */}
                <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-all">
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="overflow-y-auto max-h-[450px] p-4 space-y-3 overscroll-contain bg-slate-50/30">
              {displayNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <MailOpen className="text-slate-300" size={30} />
                  </div>
                  <p className="text-slate-600 font-bold">
                    {showOnlyUnread ? "No unread notifications" : "No notifications"}
                  </p>
                  {showOnlyUnread && (
                    <button 
                      onClick={() => setShowOnlyUnread(false)}
                      className="text-blue-600 text-xs font-bold mt-2 hover:underline"
                    >
                      View all notifications
                    </button>
                  )}
                </div>
              ) : (
                displayNotifications.map((notification: INotification) => (
                  <div 
                    key={notification._id}
                    className={`relative p-4 rounded-2xl border transition-all flex gap-4 group ${
                      notification.isRead 
                      ? "bg-white border-slate-100 opacity-75" 
                      : `${getBgColor(notification.type)} border shadow-sm`
                    }`}
                  >
                    <div className="flex-1 min-w-0 pr-8">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className={`text-sm font-bold truncate ${notification.isRead ? "text-slate-500" : "text-slate-900"}`}>
                          {notification.title}
                        </h4>
                      </div>
                      <p className={`text-[13px] leading-relaxed line-clamp-2 ${notification.isRead ? "text-slate-400" : "text-slate-600"}`}>
                        {notification.content} 
                        {notification.category === "booking" && notification.type === "booking_completed" && (
                          <span className="block font-medium mt-1">
                            {notification.metaData?.booking?.date}, {notification.metaData?.booking?.time}
                          </span>
                        )}
                      </p>
                    </div>

                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {!notification.isRead ? (
                        <button 
                          onClick={() => noitficaitonMarkAsRead(notification._id)}
                          className="h-8 w-8 rounded-xl bg-white shadow-md border border-slate-100 flex items-center justify-center text-emerald-500 hover:bg-emerald-500 hover:text-white transition-all md:opacity-0 md:group-hover:opacity-100"
                        >
                          <Check size={16} strokeWidth={3} />
                        </button>
                      ) : (
                        <Check size={16} className="text-slate-300" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

        
          </motion.div>
        </>
      )}
    </AnimatePresence>

  );
};

export default NotificationModal;