import { useEffect, useState } from "react";
import {
  blockVendor,
  getVendorsData,
} from "../../Services/ApiService/AdminApiService";
import type { ICustomer } from "../../Shared/types/Types";
import ReusableTable from "../../components/Shared/Table";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { Search } from "lucide-react"; // Added Search Icon

const VendorListPage = () => {
  let [customerDatas, setCustomerDatas] = useState<ICustomer[] | []>([]);
  // 1. Add state for the search input
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    vendorData();
  }, []);

  let column = [
    { key: "shopName", label: "Shope Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "action", label: "Actions" },
    { key: "isActive", label: "Status" },
  ];

  const vendorData = async () => {
    try {
      let response = await getVendorsData();
      if (response?.data?.data) {
        setCustomerDatas(response.data.data);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const onBlockVendor = async (data: any) => {
    try {
      if (data._id) {
        let response = await blockVendor(data._id);
        if (response.data.message) {
          toast.success(response.data.message);
        }
      }
      vendorData();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Vendor Management</h2>
          <div className="text-sm text-gray-500 mt-1">
            Total Vendors: <span className="font-semibold text-gray-800">{customerDatas.length}</span>
          </div>
        </div>

        {/* 2. Search UI Box */}
        <div className="relative w-full md:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by shop name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <ReusableTable
          caption="A list of all verified vendors on the platform."
          data={customerDatas} 
          columns={column}
          onAction={onBlockVendor}
        />
      </div>
    </div>
  );
};

export default VendorListPage;