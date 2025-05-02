'use client';

import React from 'react';
import {Text} from '@radix-ui/themes';
import {Control, Controller, FieldErrors, FieldValues, Path, UseFormSetValue} from 'react-hook-form';


interface ImageUploadProps<TFieldValues extends FieldValues> {
    control: Control<TFieldValues>;
    errors: FieldErrors<TFieldValues>;
    setValue: UseFormSetValue<TFieldValues>;
    colorMode: 'light' | 'dark';
    name: Path<TFieldValues>;
    previewName:  Path<TFieldValues>;
}


function ImageUpload<TFieldValues extends FieldValues>({
                                                           control,
                                                           errors,
                                                           setValue,
                                                           colorMode,
                                                           name,
                                                           previewName
                                                       }: ImageUploadProps<TFieldValues>) {


    return (
        <Controller<TFieldValues, Path<TFieldValues>>
            control={control}
            name={name}
            render={({field}) => (
                <>
                    <input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            // Convert FileList to an array
                            const files = e.target.files ? Array.from(e.target.files) : [];
                            field.onChange(files); // Pass the array to the form state

                            // Generate a preview URL
                            if (files[0]) {
                                const previewUrl = URL.createObjectURL(files[0]);
                                setValue(previewName, previewUrl as TFieldValues[typeof previewName]);
                            }
                        }}
                        className={`mt-1 block w-full ${
                            colorMode === 'dark' ? 'text-white' : 'text-gray-700'
                        }`}
                    />
                    {errors[field.name as keyof TFieldValues] && (
                        <Text as="p" className="text-red-500 mt-2">
                            {String(errors['imageFile']?.message)}
                        </Text>
                    )}
                </>
            )}
        />
    )

}


export default ImageUpload;

