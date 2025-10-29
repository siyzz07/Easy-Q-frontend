import React, { useEffect } from "react";
import type { FC } from "react";
import Image from "../../components/Shared/Image";
import image from "../../assets/customer-login-image.png";
import LoadingVerify from "../../components/Shared/LoadingVerify";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyEmail } from "../../Services/CustomerApiService";
import { toast } from "react-toastify";

const LoadingPage: FC = () => {

const [searchParams] = useSearchParams();
const token: string | null = searchParams.get("token");
const navigate = useNavigate();
useEffect(() => {

  verify();
});



  const verify = async () => {
    try {
      if (token != null) {
        const response = await verifyEmail(token);
        
        if (response){

          setTimeout(()=>{
          navigate ("/customer/login");
          toast.success(response.data);
        },3000);
        }

      }else{
        toast.error("Token not found");
        navigate("/customer/login");
      }

    } catch (error:any) {

      if(error?.response?.data){
        toast.error(error.response.data.message);
      }
      navigate("/customer/login");

    }
  };



  return (
    <div className="min-h-screen  flex">
      <Image
        image={image}
        style={"bg-gradient-to-b from-[#F3F3F3] to-[#E6E0DD]"}
      />

      {/* Right side  */}
      <div className="flex-1  bg-white">
        <LoadingVerify style="#666666" />
      </div>
       
    </div>
  );
};

export default LoadingPage;
