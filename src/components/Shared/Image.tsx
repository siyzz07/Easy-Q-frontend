import React, { type FC } from "react";
import image from "../../assets/customer-login-image.png";
import type { IimageProp } from "../../Shared/types/Types";

const Image :FC<IimageProp> = ({image,style}) => {
  return (
     <div className={`flex-1 hidden md:flex ${style}    items-center justify-center`}>
        <img

          src={image}
          alt="Construction workers with booking schedule"
          className="object-contain max-w-full max-h-full"
        />
      </div>
  );
};

export default Image;