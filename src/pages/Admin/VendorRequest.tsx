import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { vendorsRequests, vendrRequestReject, vendrRequestVerified } from "../../Services/ApiService/AdminApiService";
import type { IVendor } from "../../Shared/types/Types";
import ReusableTable from "../../components/Shared/Table";

const VendorRequest = () => {
  const [requestData, setRequestData] = useState<IVendor[] | []>([]);
  const [viewProof, setViewProof] = useState<boolean>(true);
  const [update,setUpdate] = useState<boolean>(false);

  useEffect(() => {
    VendorRequest();
  }, [update]);

  const VendorRequest = async () => {
    try {
      let response = await vendorsRequests();
      if (response?.data?.data) {
        setRequestData(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("error to fetch the vedor request datas");
      }
    }
  };

  let column = [
    { key: "shopName", label: "Shope Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    // { key: "action", label: "Actions" },
    // { key: "isActive", label: "Verificat" },
    // { key: "isActive", label: "Status" },
    { key: "proof", label: "Proof" },
    { key: "verification", label: "" },
    // { key: "reject", label: "" },
  ];

  const onClose = () => {
    setViewProof(false);
  };

  const onRejectVendor = async (data: any) => {
    try {
      console.log(data);
      
        let response = await vendrRequestReject(data._id);
        if(response.data.data){
        
        }
        if(response){
            setUpdate(!update);
        }
    } catch (error: unknown) {

    }
  };

  const onVerifiedVendor = async (data: any) => {
    try {
        const response = await vendrRequestVerified(data._id);
        if(response){
          setUpdate(!update);
        }
    } catch (error: unknown) {

    }
  };

  return (
    <>
      <div className="flex h-screen bg-gray-200">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="w-full ">
              <ReusableTable
                caption="Vendors Requests"
                data={requestData}
                columns={column}
                onReject={onRejectVendor}
                onVerified={onVerifiedVendor}
              />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default VendorRequest;