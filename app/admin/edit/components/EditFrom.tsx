'use client'

import {useState} from "react";
import {Box, Flex, Heading} from "@radix-ui/themes";


function EditForm() {

    const [colorMode, setColorMode] = useState<"light" | "dark">('dark');

    return (
        <Flex as="div" justify="center"  className="w-full h-full">
            <Box
                className={`shadow-md rounded-lg p-8 w-full max-w-3xl ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-700'}`}>
                <Heading as="h2" size="4" className="text-2xl font-semibold text-green-500 mb-4">
                    Edit Career Entry
                </Heading>
            </Box>
        </Flex>
    )
}

export default EditForm