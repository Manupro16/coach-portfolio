// components/home/components/VideoCard

'use client';

import React from 'react';
import {Flex, Heading, Text, Card, Box, Badge, Link, Separator} from '@radix-ui/themes';
import {ShowcaseVideo} from '@prisma/client';
import {FaPencilAlt} from "react-icons/fa";

type VideoCardProps = ShowcaseVideo & {
    isAdmin?: boolean;      // optional so you can omit it on public pages
};


const VideoCard: React.FC<VideoCardProps> = ({id, team, season, videoSrc, description, isAdmin,}) => (
    <Card className="website-background">
        <Flex
            direction="column"
            align="start"
            justify="start"
            className="p-6"
        >
            <Flex>
                <Heading size="4" className="text-gray-100 mb-2 font-sans text-center">
                    {team}
                </Heading>
                {isAdmin && (
                    <Link href={`/admin/edit/home/showcase/${id}`} aria-label="Edit welcome section">
                        <FaPencilAlt className="w-5 h-5 text-textLight hover:text-primary transition-colors ml-5"/>
                    </Link>
                )}
            </Flex>
            <Box as="span" className="block h-[3px] w-1/2 bg-primary mt-1"/>
            <Text as="p" size="4" className="text-textMuted leading-tight mt-2" style={{textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)'}}>
                {description}
            </Text>
            <Separator orientation="horizontal" size="4" color="cyan" className="mt-2"/>
            <Flex align="center" justify="center" direction="column">
                <Badge size="3" className="mb-4 mt-4" color="orange">{season}</Badge>
                <Box className="w-full mb-4">
                    <video
                        src={videoSrc}
                        controls
                        className="rounded-lg w-full max-w-full"
                        aria-label={`Video highlights of ${team} during the ${season}`}
                    />
                </Box>
            </Flex>
        </Flex>


    </Card>
);

export default VideoCard;