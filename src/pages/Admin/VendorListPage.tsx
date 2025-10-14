import React, { useEffect, useState } from "react";
import {
  blockCustomer,
  blockVendor,
  getCustomersData,
  getVendorsData,
} from "../../Services/AdminApiService";
import type { ICustomer } from "../../Shared/types/Types";
import ReusableTable from "../../components/Shared/Table";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const VendorListPage = () => {
  let [customerDatas, setCustomerDatas] = useState<ICustomer[] | []>([]);
  let [update,setUpdate] = useState <boolean>(true)

  useEffect(() => {
    vendorData();
  },[]);

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
        console.log(response);

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
    <div className="flex h-screen bg-gray-200">
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="w-full border-2">
            <ReusableTable
              caption="Vendors Datas"
              data={customerDatas}
              columns={column}
              onAction={onBlockVendor}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorListPage;
