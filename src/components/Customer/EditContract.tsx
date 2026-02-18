import  { useEffect, useState, type FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import {
  X,
  ClipboardList,
  Activity,
  UserPlus,
  Loader2,
} from "lucide-react";

import { getAddress } from "../../Services/ApiService/CustomerApiService";
import { getServiceTypes } from "../../Services/ApiService/AdminApiService";
import { editContractData } from "../../Services/ApiService/ContractApiService";
import type {
  IContractData,
  ICustomerAddress,
  IServiceVendorTypes,
} from "../../Shared/types/Types";

export interface IUpdateContractValues {
  contractName: string;
  description: string;
  phone: string;
  address: string;
  serviceType: string;
  status: string;
  isHiring: boolean;
}

interface IContractModalProps {
  onClose: () => void;
  contractData?: IContractData;
}

const EditContract: FC<IContractModalProps> = ({ onClose, contractData }) => {
  const [addresses, setAddresses] = useState<ICustomerAddress[]>([]);
  const [services, setServices] = useState<IServiceVendorTypes[]>([]);

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
    status: Yup.string().required("Required"),
    isHiring: Yup.boolean(),
  });

  const handleSubmit = async (values: IUpdateContractValues) => {
    try {
      let noChanged =
        values.address == contractData?.address._id &&
        values.contractName == contractData.contractName &&
        values.description == contractData.description &&
        values.phone == contractData.address.phone &&
        values.serviceType == contractData.serviceType._id &&
        values.status == contractData.status &&
        values.isHiring == contractData.isHiring;
      if (noChanged) {
        onClose();
        toast.info("No changes found");
        return;
      }


    


      const response = await editContractData(
        contractData?._id as string,
        values,
      );
      if (response.data.success) {
        onClose();
        toast.success(response.data.message);
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        onClose();
        toast.error(error.response?.data.message || "Error updating contract");
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-xl flex flex-col max-h-[92vh] overflow-hidden border border-slate-200">
        {/* Modern Header */}
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Contract Settings
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Refine your project requirements and status.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-slate-600"
          >
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="overflow-y-auto px-8 py-6 custom-scrollbar">
          <Formik
            initialValues={{
              contractName: contractData?.contractName || "",
              description: contractData?.description || "",
              phone: contractData?.address?.phone || "",
              address: contractData?.address?._id || "",
              serviceType: contractData?.serviceType?._id || "",
              status: contractData?.status || "open",
              isHiring: contractData?.isHiring || false,
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-6">
                {/* Status Dashboard Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <Activity size={14} className="text-blue-500" /> Current
                      Status
                    </label>
                    <Field
                      as="select"
                      name="status"
                      className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none cursor-pointer"
                    >
                      <option value="open"> Open </option>
                      <option value="in_progress"> In Progress</option>
                      <option value="completed"> Completed</option>
                      <option value="cancelled"> Cancelled</option>
                    </Field>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                      <UserPlus size={14} className="text-blue-500" />{" "}
                      Recruitment
                    </label>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-slate-700">
                        {values.isHiring ? "Hiring Active" : "Closed"}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setFieldValue("isHiring", !values.isHiring)
                        }
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${values.isHiring ? "bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.3)]" : "bg-slate-300"}`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${values.isHiring ? "translate-x-6" : "translate-x-1"}`}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-100" />

                {/* Basic Info */}
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Project Title
                    </label>
                    <div className="relative">
                      <ClipboardList
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                      />
                      <Field
                        name="contractName"
                        placeholder="Project Name"
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none text-slate-700 font-medium"
                      />
                    </div>
                    <ErrorMessage
                      name="contractName"
                      component="p"
                      className="text-red-500 text-xs font-medium ml-1"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 ml-1">
                        Service
                      </label>
                      <Field
                        as="select"
                        name="serviceType"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-700 font-medium"
                      >
                        <option value="">Select category</option>
                        {services.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.serviceName}
                          </option>
                        ))}
                      </Field>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-slate-700 ml-1">
                        Contact Phone
                      </label>
                      <Field
                        name="phone"
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-700 font-medium"
                        placeholder="Primary phone"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Deployment Location
                    </label>
                    <Field
                      as="select"
                      name="address"
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-700 font-medium"
                    >
                      <option value="">Select an address</option>
                      {addresses.map((a) => (
                        <option key={a._id} value={a._id}>
                          {a.address}, {a.city}
                        </option>
                      ))}
                    </Field>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700 ml-1">
                      Work Description
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      rows={4}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:border-blue-500 outline-none text-slate-700 font-medium resize-none"
                      placeholder="Provide clear requirements..."
                    />
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 flex gap-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all active:scale-95"
                  >
                    Discard
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-500/20 disabled:bg-slate-200 disabled:shadow-none transition-all active:scale-95 flex justify-center items-center gap-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      "Save Updates"
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
