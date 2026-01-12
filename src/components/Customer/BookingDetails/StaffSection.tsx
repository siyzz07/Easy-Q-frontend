
import React from "react";
import { motion } from "framer-motion";
import { User, QrCode, Info } from "lucide-react";
import { Badge } from "../../ui/badge";

interface StaffSectionProps {
  bookingData: any;
}

const StaffSection: React.FC<StaffSectionProps> = ({ bookingData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-[2rem] p-6 shadow-sm border border-border/50 flex flex-col justify-between"
      >
        <div>
          <h3 className="font-bold text-lg mb-4 text-slate-800">Assigned Staff</h3>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-inner">
              <User size={30} strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-bold text-foreground leading-tight">{bookingData.staffId.staffName}</p>
              {/* <p className="text-sm text-muted-foreground">{bookingData.staffRole}</p> */}
            </div>
          </div>
        </div>
        {/* <div className="mt-6 pt-6 border-t border-border/50 flex justify-between items-center text-sm">
          <span className="text-muted-foreground font-medium">Cancellation Policy</span>
          <Info size={16} className="text-primary cursor-help" />
        </div> */}
      </motion.div>

      {/* <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-[2rem] p-6 shadow-sm border border-border/50"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg text-slate-800">Check-in QR</h3>
          <Badge variant="secondary" className="text-[8px] uppercase tracking-widest font-black">Scan at shop</Badge>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 py-2">
          <div className="p-4 bg-slate-50 rounded-3xl border border-border/40 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
            <QrCode size={80} className="text-foreground group-hover:scale-110 transition-transform duration-300" />
          </div>
          <p className="text-[10px] text-muted-foreground text-center font-bold uppercase tracking-tight leading-relaxed">
            Show this code to the staff member <br/> for a fast check-in experience.
          </p>
        </div>
      </motion.div> */}
    </div>
  );
};

export default StaffSection;
