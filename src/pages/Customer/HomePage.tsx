import React, { useEffect, useState } from "react";
import Filter from "../../components/Customer/Filter";
import { Search, MapPin, SlidersHorizontal, X, Info } from "lucide-react";
import ShopDataCard from "../../components/Customer/ShopDataCard";
import { getShopsData } from "../../Services/ApiService/CustomerApiService";
import Pagination from "../../components/Shared/Pagination";
import { motion, AnimatePresence } from "framer-motion";
import LocationAutoSuggest from "../../components/Shared/LocationAutoSuggest";

const geocodePlace = async (place: string) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
  );
  const data = await res.json();
  if (!data || data.length === 0) throw new Error("Location not found");
  return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
};

const HomePage = () => {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [searchChange, setSearchChange] = useState("");
  const [locationChange, setLocationChange] = useState("");

  const [search, setSearch] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);

  const [locationError, setLocationError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<string[]>([]);

  useEffect(() => {
    fetchShops();
  }, [page]);

  const fetchShops = async (
    overrideSearch?: string,
    overrideLat?: number | null,
    overrideLng?: number | null,
    overrideCategories?:string[]|null,
    overrideRatings?:string[]|null
  ) => {
    try {
      setLoading(true);

      const currentSearch = overrideSearch !== undefined ? overrideSearch : search;
      const currentLat = overrideLat !== undefined ? overrideLat : lat;
      const currentLng = overrideLng !== undefined ? overrideLng : lng;

      const currentCategories =
      overrideCategories !== undefined ? overrideCategories : categoryFilter;

    const currentRatings =
      overrideRatings !== undefined ? overrideRatings : ratingFilter;




      const response = await getShopsData({
        search: currentSearch,
        page,
        limit,
        lat: currentLat,
        lng: currentLng,
        distance: currentLat && currentLng ? 100000 : undefined,
        categories:currentCategories,
        ratings:currentRatings
      });

      setShops(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (err) {
      console.error("Fetch error:", err);
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  const addFilter = async (data: { categories: string[]; ratings: string[] }) => {
    let rating = await data.ratings.map((data) => data.split("")[0]);

    setCategoryFilter(data.categories)
    setRatingFilter(rating);

    setPage(1)

    fetchShops(search,lat,lng,data.categories,rating)
  };

  const handleSearch = async () => {
    try {
      setLocationError(null);
      let newLat = lat;
      let newLng = lng;

      if (locationChange.trim() && !lat) {
        try {
          const coords = await geocodePlace(locationChange);
          newLat = coords.lat;
          newLng = coords.lng;
          setLat(newLat);
          setLng(newLng);
        } catch (error) {
          setLocationError(
            "Location not found. Showing results without location filter."
          );
          newLat = null;
          newLng = null;
          setLat(null);
          setLng(null);
        }
      } else if (!locationChange.trim()) {
        newLat = null;
        newLng = null;
        setLat(null);
        setLng(null);
      }

      setSearch(searchChange);
      setPage(1);

      fetchShops(searchChange, newLat, newLng);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSearchChange("");
    setLocationChange("");
    setLocationError(null);
    setLat(null);
    setLng(null);
    setPage(1);
    fetchShops("", null, null,[],[]);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <section className="relative z-40 bg-white pt-12 pb-16 px-4 overflow-visible">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-indigo-50 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-extrabold text-gray-900"
          >
            Find the Best Services Near You
          </motion.h1>

          <p className="text-gray-500 mt-2 max-w-xl mx-auto">
            Search for salons, clinics, and more. Book instantly and skip the
            wait.
          </p>

          <div className="mt-10 mx-auto max-w-4xl relative z-50">
            <div className="bg-white p-2 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 flex flex-col md:flex-row items-stretch gap-2 transition-all focus-within:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
              {/* SERVICE SEARCH */}
              <div className="relative flex-[1.5] group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="What service are you looking for?"
                  value={searchChange}
                  onChange={(e) => setSearchChange(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="w-full h-14 pl-12 pr-4 rounded-xl bg-gray-50 md:bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
                />
              </div>

              <div className="hidden md:block w-px bg-gray-100 my-3" />

              {/* LOCATION SEARCH */}
              <div className="relative flex-1 group z-50">
                <MapPin
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors z-10 ${
                    lat ? "text-primary" : "text-gray-400"
                  }`}
                  size={20}
                />
                <LocationAutoSuggest
                  value={locationChange}
                  error={locationError}
                  onChange={(val: any) => {
                    setLocationChange(val);
                    setLat(null);
                    setLng(null);
                    if (locationError) setLocationError(null);
                  }}
                  onSelect={({ name, lat, lng }: any) => {
                    setLocationChange(name);
                    setLat(lat);
                    setLng(lng);
                    setLocationError(null);
                  }}
                />

                <AnimatePresence>
                  {locationError && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="absolute left-0 -bottom-14 w-full bg-red-50 text-red-600 p-2 rounded-lg text-xs flex items-start gap-2 border border-red-100 shadow-lg z-[60]"
                    >
                      <Info size={14} className="mt-0.5 shrink-0" />
                      {locationError}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SEARCH ACTION */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSearch}
                className="px-8 h-14 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Searching..." : "Search Now"}
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-72 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 font-medium text-gray-700 shadow-sm"
                >
                  <SlidersHorizontal size={18} />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>

              <div className={`${showFilters ? "block" : "hidden lg:block"}`}>
                <Filter onApplyFilters={addFilter} />
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-80 bg-gray-200 animate-pulse rounded-2xl"
                  />
                ))}
              </div>
            ) : shops.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center bg-white rounded-3xl border border-dashed border-gray-300"
              >
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  No matches found
                </h3>
                <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                  Try clicking search or adjusting your query.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-6 text-primary font-bold hover:text-primary/80 transition-colors"
                >
                  Clear all search filters
                </button>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {shops.map((shop) => (
                  <motion.div layout key={shop._id}>
                    <ShopDataCard shopData={shop} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center pb-20">
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
