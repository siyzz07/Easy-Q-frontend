import React, { useEffect, useState, type FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  X,
  ClipboardList,
  Phone,
  MapPin,
  Briefcase,
  AlignLeft,
} from "lucide-react";

// API Imports
import { getAddress } from "../../Services/ApiService/CustomerApiService";
import { getServiceTypes } from "../../Services/ApiService/AdminApiService";
import { addContract, editContractData } from "../../Services/ApiService/ContractApiService";
import type {
  IContractData,
  ICustomerAddress,
  IServiceVendorTypes,
} from "../../Shared/types/Types";

export interface IAddContractInitialValues {
  contractName: string;
  description: string;
  phone: string;
  address: string;
  serviceType: string;
}

interface IContractModalProps {
  onClose: () => void;
  //   onSubmit: (values: IAddContractInitialValues,isEditMode:boolean,contractId?:string) => void;
  contractData?: IContractData;
}

const EditContract: FC<IContractModalProps> = ({ onClose, contractData }) => {
  const [addresses, setAddresses] = useState<ICustomerAddress[]>([]);
  const [services, setServices] = useState<IServiceVendorTypes[]>([]);

  console.log("contractData :>> ", contractData);

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const [serviceRes, addressRes] = await Promise.all([
        getServiceTypes(),
        getAddress(),
      ]);

      if (serviceRes.data && addressRes.data) {
        setAddresses(addressRes.data.data || []);
        setServices(serviceRes.data.data || []);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to load options");
    }
  };

  const validationSchema = Yup.object({
    contractName: Yup.string().trim().min(3, "Too short!").required("Required"),
    description: Yup.string()
      .min(10, "Provide more detail")
      .required("Required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid phone")
      .required("Required"),
    address: Yup.string().required("Select an address"),
    serviceType: Yup.string().required("Select a service"),
  });

  const handleSubmit = async(values: IAddContractInitialValues, actions: any) => {
    try {
      let noChanged =
        values.address == contractData?.address._id &&
        values.contractName == contractData.contractName &&
        values.description == contractData.description &&
        values.phone == contractData.address.phone &&
        values.serviceType == contractData.serviceType._id;

        if(noChanged){
            toast.info('no changes found')
            onClose()
        }

        const response = await editContractData(contractData?._id as string,values)

        if(response.data.success){
            onClose()
            toast.success(response.data.message)
        }

    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || 'error to edit contract')
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col max-h-[90vh] overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edit Contract</h2>
            <p className="text-xs text-gray-500 mt-1">
              Manage your service details here.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-6">
          <Formik
            initialValues={{
              contractName: contractData?.contractName as string,
              description: contractData?.description as string,
              phone: contractData?.address.phone as string,
              address: contractData?.address._id as string,
              serviceType: contractData?.serviceType._id as string,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <ClipboardList size={16} className="text-blue-500" />{" "}
                    Contract Name
                  </label>
                  <Field
                    name="contractName"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Garden Maintenance"
                  />
                  <ErrorMessage
                    name="contractName"
                    component="p"
                    className="text-red-500 text-[10px] italic"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Briefcase size={16} className="text-blue-500" /> Service
                      Type
                    </label>
                    <Field
                      as="select"
                      name="serviceType"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                    >
                      <option value="">Select Service</option>
                      {services.map((s) => (
                        <option key={s._id} value={s._id}>
                          {s.serviceName}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="serviceType"
                      component="p"
                      className="text-red-500 text-[10px] italic"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                      <Phone size={16} className="text-blue-500" /> Phone
                    </label>
                    <Field
                      name="phone"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                      placeholder="10-digit phone"
                    />
                    <ErrorMessage
                      name="phone"
                      component="p"
                      className="text-red-500 text-[10px] italic"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <MapPin size={16} className="text-blue-500" /> Location /
                    Address
                  </label>
                  <Field
                    as="select"
                    name="address"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                  >
                    <option value="">Select saved address</option>
                    {addresses.map((a) => (
                      <option key={a._id} value={a._id}>
                        {a.address}, {a.city}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="text-red-500 text-[10px] italic"
                  />
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                    <AlignLeft size={16} className="text-blue-500" />{" "}
                    Description
                  </label>
                  <Field
                    as="textarea"
                    name="description"
                    rows={3}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg outline-none"
                    placeholder="Enter terms..."
                  />
                  <ErrorMessage
                    name="description"
                    component="p"
                    className="text-red-500 text-[10px] italic"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] px-4 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-md disabled:bg-blue-300 transition-all flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Update Changes"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default EditContract;
