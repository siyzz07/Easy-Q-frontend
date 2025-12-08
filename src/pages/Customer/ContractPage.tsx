import React, { useEffect, useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "../../components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { 
  CheckCircle, 
  EyeOff, 
  FileText, 
  Filter, 
  Plus, 
  RefreshCcw, 
  Upload,
  Briefcase, // Added
  MapPin,    // Added
  Calendar,  // Added
  Eye,       // Added
  Edit2,     // Added
  Trash2     // Added
} from "lucide-react";
import AddContractModal from "../../components/Customer/AddContractModal";
import { getContract } from "../../Services/ContractApiService";
import type { IContractData } from "../../Shared/types/Types";


const stats = [
  {
    title: "All Contracts",
    value: 9,
    icon: <FileText className="text-blue-600" size={20} />,
    description: "Total number of contracts",
    iconBg: "bg-blue-100",
  },
  {
    title: "Published",
    value: 5,
    icon: <Upload className="text-green-600" size={20} />,
    description: "Contracts visible to vendors",
    iconBg: "bg-green-100",
  },
  {
    title: "Unpublished",
    value: 2,
    icon: <EyeOff className="text-gray-600" size={20} />,
    description: "Contracts hidden from vendors",
    iconBg: "bg-gray-100",
  },
  {
    title: "In Progress",
    value: 3,
    icon: <RefreshCcw className="text-yellow-600" size={20} />,
    description: "Contracts currently ongoing",
    iconBg: "bg-yellow-100",
  },
  {
    title: "Completed",
    value: 4,
    icon: <CheckCircle className="text-green-700" size={20} />,
    description: "Finished and approved contracts",
    iconBg: "bg-green-50",
  },
];

const ContractPage = () => {
  const [filter, setFilter] = useState("all");
  const [contractPopup, setContractpopup] = useState<boolean>(false);
  
  // 2. Add state to store the fetched contracts
  const [contracts, setContracts] = useState<IContractData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 3. Fetch data when component mounts or popup closes (to refresh list)
  useEffect(() => {
    fetchContracts();
  }, [contractPopup]);

  const fetchContracts = async () => {
    try {
      setIsLoading(true);
      let response = await getContract();
      console.log('response :>> ', response);
      if(response && response.data) {
          setContracts(response.data.data);
      }
      console.log("Contracts fetched:");
    } catch (error: unknown) {
      console.error('Error fetching contracts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleDelete = (id: string | number) => {
  //     // Add your delete API logic here
  //     console.log("Delete contract with ID:", id);
  //     // Optimistic update for UI demo:
  //     setContracts(prev => prev.filter(c => c.id !== id));
  // };

  // 4. Implement Filtering Logic
  const filteredContracts = contracts.filter((contract) => {
    if (filter === "all") return true;
    return contract.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="min-h-screen bg-[#d3e2f6]">
      {contractPopup && (
        <AddContractModal 
          onClose={() => setContractpopup(false)} 
          onSubmit={() => {
            setContractpopup(false);
            // fetchContracts(); // Optional: Trigger refresh here if relying on parent refresh
          }} 
        />
      )}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-8">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Contract Management
              </h1>
              <p className="text-slate-600 text-sm sm:text-base mt-1">
                Organize and track all your service agreements
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-32 sm:w-40 h-10 bg-white border-slate-300 hover:border-slate-400 transition-colors text-sm">
                <Filter size={16} className="text-blue-600 mr-2" />
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem> {/* Changed values to match status */}
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={() => setContractpopup(true)}
              className="h-10 px-4 sm:px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm transition-all text-sm">
              <Plus size={18} className="mr-2" />
              <span className="hidden sm:inline">Add Contract</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-6 mb-8">
          {stats.map((item, index) => (
            <Card
              key={index}
              className="bg-white shadow-sm hover:shadow-md transition-all duration-200 rounded-xl border border-gray-200 p-3 sm:p-4 md:p-5"
            >
              <CardHeader className="flex items-center justify-between p-0 mb-2 sm:mb-3">
                <CardTitle className="text-xs sm:text-sm md:text-base font-medium text-gray-600">
                  {item.title}
                </CardTitle>
                <span className={`${item.iconBg} p-1.5 sm:p-2 rounded-md flex items-center justify-center`}>
                  {React.cloneElement(item.icon, { size: 16 })}
                </span>
              </CardHeader>

              <CardContent className="p-0">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 leading-tight">
                  {item.value}
                </p>
                <CardDescription className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5">
                  {item.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contracts Grid */}
        {isLoading ? (
             <div className="text-center py-10 text-slate-500">Loading contracts...</div>
        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredContracts.length === 0 ? (
                <div className="col-span-full text-center py-10 text-slate-500">No contracts found.</div>
            ) : (
                filteredContracts.map((contract,index) => (
                    <div
                    key={index}
                    className="group bg-white rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-xl hover:border-indigo-200 transition-all duration-300 overflow-hidden"
                    >
                    {/* Card Header with Gradient */}
                    <div className="relative h-32 bg-gradient-to-br from-blue-800 via-blue-500 to-blue-900 p-5 flex flex-col justify-between">
                        <div className="absolute inset-0 bg-black/10"></div>
                        <div className="relative flex items-start justify-between">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            contract.status === "completed" 
                            ? "bg-emerald-500 text-white" 
                            : "bg-amber-500 text-white"
                        }`}>
                            {contract.status}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-sm text-white">
                            {contract.contractName}
                        </span>
                        </div>
                        <div className="relative">
                        <h3 className="text-xl font-bold text-white mb-1 line-clamp-1">
                            {contract.isHiring}
                        </h3>
                        </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">
                        <p className="text-sm text-slate-600 mb-5 line-clamp-2 leading-relaxed">
                        {contract.description}
                        </p>

                        <div className="space-y-3 mb-5">
                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Briefcase size={16} className="text-indigo-600" />
                            </div>
                            <div>
                            <p className="text-xs text-slate-500 font-medium">Service Type</p>
                            <p className="text-slate-900 font-semibold">{contract.serviceType.serviceName}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 text-sm">
                            <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <MapPin size={16} className="text-indigo-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                            <p className="text-xs text-slate-500 font-medium">Location</p>
                            <p className="text-slate-900 font-semibold line-clamp-1">{`${contract.address.address} , ${contract.address.city}`}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm">
                            <div className="w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Calendar size={16} className="text-indigo-600" />
                            </div>
                            <div>
                            <p className="text-xs text-slate-500 font-medium">Created</p>
                            <p className="text-slate-900 font-semibold">{contract.createdAt}</p>
                            </div>
                        </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-4 border-t border-slate-100">
                        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-indigo-50 text-indigo-700 rounded-lg font-semibold hover:bg-indigo-100 transition-colors text-sm">
                            <Eye size={16} />
                            View
                        </button>
                        <button className="flex items-center justify-center px-3 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors">
                            <Edit2 size={16} />
                        </button>
                        {/* <button 
                            onClick={() => handleDelete(contract.id)}
                            className="flex items-center justify-center px-3 py-2.5 bg-rose-50 text-rose-600 rounded-lg font-semibold hover:bg-rose-100 transition-colors"
                        >
                            <Trash2 size={16} />
                        </button> */}
                        </div>
                    </div>
                    </div>
                ))
            )}
            </div>
        )}
      </main>
    </div>
  );
};

export default ContractPage;