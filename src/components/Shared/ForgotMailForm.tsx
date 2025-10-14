import type { FC } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface IForgotMailForm {
  onSubmit: (email: string) => void;
  style?: string;
  heading:string
}

const ForgotMailForm: FC<IForgotMailForm> = ({ onSubmit, style,heading }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .email("Invalid email")
      .required("Email is required"),
  });

  const initialValues = {
    email: "",
  };

  const handleSubmit = (values: typeof initialValues) => {
    
    onSubmit(values.email);
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-8 ${heading} ${style}`}>
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h1 className="text-2xl font-bold">Easy Q</h1>
        </div>
        <p className="text-gray-500 text-sm">
          Enter your email below
          <br />
          You will receive a verification link to reset your password in your inbox.
        </p>
      </div>

      <div className={`w-full max-w-md mx-auto p-6 space-y-4 rounded-3xl ${style}`}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-4">
              <div>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-400 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-medium rounded-lg cursor-pointer"
              >
                Send mail
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ForgotMailForm;
