import { AxiosError } from "axios";
import { useEffect, useState, useMemo } from "react";
import { vendorsRequests, vendrRequestReject, vendrRequestVerified } from "../../Services/ApiService/AdminApiService";
import type { IVendor } from "../../Shared/types/Types";
import ReusableTable from "../../components/Shared/Table";
import { Search, ShieldAlert } from "lucide-react";

const VendorRequest = () => {
  const [requestData, setRequestData] = useState<IVendor[] | []>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    fetchVendorRequests();
  }, [update]);

  const fetchVendorRequests = async () => {
    setLoading(true);
    try {
      const response = await vendorsRequests();
      if (response?.data?.data) {
        setRequestData(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("error to fetch the vendor request datas");
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return requestData;
    const term = searchTerm.toLowerCase();
    return requestData.filter(
      (vendor) =>
        vendor.shopName?.toLowerCase().includes(term) ||
        vendor.email?.toLowerCase().includes(term) ||
        vendor.phone?.includes(searchTerm)
    );
  }, [requestData, searchTerm]);

  const column = [
    { key: "shopName", label: "Shop Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "proof", label: "Proof" },
    { key: "verification", label: "" },
  ];

  const onRejectVendor = async (data: any) => {
    try {
      const response = await vendrRequestReject(data._id);
      if (response) {
        setUpdate(!update);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Failed to reject vendor", error);
      }
    }
  };

  const onVerifiedVendor = async (data: any) => {
    try {
      const response = await vendrRequestVerified(data._id);
      if (response) {
        setUpdate(!update);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("Failed to verify vendor", error);
      }
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Vendor Requests</h1>
          <p className="text-gray-500 font-medium mt-1">Review and verify pending vendor registration requests.</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pending</p>
            <p className="text-2xl font-bold text-gray-900">{requestData.length}</p>
          </div>
          <div className="h-12 w-12 rounded-2xl bg-amber-500 shadow-xl shadow-amber-500/20 flex items-center justify-center text-white">
            <ShieldAlert size={22} />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search by shop name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500/20 transition-all shadow-sm"
          />
        </div>

        {searchTerm && (
          <p className="text-sm text-gray-400 font-medium">
            Showing <span className="font-bold text-gray-700">{filteredData.length}</span> of{" "}
            <span className="font-bold text-gray-700">{requestData.length}</span> requests
          </p>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] p-1 border border-gray-100 shadow-inner">
        <ReusableTable
          caption="Pending Vendor Verifications"
          data={filteredData}
          columns={column}
          onReject={onRejectVendor}
          onVerified={onVerifiedVendor}
          emptyMessage={loading ? "Loading requests..." : searchTerm ? "No requests match your search." : "No pending vendor requests."}
        />
      </div>
    </div>
  );
};

export default VendorRequest;