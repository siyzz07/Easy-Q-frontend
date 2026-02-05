import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Button } from "../../components/ui/button";
import {
  CheckCircle,
  EyeOff,
  FileText,
  CircleOff ,
  Plus,
  RefreshCcw,
  Upload,
  Briefcase,
  MapPin,
  MessageCircle,
  Search,
  FolderOpen,
  Edit3,
  CrossIcon,
  Cross,
  Check,
} from "lucide-react";
import { Input } from "../../components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import AddContractModal, {
  type IAddContractInitialValues,
} from "../../components/Customer/AddContractModal";
import {
  addContract,
  getCustomerContracts,
} from "../../Services/ApiService/ContractApiService";
import type { IContractData } from "../../Shared/types/Types";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_ROUTES } from "../../Shared/Constants/RouteConstants";
import ContractDetailsModal from "../../components/Customer/ContractDetailsModal";
import { useDebounce } from "../../hooks/useDebounce";
import Pagination from "../../components/Shared/Pagination";
import EditContract from "../../components/Customer/EditContract";

const ContractPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [contractPopup, setContractpopup] = useState<boolean>(false);
  const [selectedContract, setSelectedContract] =
    useState<IContractData | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const [editContract, setEditContract] = useState<IContractData | null>(null);
  const [totalContract, setTotalContract] = useState<number>(0);
  const [cancelledContract, setCancelledContarct] = useState<number>(0);
  const [onGoingContract, setOnGoingContract] = useState<number>(0);
  const [completedContract, setCompletedContract] = useState<number>(0);
  const [hiring,setHiring] = useState<number>(0)
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const [contracts, setContracts] = useState<IContractData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(searchQuery);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeTab]);

  useEffect(() => {
    fetchContracts();
  }, [contractPopup, page, debouncedSearch, activeTab, editContract]);

  const stats = [
    {
      title: "All Contracts",
      value: totalContract,
      icon: <FileText className="text-blue-600" size={20} />,
      description: "Total Conract",
      iconBg: "bg-blue-100",
    },
    {
      title: "Ongoing",
      value: onGoingContract,
      icon: <Upload className="text-green-600" size={20} />,
      description: "Ongoing",
      iconBg: "bg-green-100",
    },
    {
      title: "Cancelled",
      value: cancelledContract,
      icon: <CircleOff className="text-gray-600" size={20} />,
      description: "Cancelled",
      iconBg: "bg-gray-100",
    },
    {
      title: "Completed",
      value: completedContract,
      icon: <Check className="text-yellow-600" size={20} />,
      description: "Completed",
      iconBg: "bg-yellow-100",
    },
    {
      title: "Hiring",
      value: hiring,
      icon: <CheckCircle className="text-green-700" size={20} />,
      description: "Hiring",
      iconBg: "bg-green-50",
    },
  ];
  const fetchContracts = async () => {
    try {
      setIsLoading(true);
      const filterValue = activeTab === "all" ? "all" : activeTab;
      const response = await getCustomerContracts(
        page,
        limit,
        debouncedSearch,
        filterValue,
      );
      console.log("response :>> ", response);
      if (response?.data) {
        setContracts(response.data.data || []);
        setTotalPages(response.data.pagination.totalPages);

        interface ContractCount {
          ongoing: number;
          completed: number;
          cancelled: number;
          hiring:number
        }
        const counts = response.data.data.reduce(
          (acc: ContractCount, item: IContractData) => {
            if (item.status === "open" || item.status === "in_progress") {
              acc.ongoing++;
            } else if (item.status === "completed") {
              acc.completed++;
            } else if (item.status === "cancelled") {
              acc.cancelled++;
            }
            if(item.isHiring == true){
              acc.hiring++
            }


            return acc;
          },
          { ongoing: 0, completed: 0, cancelled: 0 ,hiring:0},
        );


        setHiring(counts.hiring)
        setCancelledContarct(counts.cancelled)
        setOnGoingContract(counts.ongoing)
        setCompletedContract(counts.completed)
      }
    } catch (error: unknown) {
      console.error("Error fetching contracts:", error);
      toast.error("Failed to load contracts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContractSubmit = async (
    values: IAddContractInitialValues,
    isEditMode: boolean,
  ) => {
    try {
      await addContract(values);
      toast.success(isEditMode ? "Contract updated!" : "Contract created!");
      setContractpopup(false);
      fetchContracts();
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || "Something went wrong");
      }
    }
  };

  const handleViewContract = (contract: IContractData) => {
    setSelectedContract(contract);
    setIsViewModalOpen(true);
  };

  const handleEditContract = (data: IContractData) => {
    setEditContract(data);
  };

  return (
    <div className="min-h-screen bg-[#f0f4fa]">
      {editContract && (
        <EditContract
          onClose={() => setEditContract(null)}
          contractData={editContract}
        />
      )}

      {contractPopup && (
        <AddContractModal
          onClose={() => setContractpopup(false)}
          onSubmit={handleContractSubmit}
        />
      )}

      <ContractDetailsModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        contract={selectedContract}
      />

      <div className="relative overflow-hidden px-4 py-12 md:py-20 rounded-b-[2.5rem] md:rounded-b-[4rem] shadow-lg bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700">
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight text-white"
          >
            My Contracts
          </motion.h1>
          {/* <p className="mt-4 text-sm md:text-lg text-blue-100 max-w-xl mx-auto font-medium opacity-90">
             Organize and track all your service agreements in one place.
          </p> */}

          {/* Stats Bar in Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-3 md:gap-6"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 text-white/90 text-xs md:text-sm font-medium"
              >
                <span className="bg-white/20 p-1 rounded-full">
                  {React.cloneElement(stat.icon as any, {
                    size: 12,
                    className: "text-white",
                  })}
                </span>
                <span>
                  {stat.value} {stat.description}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 space-y-8 pb-20">
        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name, description..."
              className="pl-10 bg-slate-50 border-slate-200 focus:bg-white transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Button
            onClick={() => setContractpopup(true)}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/30 rounded-md"
          >
            <Plus size={18} className="mr-2" />
            Create Contract
          </Button>
        </div>

        {/* Tabs and Grid */}
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/50 backdrop-blur-md p-1.5 rounded-2xl h-14 border border-white shadow-sm inline-flex w-full md:w-auto overflow-x-auto">
              {["all", "open", "inprogress", "completed", "cancelled"].map(
                (tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="px-6 md:px-8 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
                  >
                    {tab === "inprogress" ? "Ongoing" : tab}
                  </TabsTrigger>
                ),
              )}
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="focus-visible:outline-none">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="bg-white h-72 rounded-3xl border border-slate-100 p-6 animate-pulse shadow-sm"
                  />
                ))}
              </div>
            ) : (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                >
                  <AnimatePresence mode="popLayout">
                    {contracts.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="col-span-full flex flex-col items-center justify-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-200"
                      >
                        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                          <FolderOpen size={40} className="text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">
                          No contracts found
                        </h3>
                        <p className="text-slate-500 max-w-xs text-center mb-6">
                          Start by creating a new contract or adjusting your
                          search filters.
                        </p>
                        <Button
                          onClick={() => {
                            setSearchQuery("");
                            setActiveTab("all");
                          }}
                          variant="outline"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          Clear filters
                        </Button>
                      </motion.div>
                    ) : (
                      contracts.map((contract, index) => (
                        <motion.div
                          layout
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="group relative bg-white rounded-3xl border border-slate-100 p-6 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                        >
                          {/* Dates & Status */}
                          <div className="flex items-start justify-between mb-4">
                            {/* LEFT SIDE */}
                            <div className="flex flex-col">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Created On
                              </span>
                              <span className="text-sm font-semibold text-slate-700">
                                {contract.createdAt
                                  ? new Date(
                                      contract.createdAt,
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </span>
                            </div>

                            {/* RIGHT SIDE */}
                            <div className="flex items-center gap-2">
                              {/* STATUS BADGE */}
                              <span
                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${
                                  contract.status === "completed" ||
                                  contract.status === "open"
                                    ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                    : contract.status === "in_progress"
                                      ? "bg-amber-100 text-amber-700 border-amber-200"
                                      : contract.status === "cancelled"
                                        ? "bg-red-100 text-red-700 border-red-200"
                                        : "bg-blue-100 text-blue-700 border-blue-200"
                                }`}
                              >
                                {contract.status.replace("_", " ")}
                              </span>

                              {/* HIRING STATUS BADGE */}
                              {/* <span
                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wide border ${
                                  contract.isHiring
                                    ? "bg-blue-600 text-white border-blue-700"
                                    : "bg-slate-100 text-slate-500 border-slate-200"
                                }`}
                              >
                                {contract.isHiring ? "Hiring" : "Closed"}
                              </span> */}

                              {/* EDIT BUTTON */}
                              {(contract.status == "open" ||
                                contract.status == "in_progress") && (
                                <button
                                  onClick={() => handleEditContract(contract)}
                                  title="Edit Contract"
                                  className="p-2 text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all duration-200 ml-auto"
                                >
                                  <Edit3 size={16} />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Title & Desc */}
                          <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {contract.contractName}
                          </h3>
                          <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                            {contract.description}
                          </p>

                          {/* Meta Info */}
                          <div className="mt-auto space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                              <div className="p-2 bg-white rounded-xl shadow-sm">
                                <Briefcase
                                  size={16}
                                  className="text-blue-500"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">
                                  Service
                                </span>
                                <span className="text-xs font-bold text-slate-700 truncate max-w-[120px]">
                                  {contract.serviceType?.serviceName ||
                                    "Unknown"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Footer Actions */}
                          <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                            <button
                              onClick={() => handleViewContract(contract)}
                              className="relative flex-1 py-2.5 rounded-md border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 hover:text-blue-600 transition-all"
                            >
                              Details
                              {contract.appliedVendors?.length > 0 && (
                                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                              )}
                            </button>
                            <button
                              onClick={() =>
                                navigate(
                                  `/customer/${CUSTOMER_ROUTES.CHAT.replace(":id", contract?._id as string)}`,
                                )
                              }
                              className="flex-1 py-2.5 flex items-center justify-center gap-2 rounded-md bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all"
                            >
                              <MessageCircle size={14} />
                              Chat
                            </button>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex justify-center">
                    <Pagination
                      page={page}
                      totalPages={totalPages}
                      onPageChange={(newPage) => {
                        setPage(newPage);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ContractPage;
