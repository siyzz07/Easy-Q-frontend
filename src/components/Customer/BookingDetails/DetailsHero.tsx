
import React from 'react';
import { motion } from 'framer-motion';
import { Store, CheckCircle2, Clock4, XCircle, AlertCircle } from 'lucide-react';
import { Badge } from '../../ui/badge';
import type { IBooking } from '../../../Shared/types/Types';
import { convertRailwayTime } from '../../../utils/convertRailwayTime';

interface DetailsHeroProps {
  bookingData: any;
  id: string | undefined;
}

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    case 'pending': return <Clock4 className="w-5 h-5 text-amber-500" />;
    case 'cancelled': return <XCircle className="w-5 h-5 text-rose-500" />;
    default: return <AlertCircle className="w-5 h-5 text-blue-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'pending': return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'cancelled': return 'bg-rose-50 text-rose-700 border-rose-200';
    default: return 'bg-blue-50 text-blue-700 border-blue-200';
  }
};

const DetailsHero: React.FC<DetailsHeroProps> = ({ bookingData, id }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-border/50 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/5 rounded-full -ml-12 -mb-12 blur-2xl" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant="outline" className={`${getStatusColor(bookingData.status)} font-bold px-3 py-1 rounded-full flex items-center gap-1.5 border-2`}>
            {getStatusIcon(bookingData.status)}
            {bookingData.status}
          </Badge>
          <span className="text-xs font-bold text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full uppercase tracking-widest leading-none border border-border/50">
            {bookingData.bookingId}
          </span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight mb-2">
          {bookingData.serviceId.serviceName}
        </h1>
        <p className="text-muted-foreground text-lg mb-6 flex items-center gap-2">
          <Store size={20} className="text-primary" />
          At <span className="font-bold text-foreground underline decoration-primary/30 decoration-4 underline-offset-4">{bookingData.shopId.shopName}</span>
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-3xl bg-secondary/30 border border-border/40">
          {[
            { label: 'Date', value: bookingData.bookingDate },
            { label: 'Time', value: bookingData.bookingTimeStart, border: true },
            { label: 'Duration', value: bookingData.serviceId.duration, border: true },
            { label: 'Price', value: bookingData.serviceId.price, border: true }
          ].map((item, idx) => (
            <div key={idx} className={`space-y-1 ${item.border ? 'border-l border-border/50 pl-4' : ''}`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</p>
              <p className="font-bold text-sm truncate">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DetailsHero;
