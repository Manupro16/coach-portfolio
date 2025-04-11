import {Box, Heading, Text, TextField} from "@radix-ui/themes";
import clsx from 'clsx';

interface TextFieldsProps {
    id?: string;
    label: string;
    errors: { [key: string]: { message: string } };
    colorMode: 'dark' | 'light';
    value: string;
    fieldType: "number" | "search" | "time" | "text" | "hidden" | "tel" | "url" | "email" | "date" | "datetime-local" | "month" | "password" | "week" | undefined;
    placeHolder: string;
    errorKey?: string;
}

function TextFields({
                        id,
                        label,
                        errors,
                        colorMode,
                        value,
                        fieldType,
                        placeHolder,
                        errorKey,
                    }: TextFieldsProps) {
    const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
    const inputClasses = clsx(
        "mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-primary focus:border-primary transition-colors duration-300",
        colorMode === 'dark' ? 'border-gray-700 bg-gray-700 text-white' : 'border-gray-300'
    );

    // Use errorKey if provided, otherwise derive from label (lowercase)
    const keyToCheck = errorKey || label.toLowerCase();

    return (
        <Box className="mb-6">
            <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
                {label}
            </Heading>
            <TextField.Root
                id={inputId}
                type={fieldType}
                placeholder={placeHolder}
                defaultValue={value}
                className={inputClasses}
            />
            {errors[keyToCheck] && (
                <Text as="p" className="text-red-500 mt-2">
                    {errors[keyToCheck].message}
                </Text>
            )}
        </Box>
    );
}

export default TextFields;
