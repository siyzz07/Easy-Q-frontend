import { Card, CardContent } from "../ui/card";
import {
  MoreVertical,
  Calendar,
  Clock,
  MapPinned,
  ChevronRight,
  Star,
  Clock4,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Map,
  MapPin,
} from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import type { BookingCardDTO } from "../../pages/Customer/BookingsPage";

interface Booking {
  id: number;
  title: string;
  location: string;
  date: string;
  time: string;
  facility: string;
  status: string;
  statusColor: string;
  bgColor: string;
  icon: string;
}

export default function BookingViewCard({
  booking,
}: {
  booking: BookingCardDTO;
}) {
  console.log("----------------------------", booking);

  const iconColors: Record<string, string> = {
    K: "text-blue-500",
    M: "text-emerald-500",
    N: "text-violet-500",
    D: "text-rose-500",
  };

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return {
          color: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <Clock4 size={12} className="mr-1" />,
          theme: "amber",
        };
      case "booked":
      case "checked-in":
        return {
          color: "bg-indigo-50 text-indigo-700 border-indigo-200",
          icon: <CheckCircle2 size={12} className="mr-1" />,
          theme: "indigo",
        };
      case "completed":
        return {
          color: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <CheckCircle2 size={12} className="mr-1" />,
          theme: "emerald",
        };
      case "cancelled":
        return {
          color: "bg-rose-50 text-rose-700 border-rose-200",
          icon: <XCircle size={12} className="mr-1" />,
          theme: "rose",
        };
      default:
        return {
          color: "bg-slate-50 text-slate-700 border-slate-200",
          icon: <AlertCircle size={12} className="mr-1" />,
          theme: "slate",
        };
    }
  };

  const statusConfig = getStatusConfig(booking.status);

  return (
    <div className="w-full">
      <Link to={`/customer/bookings/${booking.id}`} className="block group">
        <Card className="w-full bg-white hover:bg-slate-50 shadow-sm hover:shadow-2xl transition-all duration-500 border-slate-200 overflow-hidden relative rounded-[2.5rem]">
          {/* Status Gradient Overlay */}
          <div
            className={`absolute top-0 right-0 w-32 h-32 bg-${statusConfig.theme}-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-700`}
          />

          <CardContent className="p-0 flex items-stretch">
            {/* Minimalist Status Bar */}
            <div
              className={`w-2 ${statusConfig.color
                .split(" ")[1]
                .replace(
                  "text-",
                  "bg-"
                )} opacity-60 transition-all duration-300 group-hover:w-3`}
            />

            <div className="p-5 sm:p-7 flex flex-1 flex-col sm:flex-row items-start sm:items-center gap-6 relative z-10">
              {/* Profile/Icon Section */}
              <div className="flex items-center gap-5 shrink-0">
                <div
                  className={`${booking.bgColor} w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:rotate-6 transition-transform duration-500 relative border border-white`}
                >
                  <span className="h-10 w-10 sm:h-14 sm:w-14 flex items-center justify-center rounded-xl overflow-hidden">
                    <img
                      src={booking.image}
                      alt={booking.title}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  {/* Small Activity Dot */}
                  <div
                    className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${statusConfig.color
                      .split(" ")[1]
                      .replace("text-", "bg-")} shadow-sm`}
                  />
                </div>
              </div>

              {/* Info Content Section */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="font-black text-lg sm:text-2xl text-slate-800 tracking-tight group-hover:text-primary transition-colors duration-300 truncate">
                    {booking.title}
                  </h3>
                  <Badge
                    variant="outline"
                    className={`${statusConfig.color} border font-black text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full`}
                  >
                    {statusConfig.icon}
                    {booking.status}
                  </Badge>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                    <MapPinned className="w-4 h-4 text-primary opacity-60" />
                    <span className="truncate group-hover:text-slate-800 transition-colors uppercase tracking-tight">
                      {booking.location}
                    </span>
                  </div>
                  <div className="hidden sm:block h-1.5 w-1.5 rounded-full bg-slate-200" />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-2xl text-[10px] sm:text-xs font-black text-slate-600 group-hover:bg-white transition-colors">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    <span className="uppercase tracking-tighter">
                      {booking.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-2xl text-[10px] sm:text-xs font-black text-slate-600 group-hover:bg-white transition-colors">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span className="uppercase tracking-tighter">
                      {booking.time}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action/Chevron Section */}
              <div className="flex items-center gap-4 shrink-0 sm:ml-4 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                <div className="hidden sm:flex flex-col items-end mr-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                    Total Amount
                  </p>
                  <p className="text-xl font-black text-slate-800 tracking-tight leading-none">
                    {booking.amount}
                  </p>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto">
                  <div className="flex sm:hidden flex-col">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                      Total Amount
                    </p>
                    <p className="text-lg font-black text-slate-800 tracking-tight leading-none">
                      {booking.amount}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-2xl hover:bg-slate-200 transition-colors hidden md:flex"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <MapPin size={19} />{" "}
                      {/* <MoreVertical className="w-5 h-5 text-slate-400" /> */}
                    </Button>
                    <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all  shadow-sm group-hover:shadow-lg group-hover:shadow-primary/30">
                      <ChevronRight size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
