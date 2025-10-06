import React from "react";
import Filter from "../../components/Customer/Filter";
import { Search, MapPin } from "lucide-react";
import ShopDataCard from "../../components/Customer/ShopDataCard";


const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#f0fcff] py-6 px-4 md:px-3 lg:px-3">
      {/* Top Search Bar */}
      <section className="rounded-xl bg-white p-6 shadow-lg max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Service Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="What service"
              className="w-full rounded-lg border border-gray-300 bg-white px-10 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* Location Input */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Location"
              className="w-full rounded-lg border border-gray-300 bg-white px-10 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full md:w-auto rounded-lg bg-blue-600 hover:bg-blue-700 px-6 py-2 text-sm font-medium text-white shadow   transition"
          >
            Search
          </button>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="mt-8 max-w-7xl mx-auto grid grid-cols-1 gap-6 md:grid-cols-[260px_1fr]">
        {/* Sidebar / Filter */}
        <aside className="order-2 md:order-1">
          <Filter />
        </aside>

        {/* Service Listings */}
        <div className="order-1 md:order-2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* <div className="rounded-lg bg-white p-4 shadow hover:shadow-lg transition">
              <div className="h-40 bg-gray-200 rounded-md mb-3" />
              <h3 className="font-semibold text-gray-900">Service Name</h3>
              <p className="text-sm text-gray-500 mt-1">Short description of the service.</p>
            </div>

            <div className="rounded-lg bg-white p-4 shadow hover:shadow-lg transition">
              <div className="h-40 bg-gray-200 rounded-md mb-3" />
              <h3 className="font-semibold text-gray-900">Service Name</h3>
              <p className="text-sm text-gray-500 mt-1">Short description of the service.</p>
            </div>

            <div className="rounded-lg bg-white p-4 shadow hover:shadow-lg transition">
              <div className="h-40 bg-gray-200 rounded-md mb-3" />
              <h3 className="font-semibold text-gray-900">Service Name</h3>
              <p className="text-sm text-gray-500 mt-1">Short description of the service.</p>
            </div> */}

            {/* You can map real services here */}
            {/* {services.map((s) => (
              <ServiceCard key={s.id} service={s} />

            ))} */}

            <ShopDataCard/>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
