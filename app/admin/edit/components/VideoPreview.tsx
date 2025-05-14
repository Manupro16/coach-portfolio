'use client';

import { Box, Text } from '@radix-ui/themes';
import React from 'react';

interface VideoPreviewProps {
    videoError?: string | null;
    videoPreviewUrl?: string;
    colorMode: 'light' | 'dark';
}

const VideoPreview: React.FC<VideoPreviewProps> = ({ videoError, videoPreviewUrl, colorMode }) => {
    if (!videoPreviewUrl) {
        return (
            <Box
                className={`w-full max-w-md h-48 flex items-center justify-center rounded-md shadow-sm ${
                    colorMode === 'dark' ? 'bg-gray-600' : 'bg-gray-200'
                }`}
            >
                <Text as="p" className="text-gray-500">
                    Upload a video to preview.
                </Text>
            </Box>
        );
    }

    if (videoError) {
        return (
            <Box className="w-full max-w-md h-48 flex flex-col items-center justify-center rounded-md shadow-sm bg-red-100 p-4">
                <Text as="p" className="text-red-500 mb-2">
                    {videoError}
                </Text>
            </Box>
        );
    }

    return (
        <Box className="relative w-full max-w-md h-64 rounded-md shadow-sm overflow-hidden">
            <video controls className="w-full h-full object-cover rounded">
                <source src={videoPreviewUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </Box>
    );
};

export default VideoPreview;
