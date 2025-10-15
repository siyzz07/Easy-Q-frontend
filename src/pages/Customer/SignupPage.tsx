
import Image from "../../components/Shared/Image";
import image from "../../assets/customer-login-image.png";

import SignupForm from "../../components/Customer/SignupForm";

const SignupPage = () => {
  return (
    <div className="min-h-screen  flex">
      {/* Left side  */}
      <Image
        image={image}
        style={"bg-gradient-to-b from-[#F3F3F3] to-[#E6E0DD]"}
      />

      {/* Right side  */}
      <div className="flex-1  bg-white">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
