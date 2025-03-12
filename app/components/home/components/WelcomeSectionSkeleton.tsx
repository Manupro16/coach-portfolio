// app/components/home/welcome-section/WelcomeSectionSkeleton.tsx

import { Box, Flex, Grid } from '@radix-ui/themes';

export default function WelcomeSectionSkeleton() {
  return (
    <Grid
      as="div"
      columns={{ initial: '1', md: '1fr 1fr' }}
      rows="auto"
      gap={{ initial: '6', md: '9' }}
      className="pb-16 animate-pulse"
    >
      {/* Left Column Skeleton (Text placeholders) */}
      <Flex
        as="div"
        className="p-4 sm:p-6 md:p-10 z-10"
        direction="column"
        gap={{ initial: '4', md: '2' }}
        align={{ initial: 'center', md: 'start' }}
      >
        {/* Title Skeleton */}
        <Box className="w-40 h-10 bg-gray-300 rounded" />
        {/* Subtitle Skeleton */}
        <Box className="w-32 h-6 bg-gray-300 rounded" />
        <Box className="block h-[3px] w-1/2 bg-gray-300 mt-2" />
        {/* Inner Heading Skeleton */}
        <Box className="max-w-xl">
          <Box className="w-full h-8 bg-gray-300 rounded mb-2" />
          {/* Text Skeleton */}
          <Box className="w-full h-16 bg-gray-300 rounded" />
        </Box>
        {/* Button Skeleton */}
        <Box className="w-32 h-10 bg-gray-300 rounded mt-4" />
      </Flex>
      {/* Right Column Skeleton (Image placeholder) */}
      <Flex
        as="div"
        align="center"
        justify="center"
        className="relative w-full z-10 pt-12"
      >
        <Box
          as="div"
          className="relative w-[70%] h-[350px] sm:h-[450px] md:h-[500px] bg-gray-300 rounded-lg"
        />
      </Flex>
      {/* Bottom Section Skeleton */}
      <Flex
        as="div"
        direction="column"
        align="center"
        className="relative text-center pt-12 p-12 lg:col-span-2"
      >
        <Box className="w-64 h-10 bg-gray-300 rounded mb-2" />
        <Box className="w-full h-20 bg-gray-300 rounded" />
      </Flex>
    </Grid>
  );
}
