
import React from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft } from 'lucide-react';
import { Button } from '../../ui/button';

interface ActionSidebarProps {
  bookingData: any;
}

const ActionSidebar: React.FC<ActionSidebarProps> = ({ bookingData }) => {
  return (
    <div className="space-y-6">
      {/* Actions Sidebar */}
      {/* <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6 }}
        className="space-y-3"
      >
        <div className="bg-rose-50/50 border border-rose-100 rounded-[2rem] p-5">
          <p className="text-[10px] font-black text-rose-700 mb-3 flex items-center gap-2 uppercase tracking-widest leading-none">
             Important Policy
          </p>
          <p className="text-[11px] text-rose-600 font-semibold leading-normal mb-0 italic">
            "{bookingData.policy}"
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <Button variant="outline" className="w-full h-14 rounded-2xl font-black text-foreground border-slate-200 hover:bg-slate-50 transition-all shadow-sm">
            Reschedule Appointment
          </Button>
          <Button variant="ghost" className="w-full h-12 rounded-2xl font-bold text-rose-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
            Cancel This Booking
          </Button>
        </div>
      </motion.div> */}

      {/* Shop Rating Preview Card */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white rounded-[2rem] p-5 shadow-sm border border-border/50 flex items-center justify-between group cursor-pointer hover:border-primary hover:shadow-lg transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 border border-amber-100 shadow-inner">
            <Star fill="currentColor" size={24} />
          </div>
          <div>
            <p className="font-bold text-sm text-slate-800">Rate Your Experience</p>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight">{bookingData.shopName}</p>
          </div>
        </div>
        <ChevronLeft size={20} className="rotate-180 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
      </motion.div> */}
    </div>
  );
};

export default ActionSidebar;
