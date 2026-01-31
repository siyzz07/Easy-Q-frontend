import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  DollarSign,
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
import type { IContractDto } from "../../Shared/types/Types";
import { data } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// Dummy Data
// const DUMMY_WORKS = [
//   {
//     _id: "1",
//     title: "Plumbing Fix for Kitchen Sink",
//     description: "The kitchen sink is leaking continuously. Need a professional plumber to fix the pipes and replace the faucet if necessary. It's an urgent requirement.",
//     customerName: "John Doe",
//     location: "Downtown, New York",
//     budget: 150,
//     postedDate: "2024-03-10",
//     serviceType: "Plumbing",
//     urgency: "High",
//   },
//   {
//     _id: "2",
//     title: "Full House Cleaning",
//     description: "Looking for a team to do a deep cleaning of a 3-bedroom apartment. Includes carpet cleaning and window washing.",
//     customerName: "Sarah Smith",
//     location: "Brooklyn, NY",
//     budget: 300,
//     postedDate: "2024-03-12",
//     serviceType: "Cleaning",
//     urgency: "Medium",
//   },
//   {
//     _id: "3",
//     title: "Electrical Wiring Check",
//     description: "Need an electrician to inspect the wiring in the living room. Some outlets are not working.",
//     customerName: "Mike Johnson",
//     location: "Queens, NY",
//     budget: 100,
//     postedDate: "2024-03-14",
//     serviceType: "Electrical",
//     urgency: "Low",
//   },
//   {
//     _id: "4",
//     title: "Garden Maintenance",
//     description: "Need someone to mow the lawn and trim the hedges in the backyard.",
//     customerName: "Emily Davis",
//     location: "Staten Island, NY",
//     budget: 80,
//     postedDate: "2024-03-15",
//     serviceType: "Gardening",
//     urgency: "Medium",
//   },
//   {
//     _id: "5",
//     title: "AC Repair",
//     description: "AC is not cooling properly. Need a technician to check the gas levels and service the unit.",
//     customerName: "Robert Brown",
//     location: "Bronx, NY",
//     budget: 200,
//     postedDate: "2024-03-16",
//     serviceType: "AC Repair",
//     urgency: "High",
//   },
// ];

const Works: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationSearchTerm, setLocationSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(9);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [contract, setContract] = useState([]);
  const debouncedSearch = useDebounce(searchTerm);

  useEffect(() => {
    fetchWorks();
  }, [page, debouncedSearch, filterType]);

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
    } catch (error: unknown) {}
  };

  const applyFroJob = async (contractId: string) => {
    try {
      const response = await applyContract(contractId);
      if (response.data.success) {
        toast.success(response.data.message)
        let datas = contract.filter(
          (data: IContractDto) => data._id != contractId,
        );
        setContract(datas);
      } else {
        toast.error("Unable to apply for this contract");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(
          error.response?.data.message || '"Unable to apply for this contract"',
        );
      }
    }
  };

  const [selectedWork, setSelectedWork] = useState<any>(null);

  const handleCardClick = (work: any) => {
    setSelectedWork(work);
  };

  const handleCloseModal = () => {
    setSelectedWork(null);
  };

  const filters = ["All", "24h", "7d" , "30d"];

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight font-sans">
            <div className="bg-blue-100 p-2 rounded-xl">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            Available Works
          </h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Browse and apply for the latest service contracts tailored for you.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Search Input */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
            <Input
              type="text"
              placeholder="Search by title..."
              className="pl-10 w-full sm:w-64 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-100 rounded-xl transition-all shadow-sm h-11"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Location Search Input */}
          <div className="relative group">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
            <Input
              type="text"
              placeholder="Search by location..."
              className="pl-10 w-full sm:w-64 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-100 rounded-xl transition-all shadow-sm h-11"
              value={locationSearchTerm}
              onChange={(e) => setLocationSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative group">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
            <select
              className="pl-10 pr-8 py-2.5 w-full sm:w-48 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 appearance-none cursor-pointer shadow-sm transition-all font-medium text-gray-700 hover:border-gray-400 h-11"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {filters.map((type) => (
                <option key={type} value={type}>
                  {type !== "All" ? `past ${type}` : `${type}`}
                </option>
              ))}
            </select>
            {/* Custom Arrow for Select */}
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
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Works Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contract.map((work: any, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col justify-between relative overflow-hidden cursor-pointer"
          >
            {/* Decorative Gradient Background */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div onClick={() => handleCardClick(work)}>
              <div className="flex justify-between items-start mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide 
                    ${
                      work.status === "High"
                        ? "bg-red-50 text-red-600"
                        : work.status === "Medium"
                          ? "bg-orange-50 text-orange-600"
                          : "bg-green-50 text-green-600"
                    }`}
                >
                  {work.urgency} Priority
                </span>
                <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">
                  {work?.contractName}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                {work.contractName}
              </h3>

              <div className="flex items-center text-gray-500 text-sm mb-4 gap-4">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{work.address.address}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                {work.description}
              </p>
            </div>

            {/* Footer with Price and Action */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
              <div className="flex flex-col">
                <span className="text-xs text-gray-400 font-medium font-sans">
                  posted on
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{new Date(work.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <Button
                onClick={() => applyFroJob(work._id)}
                className="bg-blue-600 cursor-pointer text-white rounded-md px-5 py-2 hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md shadow-blue-200"
              >
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {contract.length === 0 && (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div className="bg-gray-100 p-4 rounded-full mb-4">
              <Briefcase className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              No works found
            </h3>
            <p className="text-gray-500 max-w-xs mx-auto mt-2">
              Try adjusting your search filters to find more opportunities.
            </p>
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
