"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { updateUserProfileImage } from "@/database/actions/user.action";

const ImageUpload = ({
  userProfile,
  userEmail,
}: {
  userProfile: string;
  userEmail: string;
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Handle image file selection event
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      // Show a preview of the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // Function to upload image to the server (called when the user clicks "Upload Image")
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first!");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile); // Append the selected file

      // Post the image to the server
      const response = await axios.post("/api/cloudinary/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.imgUrl) {
        const res = await updateUserProfileImage(
          userEmail,
          response.data.imgUrl
        );
        if (res.status !== 200) {
          toast.error("An error occured while updating your profile image");
          return;
        }
        toast.success("Image uploaded successfully!", {
          duration: 5000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        setSelectedFile(null);
      } else {
        toast.error("Error uploading image, Please try again later", {
          duration: 5000,
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image, Please try again later", {
        duration: 5000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="">
      {/* Display the preview of the selected image */}
      {imagePreview ? (
        <div className="mb-4 flex items-center gap-3">
          <div className="w-[50px] h-[50px] rounded-full flex overflow-hidden  items-center object-contain object-center justify-center">
            <Image
              src={imagePreview}
              alt="Selected Image Preview"
              width={60}
              height={60}
              className="rounded-full w-full h-full"
            />{" "}
          </div>
          {selectedFile && (
            <div className="flex gap-2">
              <button
                onClick={handleUpload}
                className="text-xs  2xl:text-sm cursor-pointer font-semibold bg-gradient-to-b
                     hover:bg-gradient-to-br transition-all duration-500 from-[#FF9900]
                      to-[#10111080] px-4 py-2 rounded-lg"
                disabled={!selectedFile || uploading} // Disable if no image selected or during upload
              >
                {uploading ? "Uploading..." : "Update Profile"}
              </button>

              <button
                onClick={() => {
                  setSelectedFile(null);
                  setImagePreview(null);
                }}
                className="text-xs  2xl:text-sm cursor-pointer font-semibold bg-gradient-to-b
                     hover:bg-gradient-to-br transition-all duration-500 from-[#ba3131]
                      to-[#8c150a80] px-4 py-2 rounded-lg"
              >
                Cancle
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-[50px] h-[50px] rounded-full flex overflow-hidden  items-center object-contain object-center justify-center">
                <Image src={userProfile} width={60} alt="avatar" height={60} />
              </div>
              <div className="  w-fit relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className=" w-48 cursor-pointer absolute top-0 opacity-0 "
                  disabled={uploading}
                />
                <p
                  className={`text-xs  2xl:text-sm cursor-pointer font-semibold bg-gradient-to-b
                     hover:bg-gradient-to-br transition-all duration-500 from-[#FF9900]
                      to-[#10111080] px-4 py-2 rounded-lg
                }`}
                >
                  Choose Profile Picture
                </p>
              </div>
            </div>
          </div>{" "}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
