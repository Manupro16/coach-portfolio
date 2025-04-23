'use client';

import { CldImage, type CldImageProps } from 'next-cloudinary';

/**
 * Reusable Cloudinary image component.
 * Accepts either a full Cloudinary URL or a public ID, and renders using CldImage.
 */
export interface CloudinaryImageProps extends Omit<CldImageProps, 'src'> {
  /**
   * Full Cloudinary URL (e.g. https://res.cloudinary.com/{cloud_name}/image/upload/v1234/public-id.jpg)
   * or just the public ID (e.g. "public-id.jpg").
   */
  src: string;
}

export default function CloudinaryImage({ src, alt, ...props }: CloudinaryImageProps) {
  // Extract public ID from full URL if necessary
  const publicId = src.includes('/image/upload/')
    ? src.split('/image/upload/')[1]
    : src;

  return (
    <CldImage
      src={publicId}
      alt={alt}
      {...props}
    />
  );
}
