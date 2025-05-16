// app/components/home/ShowcaseSectionClient.tsx
'use client';

import {
  Button,
  Flex,
  Grid,
  Heading,
  Link,
  Text
} from "@radix-ui/themes";
import { FaPencilAlt } from "react-icons/fa";
import VideoCard from "@/app/components/home/components/VideoCard";
import type { Session } from "next-auth";
import {Role, type ShowcaseVideo} from "@prisma/client";

interface Props {
  data: ShowcaseVideo[];
  session: Session | null;
}

export default function ShowcaseSectionClient({ data, session }: Props) {
  const isAdmin = session?.user?.role === Role.ADMIN;

  return (
    <Grid
      as="div"
      className="relative py-8 px-4 sm:px-6 lg:px-8 pt-12"
      columns={{ initial: "1" }}
      rows="auto"
      gap={{ initial: "4", md: "9" }}
    >
      {/* Header Section */}
      <Flex as="div" direction="column" align="center" gap="2">
        <Heading size="8" className="text-textLight mb-2 text-center">
          No Matter Where He Goes, His Philosophies and Style Remain the Same
        </Heading>
        <Text size="4" className="text-textMuted max-w-2xl text-center">
          An introduction to the history of Chuy Vera&#39;s amazing soccer career.
          This showcase provides you with clips of his teams in each season and
          his impact on the club.
        </Text>
        {isAdmin && (
          <Link href="/admin/edit/home/showcase" aria-label="Edit welcome section">
            <FaPencilAlt className="w-5 h-5 text-textLight hover:text-primary transition-colors ml-5" />
          </Link>
        )}
      </Flex>

      {/* Video Cards Section */}
      <Flex
        direction="column"
        className="w-full py-8 px-4 sm:px-6 lg:px-8"
        align="center"
        justify="center"
        as="div"
      >
        <Grid
          columns={{ initial: "1", sm: "1", md: "2", lg: "3" }}
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
          <Button className="px-6 py-3 bg-primary text-white rounded-lg shadow-lg hover:bg-primaryDark transition-colors">
            Explore More
          </Button>
        </Link>
      </Flex>
    </Grid>
  );
}
