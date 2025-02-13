// app/components/ClientNavbar.tsx
"use client";

import dynamic from 'next/dynamic';
import React from 'react';
import { Box, Flex } from "@radix-ui/themes";

// Dynamically import the actual Navbar with SSR disabled,
// and provide a fallback that renders a skeleton.
const Navbar = dynamic(() => import('./NavBar'), {
    ssr: false,
    loading: () => <SkeletonNavbar />,
});

const SkeletonNavbar: React.FC = () => {
    return (
        <nav className="nav-footer-background animate-pulse">
            <Flex
                as="div"
                justify="between"
                align="center"
                className="px-4 sm:px-6 md:px-10 py-4"
            >
                {/* Brand Placeholder with a default width for small screens */}
                <Box className="w-32 h-6 bg-gray-600 rounded" />

                <Flex gap="2">
                    {/* Desktop Version: Shown on md and above */}
                    <div className="hidden md:flex">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <Box key={index} className="w-16 h-6 bg-gray-600 rounded" />
                        ))}
                    </div>
                    {/* Mobile Version: Shown on small screens */}
                    <Flex className="md:hidden">
                        <Box className="w-16 h-6 bg-gray-600 rounded" />
                    </Flex>
                </Flex>
            </Flex>
        </nav>
    );
};

export default Navbar;

