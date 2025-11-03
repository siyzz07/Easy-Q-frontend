import React, { useEffect, useRef } from "react";
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
  const hasVerified = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Prevent duplicate execution (React Strict Mode)
    if (hasVerified.current) return;
    hasVerified.current = true;

    const verify = async () => {
      try {
        if (!token) {
          toast.error("Token not found");
          navigate("/customer/login");
          return;
        }

        const response = await verifyEmail(token);

        if (response){

          setTimeout(()=>{
          navigate ("/customer/login");
          toast.success(response.data);
        },3000);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Verification failed");
        navigate("/customer/login");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex">
      <Image
        image={image}
        style="bg-gradient-to-b from-[#F3F3F3] to-[#E6E0DD]"
      />

      <div className="flex-1 bg-white">
        <LoadingVerify style="#666666" />
      </div>
    </div>
  );
};

export default LoadingPage;
