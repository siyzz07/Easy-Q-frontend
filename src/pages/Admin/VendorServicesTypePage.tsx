import { useEffect, useState, useMemo } from "react";
import { Plus, Search, Tag, Layers } from "lucide-react";
import AddServicesAdmin from "../../components/Admin/AddServicesAdmin";
import { getServiceTypes } from "../../Services/ApiService/AdminApiService";
import type { IServiceVendorTypes } from "../../Shared/types/Types";
import { AxiosError } from "axios";
import ReusableTable from "../../components/Shared/Table";
import EditServiceAdmin from "../../components/Admin/EditServiceAdmin";

const VendorServicesTypePage = () => {
  const [addService, setAddService] = useState<boolean>(false);
  const [services, setServices] = useState<IServiceVendorTypes[]>([]);
  const [editPopup, setEditPopup] = useState<boolean>(false);
  const [editData, setEditData] = useState<IServiceVendorTypes | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServiceTypes();
  }, [addService, editPopup]);

  const fetchServiceTypes = async () => {
    setLoading(true);
    try {
      const response = await getServiceTypes();
      if (response?.data?.data) {
        setServices(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error("fetch service type error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return services.filter(service => 
      service.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [services, searchTerm]);

  const column = [
    { key: "serviceName", label: "Catalog Item" },
    { key: "description", label: "Brief Description", maxWidth: "350px" },
    // { key: "action", label: "Visibility", align: "right" as const },
    { key: "edit", label: "Modify" },
    { key: "isActive", label: "Offering Status" },
  ];

  const onEditService = (data: any) => {
    setEditData(data);
    setEditPopup(true);
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in zoom-in-95 duration-700">
      {addService && <AddServicesAdmin onClose={() => setAddService(false)} />}
      {editPopup && editData && (
        <EditServiceAdmin onClose={() => setEditPopup(false)} data={editData} />
      )}

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
           <div className="h-14 w-14 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-600/20 flex items-center justify-center text-white">
              <Layers size={24} />
           </div>
           <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight text-left">Service Categories</h1>
              <p className="text-gray-500 font-medium mt-1">Configure and manage the global list of service offerings.</p>
           </div>
        </div>

        <button
          onClick={() => setAddService(true)}
          className="flex items-center gap-2.5 px-8 py-4 bg-gray-900 hover:bg-black text-white rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all active:scale-[0.98] shadow-xl shadow-gray-900/10"
        >
          <Plus size={18} strokeWidth={3} />
          New Category
        </button>
      </div>

      {/* Search & Tool Bar */}
      <div className="bg-white p-4 md:p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Filter service catalog..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-16 pr-6 py-4 bg-gray-50/50 rounded-2xl text-sm font-semibold outline-none focus:ring-4 focus:ring-indigo-600/5 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
           <div className="px-5 py-3 bg-indigo-50 text-indigo-700 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2">
              <Tag size={14} />
              {services.length} Total Types
           </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[3rem] p-1 border border-gray-100 shadow-xl shadow-gray-200/20">
        <ReusableTable
          columns={column}
          data={filteredData}
          caption="Global Service Definitions"
          onEditAction={onEditService}
          emptyMessage={loading ? "Synchronizing catalog..." : "The service catalog is currently empty."}
        />
      </div>
    </div>
  );
};

export default VendorServicesTypePage;