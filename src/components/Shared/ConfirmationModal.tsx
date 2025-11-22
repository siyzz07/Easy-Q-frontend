import React from "react";
import type { FC } from "react";
import { X, AlertTriangle } from "lucide-react";

interface IConfirmationModal {
  submit?: (payload?:string) => void;
  text?: string;
  bg?: string;
  close?: () => void;
  description?: string;
  payload?:string
  
}

const ConfirmationModal: FC<IConfirmationModal> = ({
  submit,
  text,
  description,
  close,
  payload,
  bg = "bg-red-600",

}) => {
  


  const handleSubmit = () =>{

      if(submit) submit(payload);
        if(close)close();


  };
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative p-6">
        {/* Close Button */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex flex-col items-center text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">{text}</h3>
          <p className="text-sm text-gray-500 mt-2">{description}</p>

          {/* Buttons */}
          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={handleSubmit}
              className={`${bg} text-white px-5 py-2 rounded-lg hover:opacity-90 transition`}
            >
              Yes, Confirm
            </button>
            <button
              onClick={close}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
