"use client"

import { Card, CardContent } from "../ui/card"
import { MoreVertical } from "lucide-react"
import { Button } from "../ui/button"

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
    K: "text-blue-600",
    M: "text-green-600",
    N: "text-purple-600",
    D: "text-red-600",
  }

  return (
    <Card className="w-full hover:shadow-md transition-shadow cursor-pointer">
      <CardContent className="p-4 flex items-center gap-4">
        
        {/* Icon */}
        <div
          className={`${booking.bgColor} w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}
        >
          <span className={`text-lg font-bold ${iconColors[booking.icon]}`}>
            {booking.icon}
          </span>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground truncate">
            {booking.title}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {booking.location}
          </p>

          <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
            <span>{booking.date}</span>
            <span className="text-border">•</span>
            <span>{booking.time}</span>
            <span className="text-border">•</span>
            <span>{booking.facility}</span>
          </div>
        </div>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium flex-shrink-0 ${booking.statusColor}`}
        >
          {booking.status}
        </span>

        {/* Action Menu */}
        <Button
          variant="ghost"
          size="icon"
          className="flex-shrink-0"
        >
          <MoreVertical className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}
