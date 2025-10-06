import React, { useEffect } from "react";
import type { FC } from "react";
import Image from "../../components/Shared/Image";
import image from "../../assets/vendor-login-image.png";
import LoadingVerify from "../../components/Shared/LoadingVerify";
import { useNavigate, useSearchParams } from "react-router-dom";

import { toast } from "react-toastify";
import { addVendor } from "../../Services/VendorApiServices";

const LoadingPage: FC = () => {

const [searchParams] = useSearchParams();
const token: string | null = searchParams.get("token");
const navigate = useNavigate()
useEffect(() => {

  verify()
},[]);



  const verify = async () => {
    try {
      if (token != null) {
  
        const response = await addVendor(token)
        
        if (response){

          setTimeout(()=>{
          navigate ('/vendor/login')
          toast.success(response.data)
        },3000)
        }

      }else{
        toast.error('Token not found')
        navigate('/vendor/login')
      }

    } catch (error:any) {

      if(error?.response?.data){
        toast.error(error.response.data)
      }
      navigate('/vendor/login')

    }
  };



  return (
    <div className="min-h-screen  flex">
      <Image
        image={image}
        style={"bg-gradient-to-b from-[#F3F3F3] to-[#E6E0DD]"}
      />

      {/* Right side  */}
      <div className="flex-1  bg-slate-800">
        <LoadingVerify style="#ffffff" />
      </div>
       
    </div>
  );
};

export default LoadingPage;
