import axios from "axios";
import { string } from "yup";

export const uploadToCloudinary = async (file: File, folder = "shop-images") => {
  if (!file) return "";

  const cloudinaryName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset); 
  formData.append("folder", folder);             
  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    // return response.data.secure_url; 
    return response.data;
  } catch (error: any) {
    console.error("Cloudinary upload error:", error.response?.data || error.message);
    return "";
  }
};


