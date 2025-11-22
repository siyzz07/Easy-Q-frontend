import React, { useState, type FC } from "react";
import { Trash2 } from "lucide-react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ConfirmationModal from "./ConfirmationModal";
import { toast } from "react-toastify";

interface IShopImageUpdate {
  use: "upload" | "preview";
  data?: string;
  imageId?:string
  url?:string
  publicId?:string
  onClose: () => void;
  onSave: (image: File | null) => void; 
  isVendor:boolean
  onDelete?:(id:string,imageId:string)=>void
}


const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const ImageSchema = Yup.object().shape({
  image: Yup.mixed()
    .required("Please select an image")
    .test("fileType", "Only JPG, PNG, WEBP allowed", (value: any) => {
      if (!value) return false;
      return ALLOWED_TYPES.includes(value.type);
    })
    .test("fileSize", "File size must be less than 5MB", (value: any) => {
      if (!value) return false;
      return value.size <= 5 * 1024 * 1024;
    }),
});

const ShopImageUpload: FC<IShopImageUpdate> = ({ isVendor,use, data, onClose, onSave ,url,publicId,onDelete,imageId}) => {
  const [preview, setPreview] = useState<string | null>(data || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [confirmation,setComfirmation] = useState<boolean>(false) 


    const dedteImage = (id:string|undefined) =>{
      if(id && imageId){
        onDelete?.(id,imageId)
      }else{
        toast.error('Error to delete image')
      }

    }


  const ModalWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md sm:max-w-lg p-5 relative">
        {children}
      </div>
    </div>
  );





  // ---------------- UPLOAD MODE ----------------
  if (use === "upload") {
    return (
      <Formik
        initialValues={{ image: null }}
        validationSchema={ImageSchema}
        onSubmit={() => {
          onSave(imageFile); 
        }}
      >
        {({ setFieldValue, handleSubmit, isValid,isSubmitting }) => (
          <Form>
            <ModalWrapper>
              {/* Header */}
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <h2 className="text-lg font-semibold text-gray-700">Upload Image</h2>

                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-800 transition text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Choose Image Input */}
              <label className="w-full max-w-sm block mx-auto mb-2">
                <div className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-600 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition shadow-sm text-center">
                  {preview ? "Change Image" : "Choose Image"}
                </div>

                <input
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file); 
                      setFieldValue("image", file);

                      // Generate preview
                      const reader = new FileReader();
                      reader.onloadend = () => setPreview(reader.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>

              {/* Validation Error */}
              <ErrorMessage
                name="image"
                component="p"
                className="text-red-500 text-sm text-center mb-3"
              />

              {/* Preview */}
              <div className="relative rounded-xl overflow-hidden border bg-gray-50 flex justify-center">
                {preview ? (
                  <>
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-[70vh] object-contain rounded-xl"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setPreview(null);
                        setImageFile(null); 
                        setFieldValue("image", null);
                      }}
                      className="absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow hover:bg-gray-100 transition"
                    >
                      <Trash2 size={20} className="text-red-600" />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-52 flex items-center justify-center text-gray-400">
                    No image selected
                  </div>
                )}
              </div>

              {/* Save Button */}
              {preview && (
                <div className="flex justify-center mt-5">
                  <button
                    type="button"
                    disabled={!isValid||isSubmitting}
                    onClick={() => handleSubmit()}
                    className={`px-6 py-2.5 rounded-lg shadow text-white ${
                      isValid
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-gray-400 cursor-not-allowed"
                    } transition`}
                  >
                    {isSubmitting?'Saving...':'Save'}
                  </button>
                </div>
              )}
            </ModalWrapper>
          </Form>
        )}
      </Formik>
    );
  }

  // ---------------- PREVIEW MODE ----------------
  if (use === "preview") {
    return (

      <>
      {confirmation && 
      <ConfirmationModal
          text="Delete Image?"
          description="Are you sure you want to delete this image? This action cannot be undone."
          close={()=>setComfirmation(false)}
          payload={publicId}
          submit={dedteImage}
      />}
      <ModalWrapper>
        <div className="flex items-center justify-between mb-4 border-b pb-3">
          <h2 className="text-lg font-semibold text-gray-700">Image Preview</h2>

          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition text-2xl">
            ✕
          </button>
        </div>

        <div className="relative rounded-xl overflow-hidden border bg-gray-50">
          <img
            src={url}
            alt="Preview"
            className="w-full max-h-[70vh] object-contain rounded-xl"
          />
          { isVendor &&
          <button
            onClick={() => setComfirmation(true)}
            className="absolute top-3 right-3 bg-white/90 p-2 cursor-pointer rounded-full shadow hover:bg-gray-100 transition"
          >
            <Trash2 size={20} className="text-red-600" />
          </button>
           }
        </div>

        {preview && (
          <div className="flex justify-center mt-5">
            <button
              onClick={() => onSave(imageFile)}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Save
            </button>
          </div>
        )}
      </ModalWrapper>
      </>
    );
  }

  return null;
};

export default ShopImageUpload;
