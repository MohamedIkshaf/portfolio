import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;

/**
 * Helper to upload image buffer or base64 to Cloudinary
 */
export async function uploadToCloudinary(
  fileUri: string,
  folder = "portfolio"
) {
  try {
    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
      folder,
      resource_type: "auto",
    });
    return {
      success: true,
      url: uploadResponse.secure_url,
      publicId: uploadResponse.public_id,
    };
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return { success: false, error: error.message || "Upload failed" };
  }
}
