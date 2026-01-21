import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  ChevronRight,
  MailOpen,
  Trash2,
  Check,
  X
} from "lucide-react";
import { fetchNotification } from "../../Services/ApiService/NotificationApiService";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkRead: (id?: string) => void;
  onClear: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ 
  isOpen, 
  onClose, 
  notifications,
  onMarkRead,
  onClear
}) => {
  

  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`; 
    } else {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);


 

  console.log('9090909 :>> ', notifications);



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
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[40] bg-black/20 backdrop-blur-[2px]" 
            onClick={onClose} 
          />
          
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            className="fixed top-20 left-4 right-4 md:absolute md:top-full md:right-0 md:left-auto md:mt-4 md:w-[480px] bg-white rounded-3xl shadow-2xl border border-slate-200 z-[50] flex flex-col overflow-hidden shadow-blue-900/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header - Fixed */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-extrabold text-slate-800">Notifications</h3>
                <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-[11px] font-bold shadow-sm">
                  {/* {notifications.filter(n => !n.isRead).length} New */}
                </span>
              </div>
              <div className="flex items-center gap-1">
                 <button 
                  onClick={() => onMarkRead()} 
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-blue-600 transition-all"
                  title="Mark all as read"
                 >
                   <CheckCircle2 size={20} />
                 </button>
                 <button 
                  onClick={onClear} 
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-rose-600 transition-all"
                  title="Clear all"
                 >
                   <Trash2 size={20} />
                 </button>
                 <div className="w-[1px] h-6 bg-slate-200 mx-1" />
                 <button 
                  onClick={onClose} 
                  className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-all"
                 >
                   <X size={22} />
                 </button>
              </div>
            </div>

            {/* Scrollable Content Area */}
            <div 
              className="overflow-y-auto max-h-[450px] p-4 space-y-3 overscroll-contain bg-slate-50/30"
              style={{ scrollbarWidth: 'thin' }} 
            >
              {/* {notifications.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                      <MailOpen className="text-slate-300" size={30} />
                    </div>
                    <p className="text-slate-600 font-bold">No notifications</p>
                    <p className="text-slate-400 text-sm">We'll let you know when something arrives.</p>
                 </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`relative p-4 rounded-2xl border transition-all flex gap-4 group ${
                      notification.isRead 
                      ? "bg-white border-slate-100 opacity-75" 
                      : `${getBgColor(notification.type)} border shadow-sm`
                    }`}
                  >
                    
                    <div className={`shrink-0 h-11 w-11 rounded-xl flex items-center justify-center ${
                      notification.isRead ? "bg-slate-50" : "bg-white shadow-sm"
                    }`}>
                      {getIcon(notification.type)}
                    </div>

                    
                    <div className="flex-1 min-w-0 pr-8">
                      <div className="flex items-center justify-between mb-0.5">
                        <h4 className={`text-sm font-bold truncate ${notification.isRead ? "text-slate-500" : "text-slate-900"}`}>
                          {notification.title}
                        </h4>
                      </div>
                      <p className={`text-[13px] leading-relaxed line-clamp-2 ${notification.isRead ? "text-slate-400" : "text-slate-600"}`}>
                        {notification.message}
                      </p>
                    </div>

                    
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {!notification.isRead ? (
                        <button 
                          onClick={() => onMarkRead(notification.id)}
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
              )} */}
            </div>

            {/* Footer - Fixed */}
            <div className="p-4 border-t border-slate-100 bg-white shrink-0">
              <Link 
                to="/customer/profile/notifications" 
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-50 text-[13px] font-bold text-blue-600 hover:bg-blue-50 transition-colors"
              >
                View Full History
                <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;