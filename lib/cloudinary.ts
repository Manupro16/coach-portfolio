// lib/cloudinary.ts

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResponse {
  public_id: string;
  version: number;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  etag: string;
  original_filename: string;
  secure_url: string;
  url: string;
}


// Optionally, create an upload helper function:
export const uploadImage = async (filePath: string): Promise<CloudinaryUploadResponse> => {
  try {
      return await cloudinary.uploader.upload(filePath, {
        folder: "/pic", // optional: use a folder to organize images
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};
