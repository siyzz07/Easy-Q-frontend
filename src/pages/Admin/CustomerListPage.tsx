import { useEffect, useState, useMemo } from "react";
import {
  blockCustomer,
  getCustomersData,
} from "../../Services/ApiService/AdminApiService";
import type { ICustomer } from "../../Shared/types/Types";
import ReusableTable from "../../components/Shared/Table";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Search, Users } from "lucide-react";

const CustomerList = () => {
  const [customerDatas, setCustomerDatas] = useState<ICustomer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const fetchCustomerData = async () => {
    setLoading(true);
    try {
      const response = await getCustomersData();
      if (response?.data?.data) {
        setCustomerDatas(response.data.data);
      }
    } catch (error: unknown) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    return customerDatas.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
  }, [customerDatas, searchTerm]);

  const stats = useMemo(() => ({
    total: customerDatas.length,
    active: customerDatas.filter(c => c.role !== 'blocked').length, // Assuming logic or use isActive if available
    blocked: customerDatas.filter(c => !c.password).length, // Replace with actual blocked logic if different
  }), [customerDatas]);

  const column = [
    { key: "name", label: "Customer Name" },
    { key: "email", label: "Email Address" },
    { key: "phone", label: "Phone Number" },
    { key: "action", label: "Access Control", align: "right" as const },
    { key: "isActive", label: "Membership" },
  ];

  const onBlockCustomer = async (data: any) => {
    try {
      if (data._id) {
        const response = await blockCustomer(data._id);
        if (response.data.message) {
          toast.success(response.data.message);
        }
        fetchCustomerData();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Customer Directory</h1>
          <p className="text-gray-500 font-medium mt-1">Manage and monitor customer accounts across the platform.</p>
        </div>

        <div className="flex items-center gap-3">
           <div className="h-12 w-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-blue-600">
              <Users size={20} />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Users</p>
              <p className="text-xl font-bold text-gray-900">{stats.total}</p>
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

        <div className="flex items-center gap-2">
           <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-all">
              Export CSV
           </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-gray-50/50 rounded-[2.5rem] p-1 border border-gray-100/50">
        <ReusableTable
          caption="Securely manage user platform permissions"
          data={filteredData}
          columns={column}
          onAction={onBlockCustomer}
          emptyMessage={loading ? "Synchronizing data..." : "No customers found matching your search."}
        />
      </div>
    </div>
  );
};

export default CustomerList;
