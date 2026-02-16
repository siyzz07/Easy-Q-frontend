import React, { useEffect, useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { IStaff } from "../../Shared/types/Types";
import { blockStaffDate, getAllStffs } from "../../Services/ApiService/VendorApiServices";
import { AxiosError } from "axios";

interface AddStaffProps {
  onClose?: () => void;
}

const validationSchema = Yup.object({
  _id: Yup.string().required("Please select a staff member"),
  blockedDates: Yup.array()
    // .min(, "Please select at least one date")
    // .required("Please select at least one date"),
});

const BlockBookingsModal: React.FC<AddStaffProps> = ({ onClose }) => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [staffList, setStaffList] = useState<IStaff[]>([]);

  useEffect(() => {
    getStaffs();
  }, []);

  const getStaffs = async () => {
    try {
      const response = await getAllStffs();
      if (response?.data?.data) {
        setStaffList(response.data.data);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log("Error fetching staff data");
      }
    }
  };

  const handleStaffBlock = async (values: any) => {
    try {
      const response = await blockStaffDate(values);
      if (response.data.message) {
        toast.success(response.data.message);
      }
      onClose?.();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message) {
          toast.error(error.response.data.message);
        }
      }
      onClose?.();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <div className="bg-red-100 p-1.5 rounded-md text-red-600">
                 <CalendarIcon size={18} />
              </div>
              Block Booking Dates
            </h2>
            <p className="text-xs text-gray-500 mt-0.5 ml-9">Select staff and dates to mark as unavailable.</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <Formik
            initialValues={{
              _id: "",
              blockedDates: [] as Date[],
            }}
            validationSchema={validationSchema}
            onSubmit={handleStaffBlock}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Staff Select */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Select Staff Member
                  </label>
                  <Select
                    onValueChange={(val) => {
                      const selectedStaff = staffList.find((s) => s._id === val);
                      setSelectedDates(selectedStaff?.blockedDates as any || []);
                      setFieldValue("_id", val);
                      // Update form blocked dates as well so validation passes if re-selecting
                       setFieldValue("blockedDates", selectedStaff?.blockedDates as any || []);
                    }}
                    value={values._id}
                  >
                    <SelectTrigger className="w-full h-11 border-gray-200 bg-gray-50/30 focus:ring-2 focus:ring-red-100 focus:border-red-400 transition-all rounded-xl">
                      <SelectValue placeholder="Choose a staff member..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {staffList.map((staff) => (
                        <SelectItem key={staff._id} value={staff._id as string} className="py-3 cursor-pointer">
                          <span className="font-medium text-gray-700">{staff.staffName}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage
                    name="_id"
                    component="p"
                    className="text-xs text-red-500 font-medium ml-1"
                  />
                </div>

                {/* Calendar Section */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 flex justify-between items-end">
                    <span>Block Dates</span>
                     {selectedDates.length > 0 && (
                        <span className="text-xs font-normal text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                           {selectedDates.length} selected
                        </span>
                     )}
                  </label>
                  <div className="border border-gray-100 rounded-xl overflow-hidden shadow-sm p-4 bg-white flex justify-center">
                    <Calendar
                      mode="multiple"
                      selected={selectedDates}
                      onSelect={(dates) => {
                        const newDates = dates || [];
                        setSelectedDates(newDates);
                        setFieldValue("blockedDates", newDates);
                      }}
                       className="p-0 rounded-md pointer-events-auto"
                        classNames={{
                          day_selected: "bg-red-500 text-white hover:bg-red-600 focus:bg-red-600",
                          day_today: "bg-gray-100 text-gray-900",
                        }}
                    />
                  </div>
                  <ErrorMessage
                    name="blockedDates"
                    component="p"
                    className="text-xs text-red-500 font-medium ml-1"
                  />
                </div>
                
                 {/* Selected Dates Summary (Optional - can be toggleable) */}
                  {selectedDates.length > 0 && (
                  <div className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                     <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Blocked Dates Preview</p>
                     <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto custom-scrollbar">
                        {selectedDates.map((date, idx) => (
                           <span key={idx} className="text-xs bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded shadow-sm">
                              {format(date, "MMM dd")}
                           </span>
                        ))}
                     </div>
                  </div>
                  )}

                {/* Footer Buttons */}
                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                     className="flex-1 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded-xl shadow-lg shadow-red-200 transition-all active:scale-[0.98]"
                  >
                    Save Changes
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default BlockBookingsModal;
