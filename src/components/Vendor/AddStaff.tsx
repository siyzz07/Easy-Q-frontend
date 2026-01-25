import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { addStaff } from "../../Services/ApiService/VendorApiServices";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import type { IStaff } from "../../Shared/types/Types";

interface AddStaffProps {
  onClose?: () => void;
}

// Validation Schema
const AddStaffSchema = Yup.object().shape({
  staffName: Yup.string()
    .required("Staff name is required")
    .min(3, "Name must be at least 3 characters long"),

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
        breakStartTime: Yup.string()
          // .required("Break start is required")
          .test("within-hours-start", "Break start must be within working hours", function (value) {
            const { openingTime, closingTime } = this.options.context || {};
            if (!openingTime || !closingTime || !value) return true;
            return value >= openingTime && value < closingTime;
          }),

        breakEndTime: Yup.string()
          // .required("Break end is required")
          .test("is-after", "Break end must be after break start", function (value) {
            const { breakStartTime } = this.parent;
            return !breakStartTime || !value || value > breakStartTime;
          })
          .test("within-hours-end", "Break end must be within working hours", function (value) {
            const { openingTime, closingTime } = this.options.context || {};
            if (!openingTime || !closingTime || !value) return true;
            return value > openingTime && value <= closingTime;
          }),
      })
    )
    .max(5, "You can add up to 5 break times only"),
});

const AddStaff: React.FC<AddStaffProps> = ({ onClose }) => {
  const [timeBreak, setTimeBreak] = useState<boolean>(false);

  const initialValues = {
    staffName: "",
    openingTime: "",
    closingTime: "",
    breaks: [{ breakStartTime: "", breakEndTime: "" }],
  };

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      console.log(values);

      values.staffName = values.staffName.toLocaleLowerCase();
      const response = await addStaff(values as IStaff);
      if (response?.data?.message) {
        toast.success(response.data.message);
      }
      resetForm();
      onClose?.();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
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

        <Formik
          initialValues={initialValues}
          validationSchema={AddStaffSchema}
          onSubmit={handleSubmit}
        >
          {({ values, isSubmitting, isValid }) => (
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

              {/* Working Hours */}
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Working Hours
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

              {/* Break Times */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900">
                  Break Times
                </h3>
                {/* + Icon for Adding Break */}
                {values.breaks.length < 5 && (
                  <button
                    type="button"
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full transition"
                    onClick={() => {
                      values.breaks.push({
                        breakStartTime: "",
                        breakEndTime: "",
                      });
                      setTimeBreak(!timeBreak);
                    }}
                    title="Add Break"
                  >
                    <Plus className="w-5 h-5 text-blue-700" />
                  </button>
                )}
              </div>

              {/* <FieldArray name="breaks">
                {({ remove, push }) => (
                  <div className="space-y-4">
                    {values.breaks.map((_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-2 gap-4 items-end border rounded-md p-3 relative "
                      >
                        <div className=" flex gap-x-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Start
                          </label>
                          <Field as={Input} type="time" name={`breaks[${index}].breakStartTime`} />
                          <ErrorMessage
                            name={`breaks[${index}].breakStartTime`}
                            component="p"
                            className="text-xs text-red-500 mt-1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            End
                          </label>
                          <Field as={Input} type="time" name={`breaks[${index}].breakEndTime`} />
                          <ErrorMessage
                            name={`breaks[${index}].breakEndTime`}
                            component="p"
                            className="text-xs text-red-500 mt-1"
                          />
                        </div>
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
              </FieldArray> */}

              <FieldArray name="breaks">
                {({ remove, push }) => (
                  <div className="space-y-4">
                    {values.breaks.map((_, index) => (
                      <div
                        key={index}
                        className="relative border border-gray-200 rounded-xl p-4 shadow-sm bg-gray-50"
                      >
                        {/* Break Input Row */}
                        <div className="grid grid-cols-2 gap-6">
                          {/* Start Time */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Start
                            </label>
                            <Field
                              as={Input}
                              type="time"
                              name={`breaks[${index}].breakStartTime`}
                              className="w-full"
                            />
                            <ErrorMessage
                              name={`breaks[${index}].breakStartTime`}
                              component="p"
                              className="text-xs text-red-500 mt-1"
                            />
                          </div>

                          {/* End Time */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              End
                            </label>
                            <Field
                              as={Input}
                              type="time"
                              name={`breaks[${index}].breakEndTime`}
                              className="w-full"
                            />
                            <ErrorMessage
                              name={`breaks[${index}].breakEndTime`}
                              component="p"
                              className="text-xs text-red-500 mt-1"
                            />
                          </div>
                        </div>

                        {/* Remove Button */}
                        {values.breaks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute -top-3 -right-3 bg-red-100 hover:bg-red-200 rounded-full p-1 transition"
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

              {/* Submit */}
              <div className="flex justify-end mt-6">
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
