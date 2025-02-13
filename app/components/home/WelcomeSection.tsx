import {Box, Button, Flex, Grid, Heading, Link, Text} from "@radix-ui/themes";


function WelcomeSection() {
    return (
       <Grid as="div" columns={{ initial: "1", md: "1fr 1fr" }} rows="auto" gap={{ initial: "6", md: "10" }}>
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
       </Grid>


    );
}

export default WelcomeSection;


