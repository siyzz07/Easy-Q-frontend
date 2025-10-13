import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

interface ModalProps {
  name: string;
  email: string;
  phone: string;
  onClose: () => void;
}

interface FormValues {
  name: string;
  email: string;
  phone: string;
}

const EditProfileModal: React.FC<ModalProps> = ({ name, email, phone, onClose }) => {
  const initialValues: FormValues = {
    name,
    email,
    phone,
  };

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    alert(`Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}`);
    onClose(); // close modal after submit
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000068] bg-opacity-60">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Edit Address</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-800 text-xl font-bold"
          >
            X
          </button>
        </div>

        {/* Form */}
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                  required
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  readOnly
                  placeholder="Enter email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1 disabled:cursor-not-allowed"
                  required
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <Field
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none mt-1"
                  required
                />
                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition"
              >
                {isSubmitting ? "Submitting..." : "Save Changes"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditProfileModal;
