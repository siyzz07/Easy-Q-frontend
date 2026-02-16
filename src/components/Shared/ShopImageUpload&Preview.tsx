import React, { useState, type FC, useRef } from "react";
import { Trash2, Plus, Image as ImageIcon, X } from "lucide-react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ConfirmationModal from "./ConfirmationModal";
import { toast } from "react-toastify";

interface IShopImageUpdate {
  use: "upload" | "preview";
  data?: string;
  imageId?: string;
  url?: string;
  publicId?: string;
  onClose: () => void;
  onSave: (images: File[] | null) => void; 
  isVendor: boolean;
  onDelete?: (id: string, imageId: string) => void;
}

const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

// Updated Schema for array validation
const ImageSchema = Yup.object().shape({
  images: Yup.array()
    .min(1, "Please select at least one image")
    .of(
      Yup.mixed()
        .test("fileType", "Invalid format", (value: any) => ALLOWED_TYPES.includes(value.type))
        .test("fileSize", "Max 5MB per image", (value: any) => value.size <= 5 * 1024 * 1024)
    ),
});

const ShopImageUpload: FC<IShopImageUpdate> = ({ isVendor, use, onClose, onSave, url, publicId, onDelete, imageId }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [confirmation, setComfirmation] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dedteImage = (id: string | undefined) => {
    if (id && imageId) {
      onDelete?.(id, imageId);
    } else {
      toast.error("Error to delete image");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = [...imageFiles, ...newFiles];
      
      setImageFiles(updatedFiles);
      setFieldValue("images", updatedFiles);


      const newPreviews = newFiles.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeSelectedImage = (index: number, setFieldValue: any) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    

    URL.revokeObjectURL(previews[index]);
    
    setImageFiles(updatedFiles);
    setPreviews(updatedPreviews);
    setFieldValue("images", updatedFiles);
  };

  const ModalWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-5 relative max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );

  if (use === "upload") {
    return (
      <Formik
        initialValues={{ images: [] }}
        validationSchema={ImageSchema}
        onSubmit={() => onSave(imageFiles)}
      >
        {({ setFieldValue, handleSubmit, isValid, isSubmitting }) => (
          <Form>
            <ModalWrapper>
              <div className="flex items-center justify-between mb-4 border-b pb-3">
                <h2 className="text-lg font-semibold text-gray-700">Upload Images</h2>
                <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800 transition text-2xl">✕</button>
              </div>

              {/* Selection Area */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-xl py-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition mb-4"
              >
                <Plus size={32} className="text-blue-500" />
                <span className="text-sm font-medium text-gray-600">Add Shop Images</span>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  accept={ALLOWED_TYPES.join(",")}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, setFieldValue)}
                />
              </div>

              <ErrorMessage name="images" component="p" className="text-red-500 text-sm text-center mb-3" />

              {/* Previews Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-5">
                {previews.map((src, index) => (
                  <div key={index} className="relative aspect-square rounded-lg overflow-hidden border group">
                    <img src={src} alt="preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeSelectedImage(index, setFieldValue)}
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>

              {imageFiles.length > 0 && (
                <div className="flex justify-center border-t pt-4">
                  <button
                    type="button"
                    disabled={!isValid || isSubmitting}
                    onClick={() => handleSubmit()}
                    className={`px-10 py-2.5 rounded-lg shadow text-white font-bold transition ${
                      isValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? "Uploading..." : `Save ${imageFiles.length} Images`}
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
        {confirmation && (
          <ConfirmationModal
            text="Delete Image?"
            description="Are you sure you want to delete this image? This action cannot be undone."
            close={() => setComfirmation(false)}
            payload={publicId}
            submit={dedteImage}
          />
        )}
        <ModalWrapper>
          <div className="flex items-center justify-between mb-4 border-b pb-3">
            <h2 className="text-lg font-semibold text-gray-700">Image Preview</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 transition text-2xl">✕</button>
          </div>

          <div className="relative rounded-xl overflow-hidden border bg-gray-50 max-h-[60vh]">
            <img src={url} alt="Preview" className="w-full h-full object-contain rounded-xl" />
            {isVendor && (
              <button
                onClick={() => setComfirmation(true)}
                className="absolute top-3 right-3 bg-white/90 p-2 cursor-pointer rounded-full shadow hover:bg-gray-100 transition"
              >
                <Trash2 size={20} className="text-red-600" />
              </button>
            )}
          </div>
        </ModalWrapper>
      </>
    );
  }

  return null;
};

export default ShopImageUpload;