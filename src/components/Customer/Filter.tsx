import React, { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";

const Filter: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full md:w-64">
 
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden w-full flex items-center justify-between rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-blue-700 transition"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal size={16} />
          Filters
        </span>
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <div
        className={`${
          open ? "block" : "hidden"
        } md:block mt-3 md:mt-0 rounded-lg bg-white p-4 shadow-sm border border-gray-100`}
      >
        <h3 className="mb-4 text-base font-semibold text-gray-800">Filters</h3>

        <div className="space-y-6 text-sm">

          <fieldset>
            <legend className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Ratings
            </legend>
            <div className="grid gap-2">
              {["5 Stars", "4+ Stars", "3+ Stars"].map((label, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
              Categories
            </legend>
            <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-1">
              {["Salon", "Barber", "Auto", "Home", "Health"].map((cat, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
                  {cat}
                </label>
              ))}
            </div>
          </fieldset>

          

          <button className="mt-4 w-full rounded-md bg-blue-600 hover:bg-blue-700 px-3 py-2 text-xs font-medium text-white transition-colors">
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
