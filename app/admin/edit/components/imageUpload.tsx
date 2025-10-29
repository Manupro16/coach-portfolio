'use client';

import React, {useEffect, useRef} from 'react';
import {Text} from '@radix-ui/themes';
import {Controller, FieldValues, Path, useFormContext} from 'react-hook-form';


interface ImageUploadProps<TFieldValues extends FieldValues> {
    colorMode: 'light' | 'dark';
    name: Path<TFieldValues>;
    previewName:  Path<TFieldValues>;
}


function ImageUpload<TFieldValues extends FieldValues>({
                                                           colorMode,
                                                           name,
                                                           previewName
                                                       }: ImageUploadProps<TFieldValues>) {
    const { control, setValue, formState: { errors } } = useFormContext<TFieldValues>()



    const lastUrlRef = useRef<string | null>(null)

    useEffect(() => {
        return () => {
            if (lastUrlRef.current?.startsWith('blob:')) URL.revokeObjectURL(lastUrlRef.current);
        };
    }, [])


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


                            if (files[0]) {
                                // revoke previous URL before creating a new one
                                if (lastUrlRef.current?.startsWith('blob:')) URL.revokeObjectURL(lastUrlRef.current);
                                const previewUrl = URL.createObjectURL(files[0]);
                                lastUrlRef.current = previewUrl
                                setValue(previewName, previewUrl as TFieldValues[typeof previewName]);
                            }
                        }}
                        className={`mt-1 block w-full ${
                            colorMode === 'dark' ? 'text-white' : 'text-gray-700'
                        }`}
                    />
                    {errors[field.name as keyof TFieldValues] && (
                        <Text as="p" className="text-red-500 mt-2">
                            {String(errors[field.name as keyof TFieldValues]?.message ?? "err")}
                        </Text>
                    )}
                </>
            )}
        />
    )

}


export default ImageUpload;

