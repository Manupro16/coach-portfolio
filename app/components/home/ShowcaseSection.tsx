import React from 'react';
import {Button, Flex, Grid, Heading, Link, Text} from "@radix-ui/themes";
import VideoCard from "@/app/components/home/components/VideoCard";
import {TopWave, BottomWave} from '@/app/components/svgWaves';
import {prisma} from '@/lib/prisma';
import {FaPencilAlt} from "react-icons/fa";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {Role} from "@prisma/client";


async function ShowCaseSection() {

    // const data = await prisma.showcaseVideo.findMany({
    //         orderBy: {
    //             createdAt: "desc"
    //         }
    //     }
    // )

    const [data, session] = await Promise.all([
        prisma.showcaseVideo.findMany({
            orderBy: {
                createdAt: "desc"
            }
        }),
        getServerSession(authOptions)
    ])

    const isAdmin = session?.user.role === Role.ADMIN;

    return (
        <>
            <TopWave/>
            <Grid
                as="div"
                className="relative py-8 px-4 sm:px-6 lg:px-8 pt-12"
                columns={{initial: '1'}}
                rows="auto"
                gap={{initial: '4', md: "9"}}
            >
                {/* Header Section */}
                <Flex
                    as="div"
                    direction="column"
                    align="center"
                    gap="2"
                >
                    <Heading size="8" className="text-textLight mb-2 text-center">
                        No Matter Where He Goes, His Philosophies and Style Remain the Same
                    </Heading>
                    <Text size="4" className="text-textMuted max-w-2xl text-center">
                        An introduction to the history of Chuy Vera&#39;s amazing soccer career. This showcase provides
                        you with clips of his teams in each season and his impact on the club.
                    </Text>
                    {isAdmin && (
                        <Link href="/admin/edit/home/showcase" aria-label="Edit welcome section">
                            <FaPencilAlt
                                className="w-5 h-5 text-textLight hover:text-primary transition-colors ml-5"/>
                        </Link>
                    )}
                </Flex>
                {/*Video Cards Section */}
                <Flex
                    direction="column"
                    className="w-full py-8 px-4 sm:px-6 lg:px-8"
                    align="center"
                    justify="center"
                    as="div"
                >
                    <Grid
                        columns={{initial: '1', sm: '1', md: '2', lg: '3'}}
                        gap="6"
                        className="w-full"
                    >
                        {data.map((item, index) => (
                            <VideoCard key={index} {...item} />
                        ))}
                    </Grid>
                </Flex>
                {/* Button Section */}
                <Flex
                    as="div"
                    justify="center"
                    align="start"
                    className="z-10 py-4"
                >
                    <Link href="/teams">
                        <Button
                            className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primaryDark transition-colors">
                            Explore More
                        </Button>
                    </Link>
                </Flex>
            </Grid>
            <BottomWave/>
        </>
    );
}

export default ShowCaseSection


// const showcases = [
//     {
//         team: 'Zamora FC Venezuela',
//         season: '2010/2011',
//         videoSrc: '/videos/zamora_2010.mp4',
//         description: 'Highlights from the 2010/2011 season.',
//     },
//     {
//         team: 'Estudiantes de Mérida',
//         season: '2012/2013',
//         videoSrc: '/videos/estudiantes_2012.mp4',
//         description: 'Key moments from the 2012/2013 season.',
//     },
//     {
//         team: 'Deportivo Táchira',
//         season: '2014/2015',
//         videoSrc: '/videos/tachira_2014.mp4',
//         description: 'Memorable plays from the 2014/2015 season.',
//     },
// ];