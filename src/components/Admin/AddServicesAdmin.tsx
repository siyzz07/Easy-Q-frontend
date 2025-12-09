import React, { type FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addServiceType } from "../../Services/ApiService/AdminApiService";
import { AxiosError } from "axios";
import { toast } from "react-toastify";


const validationSchema = Yup.object({
  serviceName: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Only letters and spaces allowed")
    .trim()
    .required("Service name is required")
    .test("not-empty", "Cannot be empty or spaces", (val) => val?.trim() !== ""),
  description: Yup.string()
    .min(5, "Description must be at least 5 characters")
    .trim()
    .required("Description is required")
    .test("not-empty", "Cannot be empty or spaces", (val) => val?.trim() !== ""),
});

const initialValues = {
  serviceName: "",
  description: "",
};

interface IAddServicesAdmin{
    onClose :()=>void
}

const AddServicesAdmin :FC<IAddServicesAdmin> = ({ onClose}) => {



   const handleSubmit = async (values:any) => {
    try{

      
      const response = await addServiceType(values)
      
      if(response?.data?.message){
        toast.success(response.data.message)
      }
      onClose()
      
      
    }catch(error:unknown){
      if(error instanceof AxiosError){
          toast.error(error.response?.data.message )
      }
      console.log('error to add new Service type');
      onClose()
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white z-10 pb-2 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Add Service</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, isValid }) => (
            <Form className="flex flex-col gap-4">
              {/* Service Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Service Name
                </label>
                <Field
                  type="text"
                  name="serviceName"
                  placeholder="Enter service name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                />
                <ErrorMessage
                  name="serviceName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  placeholder="Enter description"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1 resize-none"
                  rows="3"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`w-full py-2 rounded-md text-white font-semibold transition ${
                  isSubmitting || !isValid
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Add Service"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddServicesAdmin;
