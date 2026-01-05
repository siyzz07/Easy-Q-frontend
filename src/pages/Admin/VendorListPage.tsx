import { useEffect, useState, useMemo } from "react";
import {
  blockVendor,
  getVendorsData,
} from "../../Services/ApiService/AdminApiService";
import type { IVendor } from "../../Shared/types/Types";
import ReusableTable from "../../components/Shared/Table";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Search, Store, ExternalLink } from "lucide-react";

const VendorListPage = () => {
  const [vendorDatas, setVendorDatas] = useState<IVendor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendorData();
  }, []);

  const fetchVendorData = async () => {
    setLoading(true);
    try {
      const response = await getVendorsData();
      if (response?.data?.data) {
        setVendorDatas(response.data.data);
      }
    } catch (error: unknown) {
      console.error("fetch vendor data error", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return vendorDatas.filter(vendor => 
      vendor.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm)
    );
  }, [vendorDatas, searchTerm]);

  const column = [
    { key: "shopName", label: "Establishment Name" },
    { key: "email", label: "Primary Email" },
    { key: "phone", label: "Contact No." },
    { key: "action", label: "Control", align: "right" as const },
    { key: "isActive", label: "Business Status" },
  ];

  const onBlockVendor = async (data: any) => {
    try {
      if (data._id) {
        const response = await blockVendor(data._id);
        if (response.data.message) {
          toast.success(response.data.message);
        }
        fetchVendorData();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Partner Network</h1>
          <p className="text-gray-500 font-medium mt-1">Review and manage registered service providers on the network.</p>
        </div>

        <div className="flex items-center gap-4">
           <div className="flex flex-col items-end">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Partners</p>
              <p className="text-2xl font-bold text-gray-900">{vendorDatas.length}</p>
           </div>
           <div className="h-12 w-12 rounded-2xl bg-blue-600 shadow-xl shadow-blue-600/20 flex items-center justify-center text-white">
              <Store size={22} />
           </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-2 rounded-[2rem] border border-gray-100 shadow-sm">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-600 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search partners by shop name, email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-4 bg-transparent text-sm font-semibold outline-none placeholder:text-gray-300 transition-all"
          />
        </div>

        <div className="flex items-center gap-3 px-4">
           <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-gray-500 transition-all border border-gray-100">
              <ExternalLink size={14} />
              Export
           </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] p-1 border border-gray-100 shadow-inner">
        <ReusableTable
          caption="Verified Business Listings"
          data={filteredData}
          columns={column}
          onAction={onBlockVendor}
          emptyMessage={loading ? "Acquiring data..." : "No partners found matching your requirements."}
        />
      </div>
    </div>
  );
};

export default VendorListPage;