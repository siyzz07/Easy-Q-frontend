import React, { useEffect, useState } from "react";
import { Plus, Edit } from "lucide-react";
import AddStaff from "../../components/Vendor/AddStaff";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../../components/ui/input-group";
import { Button } from "../../components/ui/button";
import ReusableTable from "../../components/Shared/Table";
import type { IStaff } from "../../Shared/types/Types";
import { getAllStffs } from "../../Services/VendorApiServices";
import { AxiosError } from "axios";
import EditStaff from "../../components/Vendor/EditStaff";
import { data } from "react-router-dom";

const StaffPage = () => {
  const [addStaffPopup, setAddStaffPopup] = useState<boolean>(false);
  const [staffData, setStaffData] = useState<IStaff[] | []>([]);
  const [editStaffPopup,setEditStaffPopup] = useState<boolean>(false)
  const [eachStaffData,setEachStaffData] = useState<IStaff|null>(null)
  useEffect(() => {
    getStaffs();
  }, [addStaffPopup,editStaffPopup]);

  const getStaffs = async () => {
    try {
      let response = await getAllStffs();
      if (response?.data?.data) {
        setStaffData(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("error to fetch the staffs data");
      }
    }
  };

  let column = [
    { key: "staffName", label: "Staff Name" },
    {key:'openingTime',label:'Open At'},
    { key: "isActive", label: "Status" },
    {key:'view',label:''},
    // {key:'action',label:'Action'},
    {key:'edit',label:'Edit'}
  ];

  const onEdit = (data:any) =>{
    setEachStaffData(data)
    setEditStaffPopup(true)
  }

  return (
    <>
      {addStaffPopup && <AddStaff onClose={() => setAddStaffPopup(false)} />}
      {editStaffPopup && <EditStaff onClose={()=>setEditStaffPopup(false)} data={eachStaffData as IStaff} />}

      <div className="flex h-screen bg-gray-200 border-2 ">
        <div className="flex-1 flex flex-col">
          <main className="flex-1  md:p-8 overflow-y-auto">
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
                  onClick={() => setAddStaffPopup(true)}
                  className="flex items-center p-5 gap-2 bg-blue-600 hover:bg-blue-700 hover:text-white text-white "
                >
                  <Plus size={16} />
                  Add Service
                </Button>
              </div>

              <div className="w-full pt-10">
                <ReusableTable
                  columns={column}
                  data={staffData}
                  caption="Staffs"
                  onEditAction={(data)=> onEdit(data) }

                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default StaffPage;
