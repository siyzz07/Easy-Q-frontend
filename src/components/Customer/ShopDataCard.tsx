import React from "react";
import { MapPin, Clock, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface Shop {
  ProfileImage?: string;
  shopName: string;
  city: string;
  state: string;
  openAt: string;
  closeAt: string;
  _id: string;
}

interface ShopDataCardProps {
  shopData: Shop;
}

const ShopDataCard: React.FC<ShopDataCardProps> = ({ shopData }) => {
  console.log(shopData);

  const navigate = useNavigate();

  return (
    <article className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl border border-gray-100 transition-transform transform hover:-translate-y-1 duration-300">
      <div className="relative">
        <img
          src={shopData.ProfileImage || "/placeholder.svg"}
          alt={shopData.shopName}
          className="w-full h-52 object-cover"
        />

        {/* subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-5">
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

        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star
              key={i}
              size={16}
              className={
                i <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
              }
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">(4.0)</span>
        </div>

        <div className="flex gap-3 mt-4">
          <Link
            to={`/shop/${shopData._id}`}
            className="flex-1 text-center py-2.5 rounded-md border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition-all"
          >
            Visit
          </Link>

          <Link
            to={`/customer/services/${shopData._id}`}
            className="flex-1 text-center py-2.5 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
          >
            Services
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ShopDataCard;
