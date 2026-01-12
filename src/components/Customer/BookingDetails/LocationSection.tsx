
import React from "react";
import { motion } from "framer-motion";
import { MessageSquare, MapPin, Navigation, Phone } from "lucide-react";
import { Button } from "../../ui/button";

interface LocationSectionProps {
  bookingData: any;
}

const LocationSection: React.FC<LocationSectionProps> = ({ bookingData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-border/50"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* <div className="md:col-span-12">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2 text-slate-800">
            <MessageSquare size={20} className="text-primary" />
            Special Instructions
          </h3>
          <div className="p-5 rounded-3xl bg-primary/5 border border-primary/10 text-muted-foreground leading-relaxed text-sm italic">
            "{bookingData.notes}"
          </div>
        </div> */}
        
        <div className="md:col-span-7">
          <h3 className="font-bold text-lg mb-4 text-slate-800">Location</h3>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl shadow-inner">
              <MapPin size={24} />
            </div>
            <div>
              <p className="font-bold text-foreground underline decoration-rose-500/20 underline-offset-2">{bookingData.shop.shopName}</p>
              <p className="text-sm text-muted-foreground  leading-snug">{`${bookingData.shop.state} ${bookingData.shop.city} `}</p>
              <p className="text-sm text-muted-foreground mb-4 leading-snug">{`${bookingData.shop.phone}`}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" className="rounded-xl gap-2 font-bold h-9 bg-white hover:bg-slate-50 border-slate-200">
                  <Navigation size={14} className="text-primary" /> Directions
                </Button>
                {/* <Button variant="ghost" size="sm" className="rounded-xl h-9 font-bold text-slate-600">
                  <Phone size={14} className="mr-2" /> Call Shop
                </Button> */}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-5 h-48 md:h-auto rounded-[2rem] bg-slate-100 border border-border/50 overflow-hidden relative group shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 flex items-center justify-center">
            <MapPin size={40} className="text-primary/30 animate-bounce" />
            <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-118.4002,34.0736,13/400x300?access_token=none')] bg-cover opacity-20" />
          </div>
          <Button variant="secondary" size="sm" className="absolute bottom-3 right-3 rounded-xl shadow-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity">
            Open Maps
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default LocationSection;
