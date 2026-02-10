
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
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../../components/Shared/Pagination";
import ConfirmationModal from "../../components/Shared/ConfirmationModal";

const VendorListPage = () => {
  const [vendorDatas, setVendorDatas] = useState<IVendor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [pages,setPages] = useState(1);
  const [limit , setLimit] = useState(7);
  const [totalPages,setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any | null>(null);

  const debouncedSearch = useDebounce(searchTerm);
  useEffect(() => {
    fetchVendorData();
  }, [pages,debouncedSearch]);


  const fetchVendorData = async () => {
    setLoading(true);
    try {
      const response = await getVendorsData(pages,limit,debouncedSearch);
      if (response?.data?.data) {
        setVendorDatas(response.data.data);
        setTotalPages(response.data.totalPages);
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

  const onBlockVendor = (data: any) => {
    setSelectedVendor(data);
    setShowModal(true);
  };

  const handleConfirmBlock = async () => {
    if (!selectedVendor?._id) return;

    try {
        const response = await blockVendor(selectedVendor._id);
        if (response.data.message) {
          toast.success(response.data.message);
        }
        fetchVendorData();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
        toast.error("Failed to update status");
      }
    } finally {
      setShowModal(false);
      setSelectedVendor(null);
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 font-sans">
      {showModal && (
        <ConfirmationModal
          text="Confirm Action"
          description={"Are you sure you want to change the status of this vendor?"}
          submit={handleConfirmBlock}
          close={() => setShowModal(false)}
          bg="bg-red-600"
        />
      )}

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Search by name, email or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/20 transition-all shadow-sm"
          />
        </div>

       
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[2.5rem] p-1 border border-gray-100 shadow-inner">
        <>
        
        <ReusableTable
          caption="Verified Business Listings"
          data={filteredData}
          columns={column}
          onAction={onBlockVendor}
          emptyMessage={loading ? "Acquiring data..." : "No partners found matching your requirements."}
        />
        {/* <Pagination page={pages} totalPages={totalPages} onPageChange={setPages} /> */}
        </>
      </div>
    </div>
  );
};

export default VendorListPage;