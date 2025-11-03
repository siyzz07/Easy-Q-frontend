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
import { blockStaffDate, getAllStffs } from "../../Services/VendorApiServices";
import { AxiosError } from "axios";

interface AddStaffProps {
  onClose?: () => void;
}

const validationSchema = Yup.object({
  _id: Yup.string().required("Please select a staff member"),
  blockedDates: Yup.array()
    .min(1, "Please select at least one date")
    .required("Please select at least one date"),
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 sticky top-0 bg-white z-10 pb-2 border-b">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-blue-600" />
            Block Booking Dates
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
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
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Select Staff
                </label>
                <Select
                  onValueChange={(val) => {
                    const selectedStaff = staffList.find((s) => s._id === val);
                    setSelectedDates(selectedStaff?.blockedDates as any);
                    setFieldValue("_id", val);
                  }}
                  value={values._id}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a staff member" />
                  </SelectTrigger>
                  <SelectContent>
                    {staffList.map((staff) => (
                      <SelectItem key={staff._id} value={staff._id as string}>
                        {staff.staffName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage
                  name="_id"
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>

              {/* Calendar */}
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Select Block Dates
                </label>
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={(dates) => {
                    setSelectedDates(dates || []);
                    setFieldValue("blockedDates", dates || []);
                  }}
                  className="rounded-lg border w-full"
                />
                <ErrorMessage
                  name="blockedDates"
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>

              {/* Selected Dates */}
              {/* {selectedDates.length > 0 && (
                <div className="bg-gray-50 p-3 rounded-md border text-sm text-gray-700">
                  <strong>Selected Dates:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {selectedDates.map((d, i) => (
                      <li key={i}>{format(d, "PPP")}</li>
                    ))}
                  </ul>
                </div>
              )} */}

              {/* Save Button */}
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Save Blocked Dates
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BlockBookingsModal;
