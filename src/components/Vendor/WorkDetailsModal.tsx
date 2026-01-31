import React, { useEffect } from 'react';
import { X, MapPin, Calendar, Briefcase, User, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';

interface WorkDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  work: any; 
}

const WorkDetailsModal: React.FC<WorkDetailsModalProps> = ({ isOpen, onClose, work }) => {
  // 1. Handle "Esc" key to close and prevent body scroll
  useEffect(() => {
    if (isOpen) {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
      
      return () => {
        window.removeEventListener('keydown', handleEsc);
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen || !work) return null;

  // Helper for date formatting
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose} // Close when clicking backdrop
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal content
      >
        {/* Header Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 w-full relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors backdrop-blur-md z-10"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute -bottom-10 left-8 bg-white p-4 rounded-xl shadow-lg border border-gray-100">
            <Briefcase className="w-10 h-10 text-blue-600" />
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 px-8 pb-8">
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{work.contractName}</h2>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 bg-blue-50 px-2.5 py-1 rounded-md text-blue-700 text-xs font-semibold">
                  {work.serviceType?.serviceName || 'General Service'}
                </span>
                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-bold text-xs uppercase tracking-wider
                  ${work.urgency === 'High' ? 'bg-red-50 text-red-600' : 
                    work.urgency === 'Medium' ? 'bg-orange-50 text-orange-600' : 
                    'bg-green-50 text-green-600'}`}>
                  <AlertCircle className="w-3 h-3" />
                  {work.urgency}
                </span>
              </div>
            </div>
            <div className="sm:text-right shrink-0">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Current Status</p>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 border border-gray-200">
                {work.status}
              </span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Customer</p>
                <p className="font-semibold text-gray-900 leading-tight">{work.customerId?.name}</p>
                <p className="text-sm text-gray-500">{work.customerId?.email}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location</p>
                {/* <p className="font-semibold text-gray-900">{work.location || 'Remote / On-site'}</p> */}
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Posted On</p>
                <p className="font-semibold text-gray-900">{formatDate(work.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 bg-white rounded-lg shadow-sm">
                <Clock className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Duration</p>
                <p className="font-semibold text-gray-900">Project Based</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-3">Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {work.description || "No description provided."}
            </p>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <Button 
              variant="ghost" 
              onClick={onClose} 
              className="w-full sm:w-auto text-gray-500 hover:text-gray-700 order-2 sm:order-1"
            >
              Back to List
            </Button>
            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-10 py-6 rounded-xl shadow-lg shadow-blue-100 transition-all hover:scale-[1.02] active:scale-95 order-1 sm:order-2">
              Apply for Contract
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkDetailsModal;