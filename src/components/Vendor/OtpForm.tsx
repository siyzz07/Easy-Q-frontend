
import type { FC } from "react";

const OtpForm: FC = () => {


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-white">
      {/* Logo and the para */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h1 className="text-2xl font-bold">Easy Q</h1>
        </div>
        <p className="text-gray-300 text-sm">
       Enter the OTP that was sent to your email.
        </p>
      </div>


   
      <div className="w-full max-w-md mx-auto p-6 space-y-4 bg-slate-800 rounded-3xl ">
   
        <div>
          <input
            id="otp"
            type="text"
            placeholder="Enter OTP"
            className="w-full mt-1 px-3 h-12 rounded-lg bg-white border-2 border-gray-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white h-12 text-base font-medium rounded-lg">
          Submit
        </button>
      </div>
    </div>
  );
};

export default OtpForm;
