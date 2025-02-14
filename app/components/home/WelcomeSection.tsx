import {Box, Button, Flex, Grid, Heading, Link, Text} from "@radix-ui/themes";
import Image from "next/image";


function WelcomeSection() {
    return (
        <>
            {/* Top wave */}
            <Box as="div" className="absolute w-full h-full">
                <svg
                    viewBox="0 0 1440 320"
                    className="w-full h-full fill-current text-primaryDark opacity-30"
                    preserveAspectRatio="none"
                >
                    <path
                        id="wavePathTop"
                        d="M0,128L48,138.7C96,149,192,171,288,181.3C384,192,480,192,576,176C672,160,768,128,864,112C960,96,1056,96,1152,128C1248,160,1344,224,1392,256L1440,288L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    />
                </svg>
            </Box>
            <Grid as="div" columns={{initial: "1", md: "1fr 1fr"}} rows="auto" gap={{initial: "6", md: "9"}} className=" pb-16">

                <Flex as="div" className="p-4 sm:p-6 md:p-10 z-10" direction="column" gap="4">
                    <Heading as="h1" size={{initial: "6", md: "8"}} weight="bold"
                             className="text-textLight leading-tight relative"
                             style={{textShadow: "1px 1px 2px rgba(0, 0, 0, 0.7)"}}>
                        El Chuy Vera
                    </Heading>
                    <Text as="p" size="4" className=" text-textMuted leading-tight"
                          style={{textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"}}>
                        Professional Football Coach
                    </Text>
                    <Box as="span" className="block h-[3px] w-1/2 bg-primary mt-2"/>
                    <Box as="div" className="max-w-xl">
                        <Heading as="h2" size="6" weight="medium" className="text-textLight">
                            Chuy&#39;s Professional Portfolio and Showcase of Achievements and Career.
                        </Heading>
                        <Text as="p" size="4" className="mt-2 text-textMuted leading-relaxed pt-1">
                            As a dedicated football coach, Chuy Vera has spent decades shaping
                            the future of Venezuelan football. His journey has seen him lead top
                            teams like Estudiantes de Mérida, Zamora FC, and Deportivo Táchira
                            to success, while his international experience, including a pivotal
                            role at FC Dallas in the MLS, highlights his expertise in player
                            development and strategic coaching. Chuy&#39;s leadership and passion
                            continue to inspire players and teams across the footballing world.
                        </Text>
                    </Box>
                    <Link href="/teams">
                        <Button
                            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg shadow-lg hover:bg-primaryDark transition-colors">
                            Explore More
                        </Button>
                    </Link>
                </Flex>
                <Flex as="div" align="center" justify="center" className="relative w-full z-10 pt-12">
                    <Box
                        as="div"
                        className="relative w-[70%] h-[350px] sm:h-[450px] md:h-[500px] border border-borderDark rounded-lg shadow-lg overflow-hidden"
                    >
                        <Image
                            src="/pic/chuyVeraDallasCup.jpg"
                            alt="Coach Chuy Vera at Dallas Cup"
                            fill
                            className="object-cover filter brightness-90 contrast-105 transition-transform duration-500 hover:scale-105"
                            quality={100}
                            priority
                        />
                        <Box
                            as="div"
                            className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50"
                        />
                    </Box>
                </Flex>
                <Flex
                    as="div"
                    direction="column"
                    align="center"
                    className="text-center pt-12 p-12 lg:col-span-2"
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
            {/* Bottom wave */}
                <Box as="div" className="absolute inset-x-0 bottom-0 w-full h-[20%]">
                    <svg
                        viewBox="0 0 1440 320"
                        className="w-full h-full fill-current text-primaryDark opacity-30"
                        preserveAspectRatio="none"
                    >
                        <path
                            id="wavePathBottom"
                            d="M0,256L48,224C96,192,192,128,288,106.7C384,85,480,107,576,122.7C672,139,768,149,864,144C960,139,1056,117,1152,122.7C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />
                    </svg>
                </Box>
        </>


    );
}

export default WelcomeSection;


