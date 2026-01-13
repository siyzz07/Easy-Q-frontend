import React from "react";
import { MapPin, Clock, Star, ExternalLink, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { convertRailwayTime } from "../../utils/convertRailwayTime";

interface Shop {
  ProfileImage?: string;
  shopName: string;
  city: string;
  state: string;
  openAt: string;
  closeAt: string;
  _id: string;
  rating:number
}

interface ShopDataCardProps {
  shopData: Shop;
}

const ShopDataCard: React.FC<ShopDataCardProps> = ({ shopData }) => {
  const navigate = useNavigate();

  return (
    <motion.article 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-2xl overflow-hidden glass-card hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={shopData.ProfileImage || "/placeholder.svg"}
          alt={shopData.shopName}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Floating Tag */}
        {/* <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-lg">
          Open Now
        </div> */}
      </div>

      <div className="p-5 relative">
        <div className="flex justify-between items-start mb-2">
           <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
            {shopData.shopName}
           </h3>
           <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg border border-yellow-100">
             <Star size={14} className="fill-yellow-400 text-yellow-400" />
             <span className="text-xs font-bold text-yellow-700">{shopData.rating}</span>
           </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin size={14} className="mr-2 text-primary" />
            <span className="truncate">
              {shopData.city}, {shopData.state}
            </span>
          </div>

          <div className="flex items-center text-muted-foreground text-sm">
            <Clock size={14} className="mr-2 text-primary" />
            <span>
              {convertRailwayTime(shopData.openAt) } - {convertRailwayTime(shopData.closeAt) }
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <Link
            to={`/customer/vendor/${shopData._id}`}
            className="flex-1 inline-flex items-center justify-center py-2.5 rounded-xl border border-border bg-transparent text-gray-700 font-semibold hover:bg-gray-50 transition-all"
          >
            Visit <ExternalLink size={14} className="ml-2" />
          </Link>

          <Link
            to={`/customer/services/${shopData._id}`}
            className="flex-1 inline-flex items-center justify-center py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 transition-all"
          >
            Services <ArrowRight size={14} className="ml-2" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default React.memo(ShopDataCard);
