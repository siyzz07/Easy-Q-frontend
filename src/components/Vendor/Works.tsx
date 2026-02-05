import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Filter,
  ArrowRight,
  Briefcase,
} from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import WorkDetailsModal from "./WorkDetailsModal";
import { useDebounce } from "../../hooks/useDebounce";
import {
  applyContract,
  getVendorWorks,
} from "../../Services/ApiService/ContractApiService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import type { IContractDto } from "../../Shared/types/Types";
import LocationAutoSuggest from "../Shared/LocationAutoSuggest";

const Works: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearchTerm, setLocationSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(9);
  const [locationChange, setLocationChange] = useState("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [contract, setContract] = useState<any[]>([]);
  const debouncedSearch = useDebounce(searchTerm);

  useEffect(() => {
    fetchWorks();
  }, [page, debouncedSearch, filterType, locationChange]);

  const fetchWorks = async () => {
    try {
      const response = await getVendorWorks(
        page,
        limit,
        debouncedSearch,
        filterType,
        lat,
        lng,
      );
      if (response?.data) {
        setContract(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error: unknown) {
      console.error(error);
    }
  };

  const applyFroJob = async (contractId: string) => {
    try {
      const response = await applyContract(contractId);
      if (response.data.success) {
        toast.success(response.data.message);
        setContract((prev) =>
          prev.filter((item: IContractDto) => item._id !== contractId),
        );
      } else {
        toast.error("Unable to apply for this contract");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || "Unable to apply for this contract",
        );
      }
    }
  };

  const [selectedWork, setSelectedWork] = useState<any>(null);
  const handleCardClick = (work: any) => setSelectedWork(work);
  const handleCloseModal = () => setSelectedWork(null);

  const filters = ["All", "24h", "7d", "30d"];

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end mb-8 gap-6 border-b border-gray-200 pb-8">
        <div className="w-full xl:w-auto">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
            <div className="bg-blue-100 p-2 rounded-xl shrink-0">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            Available Works
          </h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Browse and apply for the latest service contracts.
          </p>
        </div>

        {/* Search and Filter Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full xl:w-auto">
          {/* Title Search */}
          <div className="relative group w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 " />
            <Input
              type="text"
              placeholder="Title..."
              className="pl-10 w-full bg-white border-gray-300  rounded-xl h-11 shadow"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative group w-full">
            <MapPin
              className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
                 ${lat ? "text-blue-500" : "text-gray-400"}
                 group-focus-within:text-blue-500`}
            />

            <div className="w-full bg-white border border-gray-300 focus:border-blue-500 focus-within:border-blue-500 rounded-xl h-11 shadow-sm flex items-center ">
              <LocationAutoSuggest
                value={locationChange}
                onChange={(val: string) => {
                  setLocationChange(val);
                  setLat(null);
                  setLng(null);
                }}
                onSelect={({ name, lat, lng }: any) => {
                  setLocationChange(name);
                  setLat(lat);
                  setLng(lng);
                }}
              />
            </div>
          </div>

          {/* Time Filter */}
          <div className="relative group w-full">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
            <select
              className="pl-10 pr-8 w-full bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500  appearance-none cursor-pointer shadow-sm h-11 font-medium text-gray-700"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {filters.map((type) => (
                <option key={type} value={type}>
                  {type !== "All" ? `Past ${type}` : "All Time"}
                </option>
              ))}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* --- Works Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {contract.map((work: any, index) => (
          <div
            key={index}
            className="group bg-white rounded-3xl p-5 md:p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div
              onClick={() => handleCardClick(work)}
              className="cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4 gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                    ${
                      work.status === "open"
                        ? "bg-green-50 text-green-600"
                        : work.status === "in_progress"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-green-50 text-green-600"
                    }`}
                >
                  {work.status}
                </span>
                {/* <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded-md uppercase truncate max-w-[120px]">
                  {work?.contractName}
                </span> */}
              </div>

              <h3 className="text-lg md:text-xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                {work.contractName}
              </h3>

              <div className="flex items-center text-gray-500 text-xs mb-4 gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-blue-500/60 shrink-0" />
                <span className="line-clamp-1 font-medium">
                  {work.address.address}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3 font-medium">
                {work.description}
              </p>
            </div>

            {/* Footer with Price and Action */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-gray-400 font-extrabold tracking-widest">
                  Posted On
                </span>
                <div className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-gray-700">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>{new Date(work.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  applyFroJob(work._id);
                }}
                className="bg-blue-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-xl hover:bg-blue-700 hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 shrink-0"
              >
                Apply
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {/* --- Empty State --- */}
        {contract.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <Briefcase className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No works found</h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2 font-medium">
              Try adjusting your search filters to find more opportunities.
            </p>
            <Button
              variant="outline"
              className="mt-6 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-xl"
              onClick={() => {
                setSearchTerm("");
                setFilterType("All");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      <WorkDetailsModal
        isOpen={!!selectedWork}
        onClose={handleCloseModal}
        work={selectedWork}
      />
    </div>
  );
};

export default Works;
