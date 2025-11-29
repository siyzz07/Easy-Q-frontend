import { MapPin, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import ShopDataCard from "../../components/Customer/ShopDataCard";
import { getFavoriteShopes } from "../../Services/CustomerApiService";

const FavoritePage = () => {
  const [loading, setLoading] = useState(true);
  const [shops, setShops] = useState<any[]>([]);

  useEffect(() => {
    favoriteShopes();
  }, []);

  const favoriteShopes = async () => {
    try {
      let response = await getFavoriteShopes();
      if (response?.data.data) {
        setShops(response.data.data);
      }
    } catch (error: unknown) {
      console.log("error to fetch favorite shop data", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(shops.length);

  return (
    <main className="min-h-screen bg-[#EFF6FF]  ">
      {/* Top Search Bar */}
      <section className="bg-white shadow rounded-xl justify-center shadow-gray-200 p-5 max-w-8xl mx-auto flex flex-col md:flex-row gap-5 items-center">
        <div className="relative w-full md:w-1/3">
          <Search
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="What service"
            className="w-full rounded border-2 border-gray-300 px-8 py-2 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
          />
        </div>

        <div className="relative w-full md:w-1/3">
          <MapPin
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full rounded border-2 border-gray-300 px-8 py-2 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
          />
        </div>

        <button className="rounded bg-blue-600 text-white px-4 py-1 text-sm hover:bg-blue-700 transition">
          Search
        </button>
      </section>

      {/* Main Content Area */}

      <div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-600 animate-pulse">
            <span className="text-xl font-medium">Loading shops...</span>
            <span className="text-sm">Please wait</span>
          </div>
        ) : shops.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <svg
              className="w-16 h-16 mb-3 opacity-70"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3l18 18M4 4h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4z"
              />
            </svg>
            <p className="text-lg font-semibold">No shops found</p>
            <p className="text-sm text-gray-400">Your favorite list is empty</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:p-9 gap-4">
            {shops.map((shop) => (
              <ShopDataCard key={shop.email} shopData={shop} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoritePage;
