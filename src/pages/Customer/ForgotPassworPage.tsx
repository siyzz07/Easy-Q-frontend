import React from "react";
import Image from "../../components/Shared/Image";
import image from "../../assets/customer-login-image.png";
import ForgotMailForm from "../../components/Shared/ForgotMailForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verificationForResetPassword } from "../../Services/CustomerApiService";
import { AxiosError } from "axios";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const submit = async (email: string) => {
    try {
      const response = await verificationForResetPassword(email);

      if (response) {
        toast.info(
          "Please verify your email. We have sent a verification link to your email address.",
          { autoClose: 5000 }
        );
        navigate("/vendor/login");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        } else {
          console.log("email verify error ");
        }
      }
    }
  };
  
  return (
    <div className="min-h-screen  flex">
      <Image
        image={image}
        style={"bg-gradient-to-b from-[#F6F3F1] to-[#E6E0DD]"}
      />

      {/* Right side  */}
      <div className="flex-1 bg-white">
        <ForgotMailForm onSubmit={submit} style="bg-white" heading='text-black'/>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;