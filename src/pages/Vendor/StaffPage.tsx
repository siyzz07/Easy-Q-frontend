import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
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
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../../components/Shared/Pagination";


const StaffPage = () => {
  const [addStaffPopup, setAddStaffPopup] = useState<boolean>(false);
  const [staffData, setStaffData] = useState<IStaff[] | []>([]);
  const [editStaffPopup,setEditStaffPopup] = useState<boolean>(false);
  const [eachStaffData,setEachStaffData] = useState<IStaff|null>(null);
  const [page,setPage] = useState<number> (1);
  const [limit,setLimit] = useState<number>(10);
  const [totalPages,setTotalPages] = useState<number>(1);
  const [search,setSearch]= useState<string>("");

  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    getStaffs();
  }, [addStaffPopup,editStaffPopup,page,debouncedSearch]);

  const getStaffs = async () => {
    try {
      let response = await getAllStffs(page,limit,debouncedSearch);
      if (response?.data?.data) {
        setStaffData(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("error to fetch the staffs data");
      }
    }
  };

  let column = [
    { key: "staffName", label: "Staff Name" },
    {key:"openingTime",label:"Open At"},
    { key: "isActive", label: "Status" },
    {key:"view",label:""},
    // {key:'action',label:'Action'},
    {key:"edit",label:"Edit"}
  ];

  const onEdit = (data:any) =>{
    setEachStaffData(data);
    setEditStaffPopup(true);
  };

  

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
                    onChange={(e)=> setSearch(e.target.value)}
                    className="text-gray-900 placeholder-gray-400 px-4 py-2.5 outline-none"
                  />
                  
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

              {/* <div>
                <input type="text" />
                <button className="w-20 h-10 bg-blue-600" onClick={()=>onClickEvent(true)}> active </button>
                <button className="w-20 h-10 bg-blue-600" onClick={()=>onClickEvent(false)}> inactive </button>
              </div> */}

              <div className="w-full pt-10">
                <ReusableTable
                  columns={column}
                  data={staffData}
                  caption="Staffs"
                  onEditAction={(data)=> onEdit(data) }

                />
                <Pagination
                  page ={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
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
