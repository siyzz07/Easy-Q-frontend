import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../Services/CustomerApiService";

const LoadingVerify: FC = () => {
  
  //   const handleClick = () => {

  //     setTimeLeft(240);
  //     setIsActive(true);

  //     console.log("Button clicked, timer restarted!");
  //   };

  //   const formatTime = (seconds: number) => {
  //     const m = Math.floor(seconds / 60)
  //       .toString()
  //       .padStart(2, "0");
  //     const s = (seconds % 60).toString().padStart(2, "0");
  //     return `${m}:${s}`;
  //   };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-black">
      {/* Logo and the para */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-[#004f2d] rounded-2xl flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Q</span>
          </div>
          <h1 className="text-2xl font-bold">Easy Q</h1>
        </div>
        <p className="text-gray-500 text-sm pl-20 pr-20 flex items-center">
          Verifying Your Email
          <span className="flex ml-1 space-x-1">
            <span className="animate-bounce [animation-delay:-0.3s]">.</span>
            <span className="animate-bounce [animation-delay:-0.15s]">.</span>
            <span className="animate-bounce">.</span>
          </span>
        </p>
      </div>

      {/* Loader */}
      <div className="mb-6 relative">
        <OrbitProgress color="#666666" size="large" text="" textColor="" />
      </div>

      {/* Button with timer */}
      {/* <div className="w-full max-w-md mx-auto p-6 space-y-4 bg-white ">
        <button
          onClick={handleClick}
          disabled={timeLeft > 0}
          className={`w-full h-12 text-base font-medium rounded-lg 
            ${timeLeft > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
        >
          {timeLeft > 0 ? ` ${formatTime(timeLeft)}` : "Resend"}
        </button>
      </div> */}
    </div>
  );
};

export default LoadingVerify;
