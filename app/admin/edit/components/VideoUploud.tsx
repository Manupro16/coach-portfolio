'use client';

import React from 'react';
import { Text } from '@radix-ui/themes';
import {
    Control,
    Controller,
    FieldErrors,
    FieldValues,
    Path,
    UseFormSetValue,
} from 'react-hook-form';

interface VideoUploadProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    setValue: UseFormSetValue<TFieldValues>;
    colorMode: 'light' | 'dark';
    name: Path<TFieldValues>;
    previewName: Path<TFieldValues>;
}

function VideoUpload<TFieldValues extends FieldValues>({
    control,
    errors,
    setValue,
    colorMode,
    name,
    previewName,
}: VideoUploadProps<TFieldValues>) {
    return (
        <Controller<TFieldValues, Path<TFieldValues>>
            control={control}
            name={name}
            render={({ field }) => (
                <>
                    <input
                        id="videoFile"
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                            const files = e.target.files ? Array.from(e.target.files) : [];
                            field.onChange(files);

                            if (files[0]) {
                                const previewUrl = URL.createObjectURL(files[0]);
                                setValue(
                                    previewName, previewUrl as TFieldValues[typeof previewName]

                                );
                            }
                        }}
                        className={`mt-1 block w-full ${
                            colorMode === 'dark' ? 'text-white' : 'text-gray-700'
                        }`}
                    />
                    {errors[field.name as keyof TFieldValues] && (
                        <Text as="p" className="text-red-500 mt-2">
                            {String(errors['videoFile']?.message)}
                        </Text>
                    )}
                </>
            )}
        />
    );
}

export default VideoUpload;
