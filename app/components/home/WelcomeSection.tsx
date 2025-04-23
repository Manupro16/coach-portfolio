
import {TopWave, BottomWave} from '@/app/components/svgWaves';
import {Box, Button, Flex, Grid, Heading, Link, Text} from "@radix-ui/themes";
import { prisma } from '@/lib/prisma';
import CloudinaryImage from '@/app/components/CloudinaryImage';


async function WelcomeSection() {

    const data = await prisma.welcomeContent.findFirst()

    return (
        <>
            <TopWave/>
            <Grid as="div" columns={{initial: "1", md: "1fr 1fr"}} rows="auto" gap={{initial: "6", md: "9"}}
                  className=" pb-16">
                <Flex as="div" className="p-4 sm:p-6 md:p-10 z-10" direction="column" gap={{initial: "4", md: "2"}}
                      align={{initial: "center", md: "start"}}>
                    <Heading as="h1" size={{initial: "6", md: "8"}} weight="bold"
                             className="text-textLight leading-tight"
                             style={{textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)"}}>
                         {data?.title || "Default Title"}
                    </Heading>
                    <Text as="p" size="4" className=" text-textMuted leading-tight"
                          style={{textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"}}>
                         {data?.subtitle || "Default Subtitle"}
                    </Text>
                    <Box as="span" className="block h-[3px] w-1/2 bg-primary mt-2"/>

                    <Heading as="h2" size="6" weight="medium" className="text-textLight">
                        {data?.contentTitle || "Default content Title"}
                    </Heading>
                    <Text as="p" size="4" className="mt-2 text-textMuted leading-relaxed pt-1">
                       {data?.contentSubtitle || "Default content Subtitle"}
                    </Text>
                    <Link href="/teams">
                        <Button
                            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primaryDark transition-colors">
                            Explore More
                        </Button>
                    </Link>
                    <Link href="/admin/edit/home/welcome">
                        <Button
                            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primaryDark transition-colors"
                        >
                            Edit Section
                        </Button>
                    </Link>
                </Flex>
                <Flex as="div" align="center" justify="center" className="relative w-full z-10 pt-12">
                    <Box
                        as="div"
                        className="relative w-[70%] h-[350px] sm:h-[450px] md:h-[500px] border border-borderDark rounded-lg shadow-lg overflow-hidden"
                    >
                        <CloudinaryImage
                            alt={data?.imageTitle ?? "No default tile for this image at the moment"}
                            src={data?.imageSrc ?? "/pic/defaultImage.jpeg"}
                            fill
                            format="auto"
                            quality="auto"
                            style={{ objectFit: "cover" }}
                        />
                        <Box
                            as="div"
                            className="absolute inset-0 bg-gradient-to-b from-transparent to-black  "
                        />
                    </Box>
                </Flex>
                <Flex
                    as="div"
                    direction="column"
                    align="center"
                    className="relative text-center pt-12 p-12 lg:col-span-2"
                >
                    <Heading
                        as="h2"
                        size="8"
                        className="text-textLight tracking-wide"
                        style={{
                            fontSize: "2rem",
                            textShadow: "2px 2px 3px rgba(0, 0, 0, 0.7)",
                        }}
                    >
                        Welcome to the Journey of Excellence
                    </Heading>
                    <Text
                        as="p"
                        size="5"
                        className="text-textMuted leading-relaxed pt-6 max-w-2xl"
                        style={{
                            fontSize: "1.25rem",
                            lineHeight: "1.75",
                            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
                        }}
                    >
                        Explore the world of Chuy Vera, a dedicated football coach who
                        has inspired countless players and teams throughout his illustrious
                        career. Here, you&#39;ll find a showcase of his achievements,
                        philosophy, and the impact he&#39;s made on the footballing world.
                        Prepare to be inspired as you delve into the story of a coach whose
                        passion and expertise have transcended borders.
                    </Text>
                </Flex>
            </Grid>
            <BottomWave/>
        </>
    );
}

export default WelcomeSection;

//  El Chuy Vera
//
// Professional Football Coach


// Chuy&#39;s Professional Portfolio and Showcase of Achievements and Career.

      // As a dedicated football coach, Chuy Vera has spent decades shaping
      //                   the future of Venezuelan football. His journey has seen him lead top
      //                   teams like Estudiantes de Mérida, Zamora FC, and Deportivo Táchira
      //                   to success, while his international experience, including a pivotal
      //                   role at FC Dallas in the MLS, highlights his expertise in player
      //                   development and strategic coaching. Chuy&#39;s leadership and passion
      //                   continue to inspire players and teams across the footballing world.


// Chuy's Professional Portfolio and Showcase of Achievements and Career.


