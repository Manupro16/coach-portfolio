'use client';

import { CldImage, type CldImageProps } from 'next-cloudinary';

/**
 * Reusable Cloudinary image component.
 * Accepts either a full Cloudinary URL or a public ID, and renders using CldImage.
 * Strips domain, upload path, version, and file extension.
 */
export interface CloudinaryImageProps extends Omit<CldImageProps, 'src'> {
  /**
   * Full Cloudinary URL (e.g. https://res.cloudinary.com/{cloud_name}/image/upload/v1234/folder/public-id.jpg)
   * or just the public ID (e.g. "folder/public-id").
   */
  src: string;
}

export default function CloudinaryImage({ src, alt, fill, sizes, ...props }: CloudinaryImageProps) {
  // Extract and normalize public ID:
  // 1. Remove everything up to '/image/upload/' including optional 'v1234/' version prefix
  // 2. Remove file extension (.jpg, .png, etc.)
  const stripped = src.includes('/image/upload/')
    ? src.replace(/^.*\/image\/upload\/(?:v\d+\/)?/, '')
    : src;
  const publicId = stripped.replace(/\.[^/.]+$/, '');

  return <CldImage src={publicId} alt={alt} {...props} fill={fill} sizes={sizes} />;
}
