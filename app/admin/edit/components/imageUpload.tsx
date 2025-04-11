'use client';

import React from 'react';
import {Box, Heading, Text} from '@radix-ui/themes';
import {Controller, UseFormReturn} from 'react-hook-form';

interface ImageUploadProps {
    control: UseFormReturn['control'];  // Control object from react-hook-form
    errors: { [key: string]: { message: string } };
    setValue: UseFormReturn['setValue'];
    colorMode: 'light' | 'dark';
}

const ImageUpload: React.FC<ImageUploadProps> = ({control, errors, setValue, colorMode}) => {
    return (
        <Box>
            <Heading as="h3" size="4" className="font-bold text-primary mb-4">
                Upload Image
            </Heading>
            <label htmlFor="imageFile" className="block text-sm font-medium text-gray-200">
                Choose an image to upload
            </label>
            <Controller
                control={control}
                name="image.file"
                render={({field}) => (
                    <>
                        <input
                            id="imageFile"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const files = e.target.files ? Array.from(e.target.files) : [];
                                field.onChange(files); // Update the form state with the file list
                                // Generate a preview URL and store it in the form state
                                if (files.length > 0) {
                                    const previewUrl = URL.createObjectURL(files[0]);
                                    setValue('image.previewUrl', previewUrl);
                                }
                            }}
                            className={`mt-1 block w-full ${
                                colorMode === 'dark' ? 'text-white' : 'text-gray-700'
                            }`}
                        />
                        {errors["image.file"] && (
                            <Text as="p" id="image-file-error" className="text-red-500 mt-2">
                                {errors["image.file"].message}
                            </Text>
                        )}
                    </>
                )}
            />
        </Box>
    );
};

export default ImageUpload;
