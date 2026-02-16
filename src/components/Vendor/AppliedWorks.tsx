import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Briefcase,
  Clock,
} from "lucide-react";
import { Input } from "../ui/input";
import { getVendorAppliedContracts } from "../../Services/ApiService/ContractApiService";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../Shared/Pagination";
import WorkDetailsModal from "./WorkDetailsModal";

const AppliedWorks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [limit] = useState<number>(9);
  const debouncedSearch = useDebounce(searchTerm);

  const [selectedWork, setSelectedWork] = useState<any>(null);

  useEffect(() => {
    fetchAppliedWorks();
  }, [page, debouncedSearch]);

  const fetchAppliedWorks = async () => {
    setLoading(true);
    try {
      const response = await getVendorAppliedContracts(page, limit, debouncedSearch);
      if (response?.data) {
        setContracts(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error: unknown) {
      console.error("Failed to fetch applied works:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (work: any) => setSelectedWork(work);
  const handleCloseModal = () => setSelectedWork(null);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 border-b border-gray-200 pb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
            <div className="bg-amber-100 p-2 rounded-xl shrink-0">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            Applied Works
          </h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Review the service contracts you've applied for.
          </p>
        </div>

        <div className="w-full lg:w-80 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
          <Input
            type="text"
            placeholder="Search applied works..."
            className="pl-10 w-full bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-100 rounded-2xl transition-all shadow-sm h-12"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-80 bg-gray-200 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {contracts.map((work, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden cursor-pointer"
              onClick={() => handleCardClick(work)}
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-100">
                    Application Pending
                  </span>
                  <span className="text-[10px] font-bold text-gray-300 uppercase">
                    #{work._id.slice(-6)}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-1">
                  {work.contractName || work.title}
                </h3>

                <div className="flex items-center text-gray-400 text-xs font-medium mb-4">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-500/60 shrink-0" />
                  <span className="line-clamp-1">
                    {work.address.city}, {work.address.address}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3 font-medium">
                  {work.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase text-gray-400 font-extrabold tracking-widest">
                    Applied On
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>{new Date(work.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-2 rounded-xl">
                  <Briefcase className="w-5 h-5 text-gray-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {contracts.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="bg-gray-100 p-6 rounded-full mb-4">
            <Briefcase className="w-12 h-12 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">No applications found</h3>
          <p className="text-gray-500 mt-2">You haven't applied for any contracts yet.</p>
        </div>
      )}

      {contracts.length > 0 && (
        <div className="mt-12 flex justify-center pb-10">
          <Pagination
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
        </div>
      )}

      <WorkDetailsModal
        isOpen={!!selectedWork}
        onClose={handleCloseModal}
        work={selectedWork}
      />
    </div>
  );
};

export default AppliedWorks;
