import React, { useEffect, useState } from "react";
import {
  blockCustomer,
  getCustomersData,
} from "../../Services/AdminApiService";
import type { ICustomer } from "../../Shared/types/Types";
import ReusableTable from "../../components/Shared/Table";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const CustomerList = () => {
  let [customerDatas, setCustomerDatas] = useState<ICustomer[] | []>([]);

  useEffect(() => {
    customerData();
  },[]);

  let column = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "action", label: "Actions" },
    { key: "isActive", label: "Status" },
  ];

  const customerData = async () => {
    try {
      let response = await getCustomersData();
      console.log(response);
      
      if (response?.data?.data) {
        setCustomerDatas(response.data.data);
      }
    } catch (error: unknown) {
      console.log(error);
    }
  };


  //-------------- block customer
  const onBlockCustomer = async (data: any) => {
    try {
      if (data._id) {
        let response = await blockCustomer(data._id);

        if (response.data.message) {
          toast.success(response.data.message);
        }
        customerData();
      }
    } catch (error: unknown) {
          if(error instanceof AxiosError){
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
              caption="Customer Datas"
              data={customerDatas}
              columns={column}
              onAction={onBlockCustomer}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CustomerList;
