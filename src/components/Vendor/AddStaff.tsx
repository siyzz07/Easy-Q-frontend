import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { IStaff } from "../../Shared/types/Types";
import { addStaff } from "../../Services/VendorApiServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface AddStaffProps {
  onClose?: () => void;
}

const AddStaffSchema = Yup.object().shape({
  staffName: Yup.string()
    .required("Staff name is required")
    .min(3, "Name must be at least 3 characters long"),

  openingTime: Yup.string().required("Opening time is required"),

  closingTime: Yup.string()
    .required("Closing time is required")
    .test(
      "is-after",
      "Closing time must be after opening time",
      function (value) {
        const { openingTime } = this.parent;
        return !openingTime || !value || value > openingTime;
      }
    ),

  breakStartTime: Yup.string().required("Break start time is required"),

  breakEndTime: Yup.string()
    .required("Break end time is required")
    .test(
      "is-after",
      "Break end time must be after break start time",
      function (value) {
        const { breakStartTime } = this.parent;
        return !breakStartTime || !value || value > breakStartTime;
      }
    ),
});


const AddStaff: React.FC<AddStaffProps> = ({ onClose }) => {
  const initialValues: IStaff = {
    staffName: "",
    openingTime: "",
    closingTime: "",
    breakStartTime: "",
    breakEndTime: "",
  };

  const handleSubmit = async (values: IStaff, { resetForm }: any) => {
    try {
      values.staffName = values.staffName.toLocaleLowerCase()
      const response = await addStaff(values);
      if (response?.data?.message) {
        toast.success(response.data.message);
      }

      resetForm();
      onClose?.();
    } catch (error: unknown) {
        if(error instanceof AxiosError){
            if(error.response?.data.message){
                toast.error(error.response.data.message)
            }
        }
         onClose?.();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white z-10 pb-2 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Add Staff</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={AddStaffSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form>
              {/* Staff Name Field */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Staff Name
                </label>
                <Field
                  as={Input}
                  name="staffName"
                  placeholder="Enter full name"
                  className="w-full"
                />
                <ErrorMessage
                  name="staffName"
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>

              {/* Working Schedule Section */}
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Working Schedule
              </h3>

              {/* Opening and Closing Time */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Opening Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Opening Time
                  </label>
                  <Field
                    as={Input}
                    type="time"
                    name="openingTime"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="openingTime"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                {/* Closing Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Closing Time
                  </label>
                  <Field
                    as={Input}
                    type="time"
                    name="closingTime"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="closingTime"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>
              </div>

              {/* Break Time Section */}
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Break Schedule
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Break Start Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Break Start Time
                  </label>
                  <Field
                    as={Input}
                    type="time"
                    name="breakStartTime"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="breakStartTime"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>

                {/* Break End Time */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Break End Time
                  </label>
                  <Field
                    as={Input}
                    type="time"
                    name="breakEndTime"
                    className="w-full"
                  />
                  <ErrorMessage
                    name="breakEndTime"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {isSubmitting ? "Saving..." : "Add Staff"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddStaff;
