import Image from "next/image";
import {Flex, Heading, Quote, Text, Box, Grid} from "@radix-ui/themes";
import EarlyLife from "@/app/about/earlyLife";


export default function AboutSection() {
    return (
        <section className="relative isolate overflow-hidden ">
            <Grid as="div" rows="3" className="min-h-screen">
                <Grid as="div" columns="3" rows="1" className="relative">
                    <Box className="relative h-full">
                        <Image
                            src="/pic/ChuySoccerPlayer.jpg"
                            alt=""
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
                            alt=""
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
                            alt=""
                            fill
                            sizes="(max-width:768px) 33vw, 33vw"
                            className="object-cover brightness-50"
                            priority
                        />
                        <Box className="absolute inset-0 bg-black/20"/>
                    </Box>
                    <Flex direction="column" align="center" justify="center"  className="absolute inset-0">
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
                <EarlyLife/>
            </Grid>
        </section>
    );
}



