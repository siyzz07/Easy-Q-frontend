import React, { useState } from 'react'
import { Tabs, TabsContent } from '../../components/ui/tabs'
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import BookingViewCard from '../../components/Customer/BookingViewCard'




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
    bgColor: 'bg-blue-100',
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
    bgColor: 'bg-green-100',
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
    bgColor: 'bg-purple-100',
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
    bgColor: 'bg-red-100',
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
    bgColor: 'bg-blue-100',
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
    bgColor: 'bg-green-100',
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
    bgColor: 'bg-purple-100',
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
    bgColor: 'bg-red-100',
    icon: 'D',
  },
]


const BookingsPage = () => {


  const [activeTab, setActiveTab] = useState('all')

 const filteredBookings = bookings.filter((booking) => {
    if (activeTab === 'all') return true
    return booking.status.toLowerCase() === activeTab.toLowerCase()
  })


  return (
     <div className="rounded-lg border border-gray-400 bg-card p-4 shadow-sm md:p-6">
  <h2 className="mb-4 font-bold text-xl">Bookings</h2>
<div >
  <Tabs defaultValue="all" onValueChange={setActiveTab} className="space-y-4  rounded-xl ">
  <TabsList className=" w-fit flex items-center bg-gray-400 justify-start gap-2 p-1 rounded-lg ">
    <TabsTrigger
      value="all"
      className="px-4 py-2 rounded-md text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary"
    >
      All
    </TabsTrigger>

    <TabsTrigger
      value="pending"
      className="px-4 py-2 rounded-md text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
    >
      Pending
    </TabsTrigger>

    <TabsTrigger
      value="complete"
      className="px-4 py-2 rounded-md text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
    >
      Complete
    </TabsTrigger>
     <TabsTrigger
      value="cancelled"
      className="px-4 py-2 rounded-md text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-primary"
    >
      cancelled
    </TabsTrigger>
  </TabsList>




  <div className="space-y-3">
        {filteredBookings.map((booking) => (
          <BookingViewCard key={booking.id} booking={booking} />
        ))}
      </div>

  {/* same content */}
</Tabs>
</div>
</div>
  )
}

export default BookingsPage