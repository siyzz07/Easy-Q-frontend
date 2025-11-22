import React from 'react'
import { Tabs, TabsContent } from '../../components/ui/tabs'
import { TabsList, TabsTrigger } from '@radix-ui/react-tabs'

const BookingsPage = () => {
  return (
     <div className="rounded-lg border border-gray-400 bg-card p-4 shadow-sm md:p-6">
  <h2 className="mb-4 font-bold text-xl">Bookings</h2>
<div >
  <Tabs defaultValue="all" className="space-y-4  rounded-xl ">
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

  {/* same content */}
</Tabs>
</div>
</div>
  )
}

export default BookingsPage