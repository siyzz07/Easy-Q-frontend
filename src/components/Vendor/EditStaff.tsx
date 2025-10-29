import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { IStaff } from "../../Shared/types/Types";
import { addStaff, editStaff } from "../../Services/VendorApiServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface AddStaffProps {
  onClose?: () => void;
  data: IStaff;
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

  isActive: Yup.string().required("Please select active status"),
});

const EditStaff: React.FC<AddStaffProps> = ({ onClose, data }) => {
  const initialValues: any = {
    staffName: data.staffName,
    openingTime: data.openingTime,
    closingTime: data.closingTime,
    breakStartTime: data.breakStartTime,
    breakEndTime: data.breakEndTime,
    isActive: data.isActive ? 'true' : 'false',
    _id: data._id,
  };

  const handleSubmit = async (values: IStaff, { resetForm }: any) => {
    try {

       const hasChanges = Object.keys(initialValues).some(
              (key) => (values as any)[key] !== (initialValues as any)[key]
            );
      
            if (!hasChanges) {
              toast.info("No changes detected!");
              onClose?.();
              return;
            }
            values.staffName = values.staffName.toLocaleLowerCase()

            console.log(values.isActive);
            
      const updatedValues = {
        ...values,
        isActive: values?.isActive as any === 'true',
      };

     
      

        const response = await editStaff(updatedValues);

      if(response.data.message){
        
        toast.success(response.data.message);
      }


      resetForm();
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
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white z-10 pb-2 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Edit Staff</h2>
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
              {/* Staff Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Staff Name
                </label>
                <Field
                  as={Input}
                  name="staffName"
                  placeholder="Enter full name"
                />
                <ErrorMessage
                  name="staffName"
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>

              {/* Working Schedule */}
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Working Schedule
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Opening Time
                  </label>
                  <Field as={Input} type="time" name="openingTime" />
                  <ErrorMessage
                    name="openingTime"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Closing Time
                  </label>
                  <Field as={Input} type="time" name="closingTime" />
                  <ErrorMessage
                    name="closingTime"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>
              </div>

              {/* Break Schedule */}
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Break Schedule
              </h3>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Break Start Time
                  </label>
                  <Field as={Input} type="time" name="breakStartTime" />
                  <ErrorMessage
                    name="breakStartTime"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Break End Time
                  </label>
                  <Field as={Input} type="time" name="breakEndTime" />
                  <ErrorMessage
                    name="breakEndTime"
                    component="p"
                    className="text-xs text-red-500 mt-1"
                  />
                </div>
              </div>

              {/* Active Status - Radio Buttons */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Active Status
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <Field
                      type="radio"
                      name="isActive"
                      value="true"
                      className="text-blue-600"
                    />
                    <span className="text-gray-800">Active</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Field
                      type="radio"
                      name="isActive"
                      value="false"
                      className="text-blue-600"
                    />
                    <span className="text-gray-800">Inactive</span>
                  </label>
                </div>
                <ErrorMessage
                  name="isActive"
                  component="p"
                  className="text-xs text-red-500 mt-1"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-end">
                <Button
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditStaff;
