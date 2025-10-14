import {Box, Flex, Heading, Text} from "@radix-ui/themes";


interface Props {

    heading: string
    text: string

}

export default function StoryStructure({heading, text}: Props) {
    return (

        <Flex direction="column" align="center" justify="center">
            <Heading as="h1" size="8" className="mb-1 text-primary-foreground">
                {heading}
            </Heading>
            <Box
                as="span"
                className="block h-[3px] w-1/3 bg-primary motion-safe:animate-[grow_1.2s_ease-out]"
            />
            <Text
                as="p"
                align="center"
                className="mt-6  max-w-[200ch] text-balance mx-auto leading-relaxed"
            >
                {text}
            </Text>
        </Flex>
    )
}









