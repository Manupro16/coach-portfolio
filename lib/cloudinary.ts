// lib/cloudinary.ts

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Optionally, create an upload helper function:
export const uploadImage = async (filePath: string): Promise<any> => {
  try {
      return await cloudinary.uploader.upload(filePath, {
        folder: "/pic", // optional: use a folder to organize images
    });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    throw error;
  }
};
