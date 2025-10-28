import React, { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../components/ui/input-group";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import AddServicesAdmin from "../../components/Admin/AddServicesAdmin";
import { getServiceTypes } from "../../Services/AdminApiService";
import type { IServiceVendorTypes } from "../../Shared/types/Types";
import { AxiosError } from "axios";
import { Table } from "../../components/ui/table";
import ReusableTable from "../../components/Shared/Table";
import EditServiceAdmin from "../../components/Admin/EditServiceAdmin";

const VendorServicesTypePage = () => {
  const [addService, setAddService] = useState<boolean>(false);
  const [services, setServices] = useState<IServiceVendorTypes[] | []>([]);
  const [editPopup,setEditPopup] = useState<boolean>(false)
  const [editData,setEditData] = useState<IServiceVendorTypes|null>(null)

  useEffect(() => {
    serviceTypes();
  }, [addService,editPopup]);

  const serviceTypes = async () => {
    try {
      let response = await getServiceTypes();
      if (response?.data?.data) {
        setServices(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("fetch service type error", error);
      }
    }
  };

  let column = [
    { key: "serviceName", label: "Service Name" },
    { key: "description", label: "Description" },
    { key: "action", label: "Actions" },
    { key: "edit", label: "Edit" },
    { key: "isActive", label: "Status" },
  ];

  const editSerivcePop = (data:any) =>{

      setEditData(data)
      setEditPopup(true)

  }


  return (
    <>
      {addService && <AddServicesAdmin onClose={() => setAddService(false)} />}
        {editPopup && <EditServiceAdmin onClose={()=> setEditPopup(false)} data={editData as IServiceVendorTypes} /> }

      <div className="flex h-screen bg-gray-200 border-2 ">
        <div className="flex-1 flex flex-col">
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="border-2 rounded-xl  bg-white p-3">
              <div className="flex items-center justify-between w-full">
                <InputGroup className="bg-white border border-gray-300 w-1/2 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-blue-500">
                  <InputGroupInput
                    placeholder="Type to search..."
                    className="text-gray-900 placeholder-gray-400 px-3 py-2 outline-none"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      variant="secondary"
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium px-4"
                    >
                      Search
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setAddService(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 hover:text-white text-white "
                >
                  <Plus size={16} />
                  Add Service
                </Button>
              </div>

              <div className="w-full pt-10">
                <ReusableTable
                  columns={column}
                  data={services}
                  caption="Service Types"
                  onEditAction={editSerivcePop}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default VendorServicesTypePage;
