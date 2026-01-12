import React, { useState, useMemo, useEffect } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, Search, RotateCcw } from "lucide-react";
import type { IServiceVendorTypes } from "../../Shared/types/Types";
import { getServiceTypes } from "../../Services/ApiService/AdminApiService";

interface FilterProps {
  onApplyFilters: (filters: { categories: string[]; ratings: string[] }) => void;
}

const Filter: React.FC<FilterProps> = ({ onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [allCategories, setAllCategories] = useState<IServiceVendorTypes[]>([]);
  
  // State for selected items
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);

  useEffect(() => {
    fetchSerivceTypes();
  }, []);

  const fetchSerivceTypes = async () => {
    try {
      const response = await getServiceTypes();
      if (response?.data?.data) {
        const activeData = response.data.data.filter(
          (list: IServiceVendorTypes) => String(list.isActive) === "true"
        );
        setAllCategories(activeData);
      }
    } catch (error) {
      console.error("Failed to fetch service types", error);
    }
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };


  const handleRatingChange = (rating: string) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedRatings([]);
    onApplyFilters({ categories: [], ratings: [] });
  };

  const filteredCategories = useMemo(() => {
    return allCategories.filter((cat) =>
      cat.serviceName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, allCategories]);

  const displayedCategories = showAll ? filteredCategories : filteredCategories.slice(0, 5);

  return (
    <div className="w-full md:w-64">
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-full flex items-center justify-between rounded-xl bg-blue-600 text-white px-4 py-3 text-sm font-bold shadow-lg"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={18} />
          Filters {(selectedCategories.length > 0 || selectedRatings.length > 0) && `(${selectedCategories.length + selectedRatings.length})`}
        </span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <div className={`${open ? "block" : "hidden"} md:block mt-3 md:mt-0 rounded-2xl bg-white p-5 shadow-sm border border-gray-100 sticky top-24`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-bold text-gray-800">Filters</h3>
          <button 
            onClick={resetFilters}
            className="text-xs text-gray-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>

        <div className="space-y-6 text-sm">
          {/* Ratings */}
          <fieldset>
            <legend className="mb-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Ratings</legend>
            <div className="grid gap-2.5">
              {["5 Stars", "4+ Stars", "3+ Stars"].map((label) => (
                <label key={label} className="flex items-center gap-2.5 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedRatings.includes(label)}
                    onChange={() => handleRatingChange(label)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 transition-all" 
                  />
                  <span className={`transition-colors ${selectedRatings.includes(label) ? "text-blue-600 font-bold" : "text-gray-600 group-hover:text-gray-900"}`}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          {/* Categories */}
          <fieldset>
            <legend className="mb-3 text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">Categories</legend>
            
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input 
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="grid gap-2.5 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
              {displayedCategories.map((cat) => (
                <label key={cat._id} className="flex items-center gap-2.5 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={selectedCategories.includes(cat._id as string)}
                    onChange={() => handleCategoryChange(cat._id as string)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 transition-all" 
                  />
                  <span className={`truncate transition-colors ${selectedCategories.includes(cat._id as string) ? "text-blue-600 font-bold" : "text-gray-600 group-hover:text-gray-900"}`}>
                    {cat.serviceName}
                  </span>
                </label>
              ))}
              
              {filteredCategories.length === 0 && (
                <p className="text-xs text-gray-400 italic py-2">No categories found</p>
              )}
            </div>

            {filteredCategories.length > 5 && (
              <button 
                onClick={() => setShowAll(!showAll)}
                className="mt-3 text-xs font-bold text-blue-600 hover:underline transition-all"
              >
                {showAll ? "Show Less" : `View All (${allCategories.length})`}
              </button>
            )}
          </fieldset>

          <button 
            onClick={() => onApplyFilters({ categories: selectedCategories, ratings: selectedRatings })}
            className="mt-4 w-full rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;