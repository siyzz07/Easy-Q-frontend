import React, { useEffect } from "react";
import Image from "../../components/Shared/Image";
import image from "../../assets/customer-login-image.png";
import ResetPasswordForm from "../../components/Shared/ResetPasswordForm";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  resetPasword,
  verificationForResetPassword,
} from "../../Services/ApiService/VendorApiServices";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { resetCustomerPasword } from "../../Services/ApiService/CustomerApiService";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/customer/login");
    }
  }, [token, navigate]);

  const submit = async (password: string, role:string) => {
    try {
      if (token && password) {
        let data = {
          token: token,
          password: password,
          role
        };
        const response = await resetCustomerPasword(data);
        if (response.data.message) {
          toast.success(response.data.message);
          navigate("/customer/login");
        }
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error);

        if (error.response?.data) {
          console.log(error);
          toast.error(error.response?.data);
          navigate("/customer/login");
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
      <div className="flex-1 bg-slate-800">
        <ResetPasswordForm onSubmit={submit} role='customer' />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
