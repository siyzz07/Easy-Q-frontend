import React, { useEffect, useState } from "react";
import Filter from "../../components/Customer/Filter";
import { Search, MapPin } from "lucide-react";
import ShopDataCard from "../../components/Customer/ShopDataCard";
import { getShopData as fetchShopDataApi } from "../../Services/VendorApiServices";
import {
  getShopDataWithPagination,
  getShopsData,
} from "../../Services/CustomerApiService";
import Pagination from "../../components/Shared/Pagination";

const HomePage = () => {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  const [searchChange, setSearchChange] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [locationChange, setLocationChange] = useState<string>("");
  const [location, setLocation] = useState<string>("");


  console.log("---",search,location);
  

  useEffect(() => {
    fetchShops();
    // fetchShopsWithPagination();
  }, [page, search, location]);

  const fetchShops = async () => {
    try {
      const response = await getShopsData();

      setShops(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchShopsWithPagination = async () => {
    try {
      const response = await getShopDataWithPagination(
        page,
        limit,
        search,
        location
      );

      setShops(response.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#d3e2f6]  ">
      {/* Top Search Bar */}
      <section className="bg-white shadow   justify-center shadow-gray-200 p-5 max-w-8xl mx-auto flex flex-col md:flex-row gap-5 items-center">
        <div className="relative w-full md:w-1/3">
          <Search
            className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <input
            type="text"
            placeholder="What service"
            onChange={(e) => setSearchChange(e.target.value)}
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
            onChange={(e) => setLocationChange(e.target.value)}
            type="text"
            placeholder="Location"
            className="w-full rounded border-2 border-gray-300 px-8 py-2 text-sm 
                 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition"
          />
        </div>

        <button
          disabled={locationChange == "" || searchChange == ""}
          onClick={() => {
            setPage(1);
            setLocation(locationChange);
            setSearch(searchChange);
          }}
          className="rounded bg-blue-600 text-white px-4 py-1 text-sm hover:bg-blue-700 transition"
        >
          Search
        </button>
      </section>

      {/* Main Content Area */}
      <section className="mt-6 max-w-8xl mx-auto grid md:grid-cols-[260px_1fr] gap-4 px-4">
        <aside>
          <Filter />
        </aside>

        <div>
          {loading ? (
            <p>Loading shops...</p>
          ) : shops.length === 0 ? (
            <p>No shops found</p>
          ) : (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {shops.map((shop) => (
                <ShopDataCard key={shop.email} shopData={shop} />
              ))}
            </div>
              </>
          )}
          <Pagination page={page} totalPages={90} onPageChange={setPage} />
        </div>
      </section>
    </main>
  );
};

export default HomePage;
