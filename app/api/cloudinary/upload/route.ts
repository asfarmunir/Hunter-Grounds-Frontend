import { cloudinary } from "@/lib/cloudinaryConfig"; // your Cloudinary config path
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// Upload response types
type UploadResponse = 
  { success: true; result?: UploadApiResponse } | 
  { success: false; error: UploadApiErrorResponse };

// Function to upload image to Cloudinary
const uploadToCloudinary = (
  fileUri: string, fileName: string): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "huntgrounds", // specify your Cloudinary folder
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};

// Route handler for image uploads
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File; // Get the file

    // Convert file to buffer for base64 encoding
    const fileBuffer = await file.arrayBuffer();
    const mimeType = file.type;
    const encoding = "base64";
    const base64Data = Buffer.from(fileBuffer).toString("base64");

    // Construct data URL for the file
    const fileUri = `data:${mimeType};${encoding},${base64Data}`;

    // Upload the image to Cloudinary
    const res = await uploadToCloudinary(fileUri, file.name);

    // Check the response and return the appropriate status
    if (res.success && res.result) {
      return NextResponse.json({
        message: "success",
        imgUrl: res.result.secure_url,
      });
    } else {
      return NextResponse.json({ message: "failure", error: ' errorrr ' });
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json({ message: "Error processing image upload" });
  }
}
