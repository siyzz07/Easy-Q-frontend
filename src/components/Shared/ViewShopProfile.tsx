import { type FC } from "react";
import { MapPin, Star, Mail, Clock, Phone, Share2, Heart, Edit3 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { IvendroFullData } from "../../Shared/types/Types";
import { convertRailwayTime } from "../../utils/convertRailwayTime";
import { favoriteUpdate, getFavorite } from "../../Services/ApiService/CustomerApiService";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { GoogleMapDirection } from "../../utils/GoogleMapDirection";

interface ViewShopProfileProps {
  data: IvendroFullData;
  isOwner?: boolean;
  onEdit?: () => void;
}

const ViewShopProfile: FC<ViewShopProfileProps> = ({ data, isOwner, onEdit }) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);


    console.log('data :>> ', data);


  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!data._id) return;
      try {
        const response = await getFavorite();
        if (response?.data?.data?.vendors) {
          setIsFavorite(response.data.data.vendors.includes(data._id));
        }
      } catch (error) {
        console.error("Error fetching favorite status", error);
      }
    };
    if (!isOwner) fetchFavoriteStatus();
  }, [data._id, isOwner]);

  const handleFavoriteToggle = async () => {
    if (!data._id) return;
    try {
      const action = isFavorite ? "remove" : "add";
      await favoriteUpdate(data._id, action);
      setIsFavorite(!isFavorite);
      // toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
    } catch (error) {
      toast.error("Failed to update favorites");
    }
  };

  const isTodayWorking = (workingDaysStr?: string[]) => {
    if (!workingDaysStr) return false;
    const daysShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = daysShort[new Date().getDay()];
    return workingDaysStr.includes(today);
  };
  
  const isOpenToday = isTodayWorking(data.workingDays);

  return (
    <div className="w-full bg-background mb-6">
      {/* Hero Banner Area */}
      <div className={`relative h-48 md:h-64 w-full ${isOwner?"bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-80":"bg-gradient-to-r from-blue-600 to-purple-600"}  overflow-hidden rounded-b-3xl shadow-md`}>
        <div className="absolute inset-0 bg-black/10" />
        {/* Abstract shapes or pattern could go here */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl rounded-bl-none" />
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-10">
        <div className="glass-card rounded-2xl p-6 shadow-xl border border-white/20 backdrop-blur-xl bg-white/80 dark:bg-gray-900/80">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            
            {/* Avatar */}
            <div className="flex-shrink-0 relative">
              <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white shadow-lg rounded-full">
                <AvatarImage src={data.ProfileImage} className="object-cover" />
                <AvatarFallback className="text-2xl bg-primary/10 text-primary font-bold">
                  {data.shopName?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white ${isOpenToday ? "bg-green-500" : "bg-red-500"}`} title={isOpenToday ? "Open Today" : "Closed Today"} />
            </div>

            {/* Main Details */}
            <div className="flex-1 min-w-0 pt-2 w-full">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white truncate">
                    {data.shopName}
                  </h1>


                  <div 
                  
                   onClick={()=>GoogleMapDirection(data.location?.coordinates[1] as number,data.location?.coordinates[0] as number)}
                  className="flex items-center cursor-pointer gap-2 text-muted-foreground mt-1 text-sm md:text-base">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate">{data.city}, {data.state}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2">
                  {isOwner ? (
                     <Button 
                     onClick={onEdit} 
                     variant="outline" 
                     className="gap-2 border-primary text-primary hover:bg-primary/10"
                   >
                     <Edit3 size={18} /> Edit Profile
                   </Button>
                  ) : (
                    <>
                    {/* <Button
                        variant="ghost" 
                        size="icon"
                        className="rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition"
                      >
                       <Share2 size={20} className="text-gray-600 dark:text-gray-300" />
                      </Button> */}
                      <Button
                        onClick={handleFavoriteToggle}
                        variant="ghost" 
                        size="icon"
                        className={`rounded-full transition ${isFavorite ? "bg-red-50 text-red-500 hover:bg-red-100" : "bg-gray-100 text-gray-400 hover:bg-gray-200"}`}
                      >
                        <Heart size={20} className={isFavorite ? "fill-current" : ""} />
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Info Grid / Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                 {/* Rating */}
                 <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
                    <div className="p-2 bg-yellow-100 text-yellow-600 rounded-full">
                      <Star size={18} className="fill-current" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Rating</p>
                      <p className="text-sm font-semibold">4.8 <span className="text-xs font-normal text-muted-foreground">(127)</span></p>
                    </div>
                 </div>

                 {/* Phone */}
                 <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full">
                      <Phone size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-muted-foreground font-medium">Phone</p>
                      <p className="text-sm font-semibold truncate">{data.phone}</p>
                    </div>
                 </div>

                 {/* Email */}
                 <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-full">
                      <Mail size={18} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-muted-foreground font-medium">Email</p>
                      <p className="text-sm font-semibold truncate" title={data.email}>{data.email}</p>
                    </div>
                 </div>

                 {/* Hours */}
                 <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-gray-800">
                    <div className="p-2 bg-green-100 text-green-600 rounded-full">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium">Hours</p>
                      <p className="text-sm font-semibold">
                         {convertRailwayTime(data.openAt)} - {convertRailwayTime(data.closeAt)}
                      </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewShopProfile;
