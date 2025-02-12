// app/components/ClientNavbar.tsx
"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import {Box, Flex, Link, Text} from "@radix-ui/themes";

// Dynamically import the actual Navbar with SSR disabled,
// and provide a fallback that renders a skeleton.
const Navbar = dynamic(() => import('./NavBar'), {
  ssr: false,
  loading: () => <SkeletonNavbar />,
});

const SkeletonNavbar: React.FC = () => {
  return (
    <nav className="nav-footer-background animate-pulse">
          <Flex as="div" justify="between" align="center" className="px-4 sm:px-6 md:px-10 py-4">
              <Box className="w-[10%] h-6 bg-gray-600 rounded"></Box>
              <Box className="w-[15%] h-6 bg-gray-600 rounded"></Box>
          </Flex>
    </nav>
  );
};

export default Navbar;
