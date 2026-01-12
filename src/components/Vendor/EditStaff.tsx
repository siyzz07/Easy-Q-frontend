import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import type { IBreakTime, IStaff } from "../../Shared/types/Types";
import { editStaff } from "../../Services/ApiService/VendorApiServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface EditStaffProps {
  onClose?: () => void;
  data: IStaff;
}


const EditStaffSchema = Yup.object().shape({
  staffName: Yup.string()
    .required("Staff name is required")
    .min(1, "Name must be at least 3 characters long"),

  openingTime: Yup.string().required("Opening time is required"),

  closingTime: Yup.string()
    .required("Closing time is required")
    .test("is-after", "Closing time must be after opening time", function (value) {
      const { openingTime } = this.parent;
      return !openingTime || !value || value > openingTime;
    }),

  breaks: Yup.array()
    .of(
      Yup.object().shape({
        breakStartTime: Yup.string().required("Break start is required"),
        breakEndTime: Yup.string()
          .required("Break end is required")
          .test("is-after", "Break end must be after start", function (value) {
            const { breakStartTime } = this.parent;
            return !breakStartTime || !value || value > breakStartTime;
          }),
      })
    )
    .max(5, "You can add up to 5 break times only")
    .test("no-overlap", "Breaks cannot overlap", function (breaks) {
      if (!breaks) return true;
      const sorted = [...breaks].sort(
        (a, b) => a.breakStartTime.localeCompare(b.breakStartTime)
      );
      for (let i = 1; i < sorted.length; i++) {
        if (sorted[i].breakStartTime < sorted[i - 1].breakEndTime) return false;
      }
      return true;
    }),

  isActive: Yup.string().required("Please select active status"),
});

const EditStaff: React.FC<EditStaffProps> = ({ onClose, data }) => {
  let [update,setUpdate] = useState<boolean>(false);
  let [breakTimes,setBreakTimes ] =  useState<IBreakTime[]>(data.breaks);

  const initialValues: any = {
    staffName: data.staffName,
    openingTime: data.openingTime,
    closingTime: data.closingTime,
    breaks:
      data.breaks && data.breaks.length > 0
        ? data.breaks
        : [{ breakStartTime: "" , breakEndTime: "" }],
    isActive: data.isActive ? "true" : "false",
    _id: data._id,
  };

  const handleSubmit = async (values: IStaff, { resetForm }: any) => {
    try {
      const hasChanges = Object.keys(initialValues).some(
        (key) => JSON.stringify((values as any)[key]) !== JSON.stringify((initialValues as any)[key])
      );

      if (!hasChanges) {
        toast.info("No changes detected!");
        onClose?.();
        return;
      }

      values.staffName = values.staffName.toLowerCase();

       const updatedValues = {
        ...values,
        isActive: values?.isActive as any === "true",
      };

      const response = await editStaff(updatedValues);

      if (response.data.message) {
        toast.success(response.data.message);
      }

      resetForm();
      onClose?.();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data.message) {
        toast.error(error.response.data.message);
      }
      onClose?.();
    }
  };



  console.log("data :>> ", data);
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
          validationSchema={EditStaffSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, isValid }) => (
            <Form>
              {/* Staff Name */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Staff Name
                </label>
                <Field as={Input} name="staffName" placeholder="Enter full name" />
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
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-900">Break Schedule</h3>
                {values.breaks.length < 5 && (
                  <button
                    type="button"
                    onClick={() => {
                      setUpdate(!update);
                        let i = 0;
                        // while (i == breakTimes.length){
                        //   // values.breaks.push({ breakStartTime:breakTimes[i].breakStartTime, breakEndTime:breakEndTime})
                        // }
                       
                      values.breaks.length < 5 && values.breaks.push({ breakStartTime: "", breakEndTime: "" });
                    
                    
                    }}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-full p-2 transition"
                    title="Add Break"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                )}
              </div>

              <FieldArray name="breaks">
                {({ remove, push }) => (
                  <div className="space-y-4 mb-6">
                    {values.breaks.map((_: any, index: number) => (
                      <div
                        key={index}
                        className="relative border rounded-lg p-3 flex flex-col sm:flex-row sm:items-end sm:gap-4"
                      >
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Start
                          </label>
                          <Field
                            as={Input}
                            type="time"
                            name={`breaks[${index}].breakStartTime`}
                          />
                          <ErrorMessage
                            name={`breaks[${index}].breakStartTime`}
                            component="p"
                            className="text-xs text-red-500 mt-1"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            End
                          </label>
                          <Field
                            as={Input}
                            type="time"
                            name={`breaks[${index}].breakEndTime`}
                          />
                          <ErrorMessage
                            name={`breaks[${index}].breakEndTime`}
                            component="p"
                            className="text-xs text-red-500 mt-1"
                          />
                        </div>

                        {values.breaks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute -right-3 -top-3 bg-red-100 hover:bg-red-200 rounded-full p-1 transition"
                            title="Remove Break"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </FieldArray>

              {/* Active Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Active Status
                </label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2">
                    <Field type="radio" name="isActive" value="true" />
                    <span className="text-gray-800">Active</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <Field type="radio" name="isActive" value="false" />
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
              <div className="flex justify-end gap-3">
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
