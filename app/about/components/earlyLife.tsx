import {Box, Flex, Heading, Text} from "@radix-ui/themes";

export default function EarlyLife() {

    return (
        <Flex direction="column" align="center" justify="center">
            <Heading as="h1" size="8" className="mb-1 text-primary-foreground">
                Early Life
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
                Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque
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
                consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque.
            </Text>
        </Flex>


    )
}







































