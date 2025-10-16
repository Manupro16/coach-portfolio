import Image from "next/image";
import {Flex, Heading, Quote, Text, Box, Grid, Link} from "@radix-ui/themes";
import StoryStructure from "@/app/about/components/storyStructure";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/lib/auth";
import {Role} from "@prisma/client";
import {FaPencilAlt} from "react-icons/fa";


const maxWidth = "max-w-[70ch]";
const textSizes = {size: {initial: '4', md: '4'},} as const

export default async function AboutSection() {

    const session = await getServerSession(authOptions)
    const isAdmin = session?.user?.role === Role.ADMIN


    return (
        <section className="relative isolate overflow-hidden ">
            <Grid as="div" rows="auto" gap="6" className="min-h-screen">
                <Grid as="div" columns="3" rows="1" className="relative h-[50vh]">
                    <Box className="relative h-full">
                        <Image
                            src="/pic/ChuySoccerPlayer.jpg"
                            alt="Jesús Vera playing soccer"
                            fill
                            sizes="(max-width:768px) 33vw, 33vw"
                            className="object-cover brightness-50"
                            priority
                        />
                        <Box className="absolute inset-0 bg-black/20"/>
                    </Box>

                    <Box className="relative h-full">
                        <Image
                            src="/pic/chuyVeraDallasCup.jpg"
                            alt="Jesús Vera at Dallas Cup"
                            fill
                            sizes="(max-width:768px) 33vw, 33vw"
                            className="object-cover brightness-75"
                            priority
                        />
                        <Box className="absolute inset-0 bg-black/80"/>

                    </Box>
                    <Box className="relative h-full">
                        <Image
                            src="/pic/jesus-vera-070219.jpg"
                            alt="Jesús Vera portrait (2019)"
                            fill
                            sizes="(max-width:768px) 33vw, 33vw"
                            className="object-cover brightness-50"
                            priority
                        />
                        <Box className="absolute inset-0 bg-black/20"/>
                    </Box>
                    <Flex direction="column" align="center" justify="center" className="absolute inset-0 z-10 p-4">
                         {isAdmin && (
                            <Link href="/admin/edit/about/hero" aria-label="Edit about hero">
                                <FaPencilAlt
                                    className="w-5 h-5 text-primary-foreground hover:text-primary transition-colors mb-5"/>
                            </Link>
                        )}
                        <Heading as="h1" size="8" className="mb-1 text-primary-foreground">
                            José&nbsp;de&nbsp;Jesús&nbsp;Vera
                        </Heading>
                        <Quote className="mb-2">
                            “El&nbsp;Chuy” Vera
                        </Quote>
                        <Box
                            as="span"
                            className="block h-[3px] w-1/3 bg-primary motion-safe:animate-[grow_1.2s_ease-out]"
                        />

                        <Text align="center" className="mt-4 max-w-[60ch] leading-relaxed">
                            Former professional player turned coach with&nbsp;
                            <strong>9&nbsp;years of pro-level coaching</strong>. <br/>
                            Currently guiding the next generation as an&nbsp;
                            <strong>MLS NEXT Academy coach at FC Dallas</strong>.
                        </Text>
                        <Text
                            as="p"
                            align="center"
                            className="mt-6 max-w-[65ch] text-balance mx-auto leading-relaxed"
                        >
                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
                            pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu
                            aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
                            Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class
                            aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
                        </Text>
                    </Flex>

                </Grid>
                <StoryStructure
                    title="Early Life"
                    maxWidthClass={maxWidth}
                    textProps={textSizes}
                    story="Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque
                sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor
                pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia
                integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per
                conubia nostra inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes
                nascetur ridiculus mus donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget
                fermentum odio phasellus non purus est efficitur laoreet mauris pharetra vestibulum fusce dictum
                risus blandit quis suspendisse aliquet nisi sodales consequat magna ante condimentum neque at luctus
                nibh finibus facilisis dapibus etiam interdum tortor ligula congue sollicitudin erat viverra ac
                tincidunt nam porta elementum a enim euismod quam justo lectus commodo augue arcu dignissim velit
                aliquam imperdiet mollis nullam volutpat porttitor ullamcorper rutrum gravida cras eleifend turpis
                fames primis vulputate ornare sagittis vehicula praesent dui felis venenatis ultrices proin libero
                feugiat tristique accumsan maecenas potenti ultricies habitant morbi senectus netus suscipit auctor
                curabitur facilisi cubilia curae hac habitasse platea dictumst lorem ipsum dolor sit amet
                consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque."
                />

                <StoryStructure
                    title="Youth Career"
                    maxWidthClass={maxWidth}
                    textProps={textSizes}
                    story="Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem
                placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor
                pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer
                nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra
                inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus
                donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non
                purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus blandit quis suspendisse
                aliquet nisi sodales consequat magna ante condimentum neque at luctus nibh finibus facilisis dapibus
                etiam interdum tortor ligula congue sollicitudin erat viverra ac tincidunt nam porta elementum a enim
                euismod quam justo lectus commodo augue arcu dignissim velit aliquam imperdiet mollis nullam volutpat
                porttitor ullamcorper rutrum gravida cras eleifend turpis fames primis vulputate ornare sagittis
                vehicula praesent dui felis venenatis ultrices proin libero feugiat tristique accumsan maecenas potenti
                ultricies habitant morbi senectus netus suscipit auctor curabitur facilisi cubilia curae hac habitasse
                platea dictumst lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae
                pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam
                urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada
                lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per
                conubia nostra inceptos himenaeos."
                />

                <StoryStructure
                    title="Professional Career"
                    maxWidthClass={maxWidth}
                    textProps={textSizes}
                    story="Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
                Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
                conubia nostra inceptos himenaeos.

                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
                Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
                conubia nostra inceptos himenaeos.

                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
                Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
                conubia nostra inceptos himenaeos.

                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
                Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
                conubia nostra inceptos himenaeos.

                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
                Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
                conubia nostra inceptos himenaeos.

                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
                Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
                conubia nostra inceptos himenaeos.

                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
                Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
                conubia nostra inceptos himenaeos.

                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
                Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
                conubia nostra inceptos himenaeos.

                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
                Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
                conubia nostra inceptos himenaeos.

                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque
                sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
                Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia
                integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per
                conubia nostra inceptos himenaeos."
                />

                <StoryStructure
                    title="Professional Coaching Career"
                    maxWidthClass={maxWidth}
                    textProps={textSizes}
                    story="Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem
                placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam urna tempor
                pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada lacinia integer
                nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per conubia nostra
                inceptos himenaeos orci varius natoque penatibus et magnis dis parturient montes nascetur ridiculus mus
                donec rhoncus eros lobortis nulla molestie mattis scelerisque maximus eget fermentum odio phasellus non
                purus est efficitur laoreet mauris pharetra vestibulum fusce dictum risus blandit quis suspendisse
                aliquet nisi sodales consequat magna ante condimentum neque at luctus nibh finibus facilisis dapibus
                etiam interdum tortor ligula congue sollicitudin erat viverra ac tincidunt nam porta elementum a enim
                euismod quam justo lectus commodo augue arcu dignissim velit aliquam imperdiet mollis nullam volutpat
                porttitor ullamcorper rutrum gravida cras eleifend turpis fames primis vulputate ornare sagittis
                vehicula praesent dui felis venenatis ultrices proin libero feugiat tristique accumsan maecenas potenti
                ultricies habitant morbi senectus netus suscipit auctor curabitur facilisi cubilia curae hac habitasse
                platea dictumst lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae
                pellentesque sem placerat in id cursus mi pretium tellus duis convallis tempus leo eu aenean sed diam
                urna tempor pulvinar vivamus fringilla lacus nec metus bibendum egestas iaculis massa nisl malesuada
                lacinia integer nunc posuere ut hendrerit semper vel class aptent taciti sociosqu ad litora torquent per
                conubia nostra inceptos himenaeos."
                />
            </Grid>
        </section>
    );
}



