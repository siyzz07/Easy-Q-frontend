import Image from "../../components/Shared/Image";
import image from "../../assets/customer-login-image.png";
import ForgotMailForm from "../../components/Shared/ForgotMailForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verificationForResetPassword } from "../../Services/ApiService/CustomerApiService";
import { AxiosError } from "axios";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const submit = async (email: string,role:string) => {
    try {
      const response = await verificationForResetPassword({email,role});

      if (response) {
        toast.info(
          "Please verify your email. We have sent a verification link to your email address.",
          { autoClose: 5000 }
        );
        navigate("/customer/login");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
      
        
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
           navigate("/customer/login");
          } else {
            console.log("email verify error ");
          }
          navigate("/customer/login");
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
        <ForgotMailForm onSubmit={submit} style="bg-white" heading='text-black' role='customer'/>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;