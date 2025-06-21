// client component ✨
'use client';

import { CldVideoPlayer } from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

export default function Demo() {
  return (
    <CldVideoPlayer
      width="1920"
      height="1080"
      src="folder/my_clip"   // public ID, no extension
      autoplay={false}
      controls
    />
  );
}
