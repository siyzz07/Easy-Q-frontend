import React, { useEffect, useState } from "react";
import type { FC } from "react";
import { OrbitProgress } from "react-loading-indicators";
import { useSearchParams } from "react-router-dom";


interface LoadingVerifyProps {
  style: string;
}

const LoadingVerify: FC<LoadingVerifyProps> = ({ style }) => {
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-black">
      {/* Logo and the para */}
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-[#004f2d] rounded-2xl flex items-center justify-center mr-3">
            <span style={{ color: style }} className=" font-bold text-xl">Q</span>
          </div>
          <h1 style={{ color: style }}  className="text-2xl font-bold">Easy Q</h1>
        </div>
        <p
          style={{ color: style }}
          className="text-sm pl-20 pr-20 flex items-center"
        >
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
        <OrbitProgress color={style} size="large" text="" textColor="" />
      </div>


    </div>
  );
};

export default LoadingVerify;
