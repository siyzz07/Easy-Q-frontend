import React from 'react'
import image from '../../assets/customer-login-image.png'

const Image = () => {
  return (
     <div className="flex-1 hidden md:flex   bg-gradient-to-b from-[#F3F3F3] to-[#E6E0DD]  items-center justify-center">
        <img
          src={image}
          alt="Construction workers with booking schedule"
          className="object-contain max-w-full max-h-full"
        />
      </div>
  )
}

export default Image