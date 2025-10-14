import React from "react";
import { MapPin, Clock, Star } from "lucide-react";

interface Shop {
  ProfileImage?: string;
  shopName: string;
  city: string;
  state: string;
  openAt: string; 
  closeAt: string; 
}

interface ShopDataCardProps {
  shopData: Shop;
}

const ShopDataCard: React.FC<ShopDataCardProps> = ({ shopData }) => {
  return (
    <article className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-lg border border-gray-100 transition-all duration-200">
    
      <div className="relative">
        <img
          src={shopData.ProfileImage || "/placeholder.svg"}
          alt={shopData.shopName}
          className="w-full h-48 object-cover"
        />
      </div>

   
      <div className="p-4">

        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {shopData.shopName}
        </h3>


        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin size={16} className="mr-1 text-gray-500" />
          <span>
            {shopData.city}, {shopData.state}
          </span>
        </div>


        <div className="flex items-center text-gray-500 text-sm mb-3">
          <Clock size={14} className="mr-1" />
          <span>
            {shopData.openAt} - {shopData.closeAt}
          </span>
        </div>

 
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={16}
              className={i <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">(4.0)</span>
        </div>
      </div>
    </article>
  );
};

export default ShopDataCard;
