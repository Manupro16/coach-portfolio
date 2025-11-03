import Image from "next/image";
import {Flex, Heading, Quote, Text, Box, Grid, Link} from "@radix-ui/themes";
import StoryStructure from "@/app/about/components/storyStructure";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {Role} from "@prisma/client";
import {FaPencilAlt, FaPlus} from "react-icons/fa";
import {prisma} from "@/lib/prisma"


const maxWidth = "max-w-[70ch]";
const textSizes = {size: {initial: '4', md: '4'},} as const

export default async function AboutSection() {

    const [hero, stories, session] = await Promise.all([
        prisma?.aboutHero.findFirst({
            include: {images: {orderBy: {order: 'asc'}}}
        }),
        prisma?.aboutStory.findMany({
            where: {published: true},
            orderBy: {order: 'asc'}
        }),
        getServerSession(authOptions)
    ])

    const defaultStories = [
        {
            title: "Default Title",
            subtitle: "Default Subtitle",
            body:
                "Default Body",
            slug: "Default Slug",
        },
    ]

    const isAdmin = session?.user?.role === Role.ADMIN
    const images = hero?.images?.slice(0, 3) ?? []
    const hasStories = (stories?.length ?? 0) > 0




    return (
        <section className="relative isolate overflow-hidden ">
            <Grid as="div" rows="auto" gap="2" className="min-h-screen">
                <Grid as="div" columns="3" rows="1" className="relative h-[50vh]">
                    {[0, 1, 2].map((i) => {

                        const dbImg = images[i]
                        const src = dbImg?.src ?? [
                            "/",
                            "/",
                            "/",
                        ][i]
                        const alt = dbImg?.alt ?? [
                            "empty image slot 1",
                            "empty image slot 2",
                            "empty image slot 3",
                        ][i]
                        const overlay = i === 1 ? "bg-black/80" : "bg-black/20"
                        const brightness = i === 1 ? "object-cover brightness-75" : "object-cover brightness-50"

                        return (
                            <Box key={i} className="relative h-full">
                                <Image src={src} alt={alt} fill sizes="(max-width:768px) 33vw, 33vw"
                                       className={brightness} priority/>
                                <Box className={`absolute inset-0 ${overlay}`}/>
                            </Box>
                        )


                    })}


                    <Flex direction="column" align="center" justify="center" className="absolute inset-0 z-10 p-4">
                        {isAdmin && (
                            <Link href="/admin/edit/about/hero" aria-label="Edit about hero">
                                <FaPencilAlt
                                    className="w-5 h-5 text-primary-foreground hover:text-primary transition-colors mb-2"/>
                            </Link>
                        )}
                        <Heading as="h1" size="8" className="mb-1 text-primary-foreground">
                            {hero?.fullName ?? "Default Full name"}
                        </Heading>
                        <Quote className="mb-2">
                            {hero?.nickname ?? "Default Nickname"}
                        </Quote>
                        <Box
                            as="span"
                            className="block h-[3px] w-1/3 bg-primary motion-safe:animate-[grow_1.2s_ease-out]"
                        />

                        <Text align="center" className="mt-4 max-w-[60ch] leading-relaxed">
                            {hero?.headline ?? "Default Headline"}
                        </Text>
                        <Text
                            as="p"
                            align="center"
                            className="mt-6 max-w-[65ch] text-balance mx-auto leading-relaxed"
                        >
                            {hero?.summary ?? "Default Summary"}
                        </Text>
                    </Flex>

                </Grid>

                {isAdmin && (
                    <Flex align="center" justify="center" className="my-4">
                        <Link href="/admin/edit/about/stories" className="text-primary-foreground hover:text-primary">
                            <span>Add new story </span>
                        </Link>
                    </Flex>
                )}

                {hasStories
                    ? stories.map((s) => (
                        <StoryStructure
                            key={s.id}
                            title={s.title}
                            subtitle={s.subtitle ?? undefined}
                            story={s.body}
                            maxWidthClass={maxWidth}
                            textProps={textSizes}
                            isAdmin={isAdmin}
                            editHref={`/admin/edit/about/stories?id=${encodeURIComponent(String(s.id))}`}
                        />
                    ))
                    : defaultStories.map((s, i) => (
                        <StoryStructure
                            key={`fallback-${i}`}
                            title={s.title}
                            subtitle={s.subtitle}
                            story={s.body}
                            maxWidthClass={maxWidth}
                            textProps={textSizes}
                            isAdmin={isAdmin}
                            editHref={isAdmin ? "/admin/edit/about/stories" : "#"}
                        />
                    ))}
            </Grid>
        </section>
    );
}



