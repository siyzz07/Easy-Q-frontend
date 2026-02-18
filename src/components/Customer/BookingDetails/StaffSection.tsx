
import React from "react";
import { motion } from "framer-motion";
import { User} from "lucide-react";

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
      </motion.div>

      
    </div>
  );
};

export default StaffSection;
