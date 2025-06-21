//components/home/components/VideoCard

'use client';

import React from 'react';
import { Flex, Heading, Text, Card, Box, Badge } from '@radix-ui/themes';
import { ShowcaseVideo } from '@prisma/client';
import CloudinaryVideo from "@/app/components/CloudinaryVideo";




const VideoCard: React.FC<ShowcaseVideo> = ({
                                                 team,
                                                 season,
                                                 videoSrc,
                                                 description,
                                             }) => (
        <Card className="bg-gray-800 bg-opacity-80 backdrop-filter backdrop-blur-md border border-gray-700 rounded-xl shadow-xl overflow-hidden transform transition-transform duration-300">
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
                <Badge className="bg-blue-600 text-white mb-4">{season}</Badge>
                <Box className="w-full mb-4 flex justify-center">
                    <CloudinaryVideo src={videoSrc} width="1920" height="1080" controls  poster="auto" />
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

  {/*<video*/}
                    {/*    src={videoSrc}*/}
                    {/*    controls*/}
                    {/*    className="rounded-lg w-full max-w-full"*/}
                    {/*    poster="/images/video-placeholder.jpg"*/}
                    {/*    aria-label={`Video highlights of ${team} during the ${season}`}*/}
                    {/*/>*/}

       // width="1920"
            // height="1080"
            // controls
            // poster="auto"   // first-frame thumbnail