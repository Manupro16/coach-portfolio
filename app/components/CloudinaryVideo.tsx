// components/CloudinaryVideo.tsx
'use client';

import {CldVideoPlayer, type CldVideoPlayerProps} from 'next-cloudinary';
import 'next-cloudinary/dist/cld-video-player.css';

export interface CloudinaryVideoProps
    extends Omit<CldVideoPlayerProps, 'src'> {
    /** Full Cloudinary URL *or* the public ID itself */
    src: string;
    playerId?: string;
}

export default function CloudinaryVideo({ src, playerId, ...props }: CloudinaryVideoProps) {



    const stripped = src.includes('/video/upload/')
        ? src.replace(/^.*\/video\/upload\/(?:v\d+\/)?/, '')
        : src;
    const publicId = stripped.replace(/\.[^/.]+$/, '');

      const autoId = 'cld-player-' + publicId.replace(/[^a-zA-Z0-9_-]/g, '-');



    return (
        <CldVideoPlayer id={playerId ?? autoId} src={publicId}{...props} />
    );
}
