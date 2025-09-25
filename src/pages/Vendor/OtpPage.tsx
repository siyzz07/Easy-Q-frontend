import type { FC } from 'react';
import Image from '../../components/Vendor/Image';
import OtpForm from '../../components/Vendor/OtpForm';



const OtpPage:FC= () => {
    console.log("reached");
    
  return (
    <div className="min-h-screen  flex">
      {/* Left side - */}
        <Image/>

      {/* Right side  */}
      <div className="flex-1 bg-slate-800">
      <OtpForm/>
      </div>
    </div>
  );
}

export default OtpPage