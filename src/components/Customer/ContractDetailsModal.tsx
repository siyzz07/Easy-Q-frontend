import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { IContractData } from "../../Shared/types/Types";
import {
  MapPin,
  Briefcase,
  Star,
  CheckCircle2,
  Clock4,
  XCircle,
  AlertCircle,
  Calendar,
  ChevronDown,
  ChevronUp,
  X,
  Receipt,
  Phone,
  Mail,
  Loader2,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { updateContractRequest } from "../../Services/ApiService/ContractApiService";
import { toast } from "react-toastify";

export interface IAppliedVendors {
  _id: string;
  shopName: string;
  city: string;
  email: string;
  phone: string;
  profileImage: string;
  rating: string;
}

interface ContractDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: IContractData | null;
}

const getStatusConfig = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return {
        icon: CheckCircle2,
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
      };
    case "inprogress":
      return {
        icon: Clock4,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
      };
    case "cancelled":
      return {
        icon: XCircle,
        color: "text-rose-600",
        bg: "bg-rose-50",
        border: "border-rose-200",
      };
    default:
      return {
        icon: AlertCircle,
        color: "text-gray-600",
        bg: "bg-gray-50",
        border: "border-gray-200",
      };
  }
};

const ContractDetailsModal: React.FC<ContractDetailsModalProps> = ({
  isOpen,
  onClose,
  contract,
}) => {
  const [detailsExpanded, setDetailsExpanded] = useState(true);
  const [contractRequest, setContractRequest] = useState<IAppliedVendors[]>([]);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && contract?.appliedVendors) {
      setContractRequest(contract.appliedVendors);
    }
  }, [isOpen, contract]);

  if (!contract) return null;
  const statusConfig = getStatusConfig(contract.status);

  const vendorRequestHandle = async (
    vendorId: string,
    decision: "accept" | "reject",
  ) => {
    try {
      setProcessingId(vendorId);
      const response = await updateContractRequest(
        contract._id as string,
        vendorId,
        decision,
      );

      if(response.data){
        if(decision == 'accept'){
          toast.success('vendor added Successfuly in contract')
        }
          setContractRequest((prev) => prev.filter((v) => v._id !== vendorId));

      }

    } catch (error) {
      console.error("Action failed", error);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col p-0 gap-0 bg-[#F8FAFC] sm:rounded-[32px] border-none shadow-2xl overflow-hidden outline-none">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md px-6 py-5 border-b border-gray-100 flex items-center justify-between sticky top-0 z-20">
          <div className="flex flex-col">
            <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">
              {contract.contractName}
            </DialogTitle>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {/* ID: {contract.substring(0, 8).toUpperCase()} */}
              </span>
              <Badge
                className={`${statusConfig.bg} ${statusConfig.color} ${statusConfig.border} border-none px-2 py-0.5 text-[9px] font-black uppercase`}
              >
                {contract.status}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-2xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {/* Section: Contract Info */}
          <div className="p-6">
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-sm overflow-hidden">
              <div
                className="flex justify-between items-center p-5 cursor-pointer hover:bg-slate-50/50 transition-colors"
                onClick={() => setDetailsExpanded(!detailsExpanded)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
                    <Receipt size={18} />
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                    Project Details
                  </h3>
                </div>
                {detailsExpanded ? (
                  <ChevronUp size={18} className="text-slate-400" />
                ) : (
                  <ChevronDown size={18} className="text-slate-400" />
                )}
              </div>

              <AnimatePresence>
                {detailsExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden border-t border-slate-50"
                  >
                    <div className="p-5 space-y-5">
                      <div className="text-sm text-slate-600 leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100 break-words">
                        <span className="font-black text-slate-900 block mb-1 text-[10px] uppercase opacity-50">
                          Description
                        </span>
                        {contract.description}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
                          <div className="h-9 w-9 bg-amber-50 rounded-full flex items-center justify-center text-amber-600">
                            <Briefcase size={16} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                              Category
                            </p>
                            <p className="text-sm font-bold text-slate-900">
                              {contract.serviceType.serviceName}
                            </p>
                          </div>
                        </div>
                        <div className="bg-white p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
                          <div className="h-9 w-9 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                            <Calendar size={16} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase">
                              Date Posted
                            </p>
                            <p className="text-sm font-bold text-slate-900">
                              {new Date(
                                contract.createdAt,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 bg-slate-900 p-4 rounded-2xl text-white shadow-lg shadow-slate-200">
                        <MapPin
                          size={20}
                          className="text-indigo-400 shrink-0"
                        />
                        <div>
                          <p className="text-sm font-bold">
                            {contract.address.address}
                          </p>
                          <p className="text-xs text-slate-400">
                            {contract.address.city}, {contract.address.state}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4 px-8 py-2">
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
              Vendor Proposals ({contractRequest.length})
            </span>
            <div className="h-px bg-slate-200 flex-1" />
          </div>

          {/* Section: Proposals */}
          <div className="px-6 pb-10 space-y-4 mt-4">
            <AnimatePresence mode="popLayout">
              {contractRequest.map((data) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    transition: { duration: 0.2 },
                  }}
                  key={data._id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-indigo-200 transition-all group shadow-sm hover:shadow-xl hover:shadow-indigo-500/5"
                >
                  <div className="flex gap-4 mb-6">
                    <Avatar
                      onClick={() => navigate(`/customer/vendor/${data._id}`)}
                      className="h-14 w-14 ring-4 ring-slate-50 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <AvatarImage src={data.profileImage} />
                      <AvatarFallback className="bg-blue-600 text-white font-bold">
                        <User size={20} />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4
                          className="font-black text-slate-900 text-lg leading-tight hover:text-blue-600 cursor-pointer transition-colors"
                          onClick={() =>
                            navigate(`/customer/vendor/${data._id}`)
                          }
                        >
                          {data.shopName}
                        </h4>
                        <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
                          <Star
                            size={12}
                            className="fill-amber-400 text-amber-400"
                          />
                          <span className="text-[11px] font-black text-amber-700">
                            {data.rating}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-4 mt-2">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Mail size={13} /> {data.email}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Phone size={13} /> {data.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      disabled={processingId === data._id}
                      onClick={() => vendorRequestHandle(data._id, "reject")}
                      variant="outline"
                      className="rounded-2xl border-slate-200 bg-rose-50  text-rose-600 hover:bg-rose-100 hover:text-rose-600 hover:border-rose-100 font-bold h-12"
                    >
                      {processingId === data._id ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        "Reject"
                      )}
                    </Button>

                    <Button
                      disabled={processingId === data._id}
                      onClick={() => vendorRequestHandle(data._id, "accept")}
                      className="rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 shadow-lg shadow-slate-200 transition-all active:scale-95"
                    >
                      {processingId === data._id ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        "Accept Proposal"
                      )}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {contractRequest.length === 0 && (
              <div className="text-center py-20 bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-200">
                <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <Briefcase className="text-slate-300" />
                </div>
                <p className="text-slate-900 font-black text-lg">
                  No proposals yet
                </p>
                <p className="text-slate-500 text-sm mt-1 max-w-[200px] mx-auto">
                  Vendors who apply to this contract will appear here.
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractDetailsModal;
