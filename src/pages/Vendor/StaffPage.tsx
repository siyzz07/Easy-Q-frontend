import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
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
import { getAllStffs } from "../../Services/ApiService/VendorApiServices";
import { AxiosError } from "axios";
import EditStaff from "../../components/Vendor/EditStaff";


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
          <main className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between w-full mb-6">
                <div className="w-full max-w-md">
                   <InputGroup className="bg-white border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 shadow-sm transition-all">
                  <InputGroupInput
                    placeholder="Search staff..."
                    className="text-gray-900 placeholder-gray-400 px-4 py-2.5 outline-none"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      variant="ghost"
                      className="bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors font-medium px-4 border-l border-gray-100"
                    >
                      Search
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                </div>

                <Button
                  onClick={() => setAddStaffPopup(true)}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-sm transition-all font-medium"
                >
                  <Plus size={18} />
                  Add Staff
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
