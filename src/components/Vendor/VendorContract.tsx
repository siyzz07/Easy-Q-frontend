import React, { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  Briefcase,
  ArrowRight,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { VENDOR_ROUTES } from "../../Shared/Constants/RouteConstants";
import { vendorContracts } from "../../Services/ApiService/ContractApiService";
import Pagination from "../Shared/Pagination";
import { useDebounce } from "../../hooks/useDebounce";

const VendorContract: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState(1);
  const [limit] = useState(9);
  const debouncedSearch = useDebounce(searchTerm);

  useEffect(() => {
    fetchVendorContract();
  }, [page, debouncedSearch]);

  const fetchVendorContract = async () => {
    setLoading(true);
    try {
      const response = await vendorContracts(page, limit, debouncedSearch);
      if (response.data) {
        setContracts(response.data.data);
        setTotalPage(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch contracts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (contractId: string) => {
    navigate(`/vendor/${VENDOR_ROUTES.CONTRACTS}/${contractId}`);
  };

  return (
    <div className="p-4 md:p-8 lg:p-10 bg-gray-50 min-h-screen font-sans">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 border-b border-gray-200 pb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-3 tracking-tight">
            <div className="bg-blue-100 p-2 rounded-xl shrink-0">
              <Briefcase className="w-6 h-6 text-blue-600" />
            </div>
            My Contracts
          </h1>
          <p className="text-gray-500 mt-2 text-sm font-medium">
            Manage and track your committed projects.
          </p>
        </div>

        <div className="w-full lg:w-80 relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-500 transition-colors" />
          <Input
            type="text"
            placeholder="Search contracts..."
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
          {contracts.map((contract) => (
            <div
              key={contract._id}
              className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                <div className="flex justify-between items-center mb-5">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm
                      ${
                        contract.status === "Cancelled" ? "bg-red-50 text-red-600" :
                        contract.status === "Pending" ? "bg-amber-50 text-amber-600" :
                        contract.status === "In Progress" ? "bg-blue-50 text-blue-600" :
                        "bg-emerald-50 text-emerald-600"
                      }`}
                  >
                    {contract.status}
                  </span>
                  <span className="text-[10px] font-bold text-gray-300 uppercase">
                    #{contract._id.slice(-6)}
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {contract.contractName}
                </h3>

                <div className="flex items-start text-gray-400 text-xs font-medium mb-5">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-blue-500/60 mt-0.5 shrink-0" />
                  <span className="line-clamp-1">
                    {contract.address.city} • {contract.address.address}
                  </span>
                </div>

                <div className="bg-gray-50 rounded-2xl p-4 mb-6 border border-gray-50 group-hover:bg-white group-hover:border-blue-100 group-hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {contract.customerId?.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate leading-tight mb-1">
                        {contract.customerId?.name || "Anonymous Client"}
                      </p>
                      <div className="flex items-center text-[11px] text-gray-500 font-medium">
                        <Mail className="w-3 h-3 mr-1.5 text-gray-400 shrink-0" />
                        <span className="truncate">{contract.customerId?.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-500 text-sm mb-8 leading-relaxed line-clamp-2 font-medium">
                  {contract.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto gap-4">
                <div className="space-y-1">
                  <span className="block text-[9px] uppercase text-gray-400 font-extrabold tracking-widest">
                    Commencement
                  </span>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="whitespace-nowrap">
                      {new Date(contract.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleCardClick(contract._id)}
                  className="group/btn flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl transition-all duration-300 shadow-lg active:scale-95 shrink-0"
                >
                  <span>Chat</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {contracts.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <Briefcase className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">No contracts found</h3>
          <p className="text-gray-500 mt-2">Adjust your search criteria.</p>
          <Button
            variant="ghost"
            className="mt-4 text-blue-600"
            onClick={() => setSearchTerm("")}
          >
            Clear Search
          </Button>
        </div>
      )}

      {contracts.length > 0 && (
        <div className="mt-12 flex justify-center pb-10">
          <Pagination
            totalPages={totalPage}
            page={page}
            onPageChange={setPage}
          />
        </div>
      )}
    </div>
  );
};

export default VendorContract;