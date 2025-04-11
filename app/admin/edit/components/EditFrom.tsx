'use client'



import { useState } from "react";
import { Box, Flex, Heading } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

const DynamicReactMDEditor = dynamic(() => import('@/app/admin/edit/components/DynamicReactMDEditor'), {
    ssr: false,
});


function EditForm() {

    const [colorMode, setColorMode] = useState<"light" | "dark">('dark');
    const [isLoading, setIsLoading] = useState(true);
     const [formError, setFormError] = useState<string | null>(null);
    const [formSuccess, setFormSuccess] = useState<string | null>(null);

       const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors, isSubmitting},
        watch,
        reset,
    } = useForm();

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