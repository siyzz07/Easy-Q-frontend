import React from 'react';
import { motion } from 'framer-motion';
import { Clock4, CalendarDays, XCircle, AlertCircle } from 'lucide-react';

interface BookingActionsProps {
  status: string;
  bookingDate: string;
  onCancel: () => void;
  onReschedule: () => void;
}

const BookingActionCard: React.FC<BookingActionsProps> = ({ 
  status, 
  bookingDate, 
  onCancel, 
  onReschedule 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[2rem] p-8 shadow-sm border border-border/50"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        
        {/* Status Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock4 size={18} />
            <span className="text-sm font-medium">Current Status</span>
          </div>
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold text-foreground capitalize">{status}</h3>
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            <CalendarDays size={14} />
            Scheduled for {bookingDate}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={onCancel}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-red-100 text-red-600 hover:bg-red-50 font-semibold transition-all active:scale-95"
          >
            <XCircle size={18} />
            Cancel
          </button>
          
          <button
            onClick={onReschedule}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-white hover:opacity-90 shadow-md shadow-primary/20 font-semibold transition-all active:scale-95"
          >
            <CalendarDays size={18} />
            Reschedule
          </button>
        </div>
      </div>

      {/* Optional: Small Policy Note */}
      <div className="mt-6 pt-6 border-t border-dashed flex items-center gap-2 text-muted-foreground text-xs italic">
        <AlertCircle size={14} />
        Canceling within 24 hours of the appointment may incur a fee.
      </div>
    </motion.div>
  );
};

export default BookingActionCard;