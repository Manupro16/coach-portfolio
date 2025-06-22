// components/home/components/VideoCard

'use client';

import React from 'react';
import {Flex, Heading, Text, Card, Box, Badge, Link} from '@radix-ui/themes';
import { ShowcaseVideo} from '@prisma/client';
import CloudinaryVideo from "@/app/components/CloudinaryVideo";
import {FaPencilAlt} from "react-icons/fa";

type VideoCardProps = ShowcaseVideo & {
  isAdmin?: boolean;      // optional so you can omit it on public pages
};



const VideoCard: React.FC<VideoCardProps> = ({id, team, season, videoSrc, description, isAdmin,}) => (
    <Card
        className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-700 rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300">
        <Flex
            direction="column"
            align="center"
            justify="center"
            className="p-6 h-full"
        >
            <Heading
                size="4"
                className="text-gray-100 mb-2 font-sans text-center"
            >
                {team}
            </Heading>
            {isAdmin && (
                <Link href={`/admin/edit/home/showcase/${id}`} aria-label="Edit welcome section">
                    <FaPencilAlt className="w-5 h-5 text-textLight hover:text-primary transition-colors ml-5"/>
                </Link>
            )}
            <Badge className="bg-blue-600 text-white mb-4">{season}</Badge>
            <Box className="w-full mb-4">
                   <video
                        src={videoSrc}
                        controls
                        className="rounded-lg w-full max-w-full"
                        aria-label={`Video highlights of ${team} during the ${season}`}
                    />
            </Box>
            <Text
                size="3"
                className="text-gray-300 text-center font-sans leading-relaxed"
            >
                {description}
            </Text>
        </Flex>
    </Card>
);

export default VideoCard;