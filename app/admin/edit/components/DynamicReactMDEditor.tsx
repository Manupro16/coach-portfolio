// components/DynamicReactMDEditor.tsx

'use client'; // Ensure this component is treated as a client-side component

import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import {Box, Heading, Text} from '@radix-ui/themes';
import type {FieldErrors} from "react-hook-form";

interface DynamicReactMDEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
    colorMode?: 'light' | 'dark';
    label: string;
    errors: FieldErrors;
    errorKey?: string;
}

const DynamicReactMDEditor: React.FC<DynamicReactMDEditorProps> = ({value, onChange, colorMode, label, errors, errorKey}) => {

     const keyToCheck = errorKey || label.toLowerCase();

    return (
        <>
            <Heading as="h3" size="4" className="text-4xl font-bold text-primary mb-4">
                {label}
            </Heading>
            <Box
                className={`rounded-lg shadow-md p-2 transition-colors duration-300 ${colorMode === 'dark' ? 'bg-primaryDark' : 'bg-gray-600'}`}>
                <MDEditor
                    aria-label="Markdown Editor"
                    data-color-mode={colorMode}
                    value={value}
                    onChange={onChange}
                    height={400}
                    preview="live"
                    className="rounded-lg "
                />
            </Box>
             {errors[keyToCheck] && (
                <Text as="p" className="text-red-500 mt-2">
                    {String(errors[keyToCheck].message)}
                </Text>
            )}
        </>
    );
};

export default DynamicReactMDEditor;