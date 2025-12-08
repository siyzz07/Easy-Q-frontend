import React, { useEffect, useState, type FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import type { FormikHelpers } from "formik";
import { getAddress } from "../../Services/CustomerApiService";
import { getServiceTypes } from "../../Services/AdminApiService"; 
import type { ICustomerAddress } from "../../Shared/types/Types";
import { addContract, getServiceTypesForcontract } from "../../Services/ContractApiService";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface IAddContractModal {
  onClose: () => void;
  onSubmit: () => void;
}

export interface IAddContractInitialValues {
  contractName: string;
  description: string;
  phone: string;
  address: string;
  serviceType: string;
}

const AddContractModal: FC<IAddContractModal> = ({ onClose, onSubmit }) => {
  const [addresses, setAddresses] = useState<ICustomerAddress[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    getCustomerAddressAndServiceTypes();
  }, []);

  const getCustomerAddressAndServiceTypes = async () => {
    try {
      const [serviceTypeResponse, addressResponse] = await Promise.all([
        getServiceTypesForcontract(),
        getAddress(),
      ]);

      if (addressResponse?.data?.data) {
        setAddresses(addressResponse.data.data);
      }

      if (serviceTypeResponse?.data?.data) {
        setServices(serviceTypeResponse.data.data);
      }
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  const initialValues: IAddContractInitialValues = {
    contractName: "",
    description: "",
    phone: "",
    address: "",
    serviceType: "",
  };

  const validationSchema = Yup.object({
    contractName: Yup.string()
      .trim()
      .matches(/^[A-Za-z0-9 ]+$/, "Only alphabets, numbers and spaces are allowed")
      .min(3, "Minimum 3 characters")
      .required("Contract name is required"),

    description: Yup.string()
      .required("Description is required")
      .min(10, "Minimum 10 characters"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit phone number")
      .required("Phone number is required"),

    address: Yup.string().required("Address is required"),

    serviceType: Yup.string().required("Service type is required"),
  });

  const handleSubmit = async (
    values: IAddContractInitialValues,
    actions: FormikHelpers<IAddContractInitialValues>
  ) => {
    try {
      const response = await addContract(values);

      if (response?.data) {
        toast.success(response.data.message);
        onClose();
      }

      actions.setSubmitting(false);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
      }
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000066] backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative">

        {/* Header */}
        <div className="flex items-center justify-between mb-6 sticky top-0 bg-white z-10 pb-2 border-b">
          <h2 className="text-2xl font-semibold text-gray-900">Add Contract</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* FORM */}
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting, isValid }) => (
            <Form className="flex flex-col gap-4">

              {/* Contract Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Contract Name</label>
                <Field
                  type="text"
                  name="contractName"
                  placeholder="Enter contract name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mt-1 outline-none"
                />
                <ErrorMessage name="contractName" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <Field
                  as="textarea"
                  rows={3}
                  name="description"
                  placeholder="Enter description"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mt-1 outline-none"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 mt-1 outline-none"
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <Field
                  as="select"
                  name="address"
                  className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 mt-1 outline-none"
                >
                  <option value="">Select Address</option>
                  {addresses.map((item) => (
                    <option key={item._id} value={item._id}>
                      {`${item.address}, ${item.city}`}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Service Type</label>
                <Field
                  as="select"
                  name="serviceType"
                  className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 mt-1 outline-none"
                >
                  <option value="">Select Service</option>
                  {services.map((service) => (
                    <option key={service._id} value={service._id}>
                      {service.serviceName}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="serviceType" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`w-full py-2 rounded-md text-white font-semibold transition ${
                  isSubmitting || !isValid ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Save Contract"}
              </button>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
};

export default AddContractModal;
