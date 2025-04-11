'use client';

import { Box, Text } from "@radix-ui/themes";
import React from "react";

interface ImagePreviewProps {
  imageError?: string | null;
  imagePreviewUrl?: string; // This will be set after a file upload
  colorMode: 'light' | 'dark';
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageError, imagePreviewUrl, colorMode }) => {
  // For the upload-only scenario, we'll directly use the preview URL from file uploads.
  if (!imagePreviewUrl) {
    return (
      <Box
        className={`w-full max-w-md h-48 flex items-center justify-center rounded-md shadow-sm ${
          colorMode === "dark" ? "bg-gray-600" : "bg-gray-200"
        }`}
      >
        <Text as="p" className="text-gray-500">
          Upload an image to preview.
        </Text>
      </Box>
    );
  }

  if (imageError) {
    return (
      <Box className="w-full max-w-md h-48 flex flex-col items-center justify-center rounded-md shadow-sm bg-red-100 p-4">
        <Text as="p" className="text-red-500 mb-2">
          {imageError}
        </Text>
      </Box>
    );
  }

  return (
    <img
      src={imagePreviewUrl}
      alt="Image Preview"
      className="w-full max-w-md h-48 rounded-md shadow-sm object-cover"
    />
  );
};

export default ImagePreview;
