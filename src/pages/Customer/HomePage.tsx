import React, { useEffect, useState } from "react";
import Filter from "../../components/Customer/Filter";
import { Search, MapPin, SlidersHorizontal } from "lucide-react";
import ShopDataCard from "../../components/Customer/ShopDataCard";
import { getShopsData, getShopDataWithPagination } from "../../Services/ApiService/CustomerApiService";
import Pagination from "../../components/Shared/Pagination";
import { motion } from "framer-motion";

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
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchShops();
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

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/50">
      
      {/* Search Header */}
      <section className="relative bg-white border-b border-border shadow-sm pt-8 pb-10 px-4">
         <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] pointer-events-none" />
         
         <div className="max-w-7xl mx-auto relative z-10 text-center space-y-4">
             <motion.h1 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900"
             >
                Find the Best Services Near You
             </motion.h1>
             <p className="text-muted-foreground max-w-xl mx-auto">
               Search for salons, clinics, and more. Book instanly and skip the wait.
             </p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mt-6 mx-auto glass shadow-xl rounded-2xl p-2 max-w-4xl flex flex-col md:flex-row gap-2 items-center"
            >
              <div className="relative flex-1 w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  onChange={(e) => setSearchChange(e.target.value)}
                  className="w-full h-12 rounded-xl bg-transparent pl-12 pr-4 text-sm font-medium outline-none placeholder:text-gray-400 focus:bg-white/50 transition-all"
                />
              </div>

              <div className="hidden md:block h-8 w-px bg-gray-200" />

              <div className="relative flex-1 w-full group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                <input
                  type="text"
                  placeholder="Location (e.g. New York)"
                  onChange={(e) => setLocationChange(e.target.value)}
                  className="w-full h-12 rounded-xl bg-transparent pl-12 pr-4 text-sm font-medium outline-none placeholder:text-gray-400 focus:bg-white/50 transition-all"
                />
              </div>

              <button
                disabled={!locationChange && !searchChange}
                onClick={() => {
                  setPage(1);
                  setLocation(locationChange);
                  setSearch(searchChange);
                }}
                className="w-full md:w-auto px-8 h-12 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Search
              </button>
            </motion.div>
         </div>
      </section>

      {/* Main Content Area */}
      <section className="mt-8 max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <button 
             onClick={() => setShowFilters(!showFilters)}
             className="lg:hidden flex items-center gap-2 font-semibold text-gray-700 bg-white p-3 rounded-xl border border-border shadow-sm"
          >
             <SlidersHorizontal size={18} /> Filters
          </button>

          {/* Sidebar Filters */}
          <motion.aside 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             className={`lg:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
             <div className="sticky top-24">
               <Filter />
             </div>
          </motion.aside>

          {/* Shop Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 animate-pulse">
                <div className="h-12 w-12 rounded-full bg-gray-200 mb-4" />
                <span className="text-xl font-medium text-gray-600">Loading shops...</span>
              </div>
            ) : shops.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white rounded-2xl border border-dashed border-gray-300">
                <Search className="w-16 h-16 mb-4 text-gray-300" />
                <h3 className="text-xl font-bold text-gray-900">No shops found</h3>
                <p className="text-sm text-gray-400 max-w-xs text-center mt-2">
                  We couldn't find any services matching your search. Try adjusting your filters.
                </p>
                <button 
                   onClick={() => {setSearch(""); setLocation("");}} 
                   className="mt-6 text-primary font-semibold hover:underline"
                >
                   Clear all filters
                </button>
              </div>
            ) : (

              <motion.div 
                 initial="hidden"
                 animate="visible"
                 variants={{
                   hidden: { opacity: 0 },
                   visible: { 
                     opacity: 1,
                     transition: { staggerChildren: 0.1 } 
                   }
                 }}
                 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {shops.map((shop) => (
                  <ShopDataCard key={shop.email} shopData={shop} />
                ))}
              </motion.div>
            )}
            
            <div className="mt-10 mb-20">
              <Pagination page={page} totalPages={90} onPageChange={setPage} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
