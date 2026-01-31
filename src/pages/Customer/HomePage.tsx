import React, { useEffect, useState } from "react";
import Filter from "../../components/Customer/Filter";
import { Search, MapPin, SlidersHorizontal, Navigation, Store, Info, Loader2 } from "lucide-react";
import ShopDataCard from "../../components/Customer/ShopDataCard";
import { getShopsData } from "../../Services/ApiService/CustomerApiService";
import Pagination from "../../components/Shared/Pagination";
import { motion, AnimatePresence } from "framer-motion";
import LocationAutoSuggest from "../../components/Shared/LocationAutoSuggest";

const HomePage = () => {
  const [shops, setShops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(1);

  
  const [searchChange, setSearchChange] = useState("");
  const [locationChange, setLocationChange] = useState("");

  
  const [search, setSearch] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  
  
  const [autoDetectedName, setAutoDetectedName] = useState<string>("");
  const [displayLocationName, setDisplayLocationName] = useState<string>("your area");

  const [locationError, setLocationError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [ratingFilter, setRatingFilter] = useState<string[]>([]);

 
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const uLat = position.coords.latitude;
          const uLng = position.coords.longitude;
          
          setLat(uLat);
          setLng(uLng);

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${uLat}&lon=${uLng}&format=json&accept-language=en`
            );
            const data = await response.json();
            const cityName = data.address.city || data.address.town || data.address.village || "Current Location";
            
            setAutoDetectedName(cityName);
            setDisplayLocationName(cityName); 
            
          
            fetchShops("", uLat, uLng);
          } catch (err) {
            fetchShops("", uLat, uLng);
          }
        },
        () => {
          fetchShops();
        }
      );
    } else {
      fetchShops();
    }
  }, []);

  
  const fetchShops = async (
    overrideSearch?: string,
    overrideLat?: number | null,
    overrideLng?: number | null,
    overrideCategories?: string[] | null,
    overrideRatings?: string[] | null
  ) => {
    try {
      setLoading(true);
      const currentSearch = overrideSearch !== undefined ? overrideSearch : search;
      const currentLat = overrideLat !== undefined ? overrideLat : lat;
      const currentLng = overrideLng !== undefined ? overrideLng : lng;
      
      const res = await getShopsData({
        search: currentSearch,
        page,
        limit,
        lat: currentLat,
        lng: currentLng,
        distance: (currentLat || currentLng) ? 50000 : undefined, // 50km radius
        categories: overrideCategories !== undefined ? overrideCategories : categoryFilter,
        ratings: overrideRatings !== undefined ? overrideRatings : ratingFilter,
      });

      setShops(res.data.data || []);
      setTotalPages(res.data.pagination.totalPages || 1);
    } catch (err) {
      console.error("Fetch error:", err);
      setShops([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShops();
  }, [page]);


  const handleSearch = async () => {
    let finalLat = lat;
    let finalLng = lng;
    let finalDisplayName = displayLocationName;

  
    if (!locationChange.trim()) {
     
      if (lat && lng && autoDetectedName) {
        finalLat = lat;
        finalLng = lng;
        finalDisplayName = autoDetectedName;
      } else {
        finalLat = null;
        finalLng = null;
        finalDisplayName = "your area";
        setLat(null);
        setLng(null);
      }
    } 
    
    else if (locationChange.trim() && !lat) {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${locationChange}`);
        const data = await res.json();
        if (data.length > 0) {
          finalLat = Number(data[0].lat);
          finalLng = Number(data[0].lon);
          finalDisplayName = locationChange;
          setLat(finalLat);
          setLng(finalLng);
        }
      } catch (e) {
        setLocationError("Location not found");
        return;
      }
    } 
   
    else {
      finalDisplayName = locationChange;
    }

    setSearch(searchChange);
    setDisplayLocationName(finalDisplayName);
    setPage(1);
    fetchShops(searchChange, finalLat, finalLng);
  };

  const clearFilters = () => {
    setSearchChange("");
    setLocationChange("");
    setLat(null);
    setLng(null);
    setDisplayLocationName("your area");
    fetchShops("", null, null, [], []);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      {/* Search Header Section */}
      <section className="bg-white pt-16 pb-12 px-4 border-b border-slate-100">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight"
          >
            Find the Best Services Near You
          </motion.h1>
          <p className="text-slate-500 mb-10 text-lg">Book salons, clinics, and more in seconds.</p>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-2 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-slate-100 flex flex-col md:flex-row items-center gap-2">
              
              {/* SERVICE SEARCH */}
              <div className="relative flex-[1.5] w-full group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="What service are you looking for?"
                  value={searchChange}
                  onChange={(e) => setSearchChange(e.target.value)}
                  className="w-full h-14 pl-14 pr-4 rounded-2xl bg-slate-50 md:bg-transparent outline-none text-slate-700 font-medium placeholder:text-slate-400"
                />
              </div>

              <div className="hidden md:block w-px h-8 bg-slate-200" />

              {/* LOCATION SEARCH */}
              <div className="relative flex-1 w-full group">
                <MapPin className={`absolute left-5 top-1/2 -translate-y-1/2 z-10 transition-colors ${lat ? "text-blue-600" : "text-slate-400"}`} size={20} />
                <LocationAutoSuggest
                  value={locationChange}
                  onChange={(val: string) => { setLocationChange(val); setLat(null); setLng(null); }}
                  onSelect={({ name, lat, lng }: any) => { setLocationChange(name); setLat(lat); setLng(lng); }}
                />
              </div>

              <button
                onClick={handleSearch}
                className="w-full md:w-auto px-10 h-14 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-lg active:scale-95 shrink-0"
              >
                {loading ? <Loader2 className="animate-spin mx-auto" /> : "Search"}
              </button>
            </div>

            {/* LOCATION STATUS CHIP */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm">
              <Navigation size={14} className="text-blue-600" />
              <span className="text-sm font-bold text-slate-700">
                Shops near <span className="text-blue-600 capitalize">{displayLocationName}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Filter + Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar Filters */}
        <aside className="lg:w-64 shrink-0">
          <div className="sticky top-24">
            <Filter onApplyFilters={(d) => fetchShops(search, lat, lng, d.categories, d.ratings.map(r => r[0]))} />
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <div className="aspect-[4/3] bg-slate-200 animate-pulse rounded-[32px]" />
                    <div className="h-4 w-2/3 bg-slate-100 animate-pulse rounded-full" />
                    <div className="h-4 w-1/2 bg-slate-100 animate-pulse rounded-full" />
                  </div>
                ))}
              </motion.div>
            ) : shops.length === 0 ? (
              <motion.div 
                key="empty" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="py-32 text-center bg-white rounded-[40px] border-2 border-dashed border-slate-100"
              >
                <Store size={48} className="mx-auto text-slate-200 mb-4" />
                <h3 className="text-xl font-bold text-slate-900">No shops found</h3>
                <p className="text-slate-500 mt-1">Try adjusting your filters or location.</p>
                <button onClick={clearFilters} className="mt-6 text-blue-600 font-bold hover:underline text-sm">Clear all filters</button>
              </motion.div>
            ) : (
              <motion.div 
                key="grid" 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
              >
                {shops.map((shop) => (
                  <ShopDataCard key={shop._id} shopData={shop} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center pb-20">
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default HomePage;