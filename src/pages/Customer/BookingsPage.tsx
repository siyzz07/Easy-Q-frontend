import React, { useState, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import BookingViewCard from '../../components/Customer/BookingViewCard'
import { Search, Filter, Calendar as CalendarIcon } from 'lucide-react'
import { Input } from '../../components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'

const bookings = [
  {
    id: 1,
    title: 'Hair Cutting & Styling',
    location: 'Elite Salon & Spa',
    date: 'Dec 15, 2024',
    time: '3:30 PM',
    facility: 'Overneath Plaza',
    status: 'Pending',
    statusColor: 'bg-yellow-100 text-yellow-700',
    bgColor: 'bg-blue-100/10',
    icon: 'K',
  },
  {
    id: 2,
    title: 'Deep Tissue Massage',
    location: 'Wellness Center Pro',
    date: 'Dec 16, 2024',
    time: '11:00 AM',
    facility: 'Health District',
    status: 'Booked',
    statusColor: 'bg-blue-100 text-blue-700',
    bgColor: 'bg-emerald-100/10',
    icon: 'M',
  },
  {
    id: 3,
    title: 'Manicure & Pedicure',
    location: 'Beauty Lounge',
    date: 'Dec 14, 2024',
    time: '4:00 PM',
    facility: 'Nail Central',
    status: 'Checked-in',
    statusColor: 'bg-blue-100 text-blue-700',
    bgColor: 'bg-violet-100/10',
    icon: 'N',
  },
  {
    id: 4,
    title: 'Dental Cleaning',
    location: 'Smile Dental Clinic',
    date: 'Dec 13, 2024',
    time: '9:30 AM',
    facility: 'Medical Center',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    bgColor: 'bg-rose-100/10',
    icon: 'D',
  },
  {
    id: 5,
    title: 'Hair Cutting & Styling',
    location: 'Elite Salon & Spa',
    date: 'Dec 15, 2024',
    time: '2:30 PM',
    facility: 'Overneath Plaza',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    bgColor: 'bg-blue-100/10',
    icon: 'K',
  },
  {
    id: 6,
    title: 'Deep Tissue Massage',
    location: 'Wellness Center Pro',
    date: 'Dec 12, 2024',
    time: '11:00 AM',
    facility: 'Health District',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    bgColor: 'bg-emerald-100/10',
    icon: 'M',
  },
  {
    id: 7,
    title: 'Manicure & Pedicure',
    location: 'Beauty Lounge',
    date: 'Dec 11, 2024',
    time: '4:00 PM',
    facility: 'Nail Central',
    status: 'Checked-in',
    statusColor: 'bg-blue-100 text-blue-700',
    bgColor: 'bg-violet-100/10',
    icon: 'N',
  },
  {
    id: 8,
    title: 'Dental Cleaning',
    location: 'Smile Dental Clinic',
    date: 'Dec 10, 2024',
    time: '9:30 AM',
    facility: 'Medical Center',
    status: 'Completed',
    statusColor: 'bg-green-100 text-green-700',
    bgColor: 'bg-rose-100/10',
    icon: 'D',
  },
]

const BookingsPage = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesTab = 
        activeTab === 'all' || 
        (activeTab === 'complete' && booking.status.toLowerCase() === 'completed') ||
        booking.status.toLowerCase() === activeTab.toLowerCase()
      
      const matchesSearch = 
        booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchQuery.toLowerCase())
      
      return matchesTab && matchesSearch
    })
  }, [activeTab, searchQuery])

  return (
    <div className="min-h-full space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between px-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">My Bookings</h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1 font-medium">Manage and track your service appointments.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search bookings..."
              className="pl-9 h-9 sm:h-10 bg-card border-none shadow-sm focus-visible:ring-1 focus-visible:ring-primary text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl sm:rounded-3xl p-1 md:p-2 border-white/20 overflow-hidden">
        <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full">
          <div className="px-3 sm:px-4 pt-3 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="overflow-x-auto scrollbar-hide -mx-3 px-3 sm:mx-0 sm:px-0">
              <TabsList className="bg-secondary/50 p-1 rounded-xl sm:rounded-2xl border border-white/10 w-fit flex-nowrap whitespace-nowrap">
                <TabsTrigger
                  value="all"
                  className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="pending"
                  className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger
                  value="complete"
                  className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Completed
                </TabsTrigger>
                <TabsTrigger
                  value="cancelled"
                  className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm"
                >
                  Cancelled
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] sm:text-sm font-medium text-muted-foreground bg-secondary/30 px-3 py-1.5 rounded-full w-fit">
              <Filter className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span>{filteredBookings.length} results</span>
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-4 sm:mt-6 px-3 sm:px-4 pb-3 sm:pb-4 focus-visible:outline-none">
            <div className="grid gap-3 sm:gap-4">
              <AnimatePresence mode="popLayout">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <BookingViewCard key={booking.id} booking={booking} />
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-4"
                  >
                    <div className="w-20 h-20 bg-secondary/50 rounded-full flex items-center justify-center">
                      <CalendarIcon className="w-10 h-10 text-muted-foreground/50" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">No bookings found</h3>
                      <p className="text-muted-foreground max-w-xs mx-auto">
                        {searchQuery ? `No results for "${searchQuery}" in this category.` : "You don't have any bookings in this category yet."}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default BookingsPage
