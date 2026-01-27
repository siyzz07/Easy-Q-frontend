import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import type { IContractData } from "../../Shared/types/Types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MapPin, Briefcase, Star, FileText } from "lucide-react";

interface ContractDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: IContractData | null;
}

const DUMMY_APPLICANTS = [
  { 
    id: 1, 
    name: "John's Plumbing Co.", 
    rating: 4.8, 
    reviews: 124,
    type: "Plumber", 
    quote: "$150 - $200", 
    coverLetter: "We have 10 years of experience in residential plumbing. Can start immediately.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
  },
  { 
    id: 2, 
    name: "Fast Fix Services", 
    rating: 4.5, 
    reviews: 89,
    type: "General Contractor", 
    quote: "$140", 
    coverLetter: "Available for inspection this weekend. Certified professionals.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fast"
  },
  { 
      id: 3, 
      name: "Elite Renos", 
      rating: 4.9, 
      reviews: 210,
      type: "Renovation Expert", 
      quote: "$250", 
      coverLetter: "Premium service with warranty included.",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elite"
    },
];

const ContractDetailsModal: React.FC<ContractDetailsModalProps> = ({ isOpen, onClose, contract }) => {
  if (!contract) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] flex flex-col p-0 gap-0 bg-white sm:rounded-2xl border-none shadow-2xl">
        
        {/* Header - Fixed & Compact */}
        <div className="px-6 py-5 border-b border-gray-100 bg-white flex-shrink-0 z-10 flex justify-between items-start">
            <div>
                <div className="flex items-center gap-3 mb-1.5">
                    <DialogTitle className="text-xl font-bold text-gray-900 leading-none">
                        {contract.contractName}
                    </DialogTitle>
                    <Badge variant="outline" className={`capitalize px-2.5 py-0.5 text-[10px] font-bold tracking-wide border ${
                        contract.status === 'completed' 
                        ? 'border-emerald-200 text-emerald-700 bg-emerald-50' 
                        : 'border-blue-200 text-blue-700 bg-blue-50'
                    }`}>
                        {contract.status}
                    </Badge>
                </div>
                <div className="flex items-center text-xs text-gray-500 gap-3">
                    <span className="font-mono">ID: #{contract.contractName.substring(0, 3).toUpperCase()}-{(contract as any)._id?.substring(0, 6) || '8299'}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>Created {typeof contract.createdAt === 'string' ? new Date(contract.createdAt).toLocaleDateString() : 'N/A'}</span>
                </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-gray-400 hover:text-gray-700 -mr-2">
                <span className="sr-only">Close</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-5 w-5"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </Button>
        </div>

        {/* Content with Tabs */}
        <div className="flex-1 overflow-hidden flex flex-col">
            <Tabs defaultValue="vendors" className="flex-1 flex flex-col overflow-hidden">
                <div className="px-6 pt-2 border-b border-gray-100">
                    <TabsList className="bg-transparent p-0 gap-6 h-auto">
                        <TabsTrigger 
                            value="overview" 
                            className="bg-transparent border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-1 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Overview
                        </TabsTrigger>
                        <TabsTrigger 
                            value="vendors" 
                            className="bg-transparent border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none px-1 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Requested Vendors 
                            <Badge variant="secondary" className="ml-2 bg-gray-100 text-gray-600 hover:bg-gray-200 border-none h-5 px-1.5 text-[10px] min-w-[20px] justify-center">
                                {DUMMY_APPLICANTS.length}
                            </Badge>
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Overview Tab */}
                <TabsContent value="overview" className="flex-1 overflow-y-auto p-6 animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                            <section>
                                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <FileText size={16} className="text-gray-400" />
                                    Scope of Work
                                </h4>
                                <div className="text-sm text-gray-600 leading-relaxed space-y-2">
                                    <p>{contract.description}</p>
                                </div>
                            </section>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100 space-y-5">
                                <div>
                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Service Category</div>
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                                        <Briefcase size={16} className="text-blue-500" />
                                        {contract.serviceType.serviceName}
                                    </div>
                                </div>
                                <div className="w-full h-px bg-gray-200" />
                                <div>
                                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Site Location</div>
                                    <div className="flex items-start gap-2 text-sm font-medium text-gray-900">
                                        <MapPin size={16} className="text-blue-500 mt-0.5" />
                                        <div>
                                            <div className="line-clamp-2">{contract.address.address}, {contract.address.city}</div>
                                            <div className="text-gray-500 font-normal mt-0.5">{contract.address.state}, {contract.address.country}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* Vendors Tab */}
                <TabsContent value="vendors" className="flex-1 overflow-y-auto p-6 bg-gray-50/30 animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
                     <div className="space-y-4 max-w-3xl mx-auto">
                        {DUMMY_APPLICANTS.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p>No vendors have been requested yet.</p>
                            </div>
                        ) : (
                            DUMMY_APPLICANTS.map((applicant) => (
                                <div key={applicant.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-4 sm:p-5 flex flex-col sm:flex-row gap-5 items-start">
                                    {/* Vendor Profile */}
                                    <div className="flex items-center gap-4 min-w-[200px]">
                                        <div className="relative">
                                            <Avatar className="h-14 w-14 border border-gray-100 shadow-sm">
                                                <AvatarImage src={applicant.image} alt={applicant.name} />
                                                <AvatarFallback className="bg-indigo-50 text-indigo-600 font-bold">{applicant.name.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 border border-white shadow-sm">
                                                <div className="bg-emerald-500 w-3 h-3 rounded-full border-2 border-white"></div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">{applicant.name}</h4>
                                            <div className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                                                <Star size={12} className="fill-amber-400 text-amber-400" />
                                                <span className="font-semibold text-gray-700">{applicant.rating}</span>
                                                <span>({applicant.reviews} reviews)</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Proposal Details */}
                                    <div className="flex-1 min-w-0 border-l border-gray-100 pl-0 sm:pl-5 border-t sm:border-t-0 pt-4 sm:pt-0 w-full sm:w-auto">
                                        <div className="flex justify-between items-center mb-2">
                                            <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 font-normal">
                                                {applicant.type}
                                            </Badge>
                                            <div className="text-right">
                                                <div className="text-xs text-gray-400 font-medium uppercase">Quote Estimate</div>
                                                <div className="font-bold text-lg text-emerald-600">{applicant.quote}</div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 italic line-clamp-2 mb-3">
                                            "{applicant.coverLetter}"
                                        </p>
                                        
                                        <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-gray-50">
                                            <Button variant="outline" size="sm" className="h-8 text-xs font-medium border-gray-300 text-gray-700">
                                                View Profile
                                            </Button>
                                            <Button size="sm" className="h-8 text-xs font-medium bg-gray-900 text-white hover:bg-gray-800">
                                               Chat with Vendor
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                     </div>
                </TabsContent>
            </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContractDetailsModal;
