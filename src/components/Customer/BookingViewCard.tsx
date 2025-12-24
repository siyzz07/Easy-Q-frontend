"use client"

import { Card, CardContent } from "../ui/card"
import { MoreVertical, Calendar, Clock, MapPinned } from "lucide-react"
import { Button } from "../ui/button"
import { motion } from "framer-motion"

interface Booking {
  id: number
  title: string
  location: string
  date: string
  time: string
  facility: string
  status: string
  statusColor: string
  bgColor: string
  icon: string
}

export default function BookingViewCard({ booking }: { booking: Booking }) {
  const iconColors: Record<string, string> = {
    K: "text-primary",
    M: "text-emerald-500",
    N: "text-violet-500",
    D: "text-rose-500",
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-amber-100/50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200/50'
      case 'booked': 
      case 'checked-in': return 'bg-indigo-100/50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 border-indigo-200/50'
      case 'completed': return 'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border-emerald-200/50'
      case 'cancelled': return 'bg-rose-100/50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border-rose-200/50'
      default: return 'bg-gray-100/50 text-gray-600 dark:bg-gray-500/10 dark:text-gray-400 border-gray-200/50'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Card className="w-full glass-card hover:shadow-xl transition-all duration-300 border-white/20 overflow-hidden group">
        <CardContent className="p-0 flex flex-col sm:flex-row items-stretch sm:items-center">
          
          {/* Accent Border or Indicator */}
          <div className={`w-1 sm:h-24 ${booking.bgColor.replace('/10', '')} opacity-60 self-stretch`} />

          <div className="p-3 sm:p-4 flex flex-1 items-center gap-3 sm:gap-4 overflow-hidden">
            {/* Icon Container */}
            <div
              className={`${booking.bgColor} w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300`}
            >
              <span className={`text-base sm:text-2xl font-bold ${iconColors[booking.icon] || 'text-primary'}`}>
                {booking.icon}
              </span>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                <h3 className="font-bold text-sm sm:text-base text-foreground tracking-tight group-hover:text-primary transition-colors duration-300 truncate">
                  {booking.title}
                </h3>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground mb-2 sm:mb-3">
                <MapPinned className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary/70 shrink-0" />
                <span className="truncate">{booking.location}</span>
                <span className="text-border mx-0.5 sm:mx-1">•</span>
                <span className="truncate opacity-80">{booking.facility}</span>
              </div>

              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-2 sm:gap-x-4 text-[10px] sm:text-xs text-muted-foreground/90">
                <div className="flex items-center gap-1.5 bg-secondary/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                  <Calendar className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-primary" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-secondary/50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md">
                  <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-primary" />
                  <span>{booking.time}</span>
                </div>
              </div>
            </div>

            {/* Status and Actions Container */}
            <div className="flex flex-col items-end gap-2 sm:gap-3 pr-1 sm:pr-2 shrink-0">
              <span
                className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[8px] sm:text-[10px] uppercase tracking-wider font-bold border ${getStatusColor(booking.status)} shadow-sm whitespace-nowrap`}
              >
                {booking.status}
              </span>

              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 sm:h-8 sm:w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <MoreVertical className="w-3.5 h-3.5 sm:w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
