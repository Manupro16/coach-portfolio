'use client'

import React from 'react'
import {Box, Flex, Heading} from '@radix-ui/themes'
import {
    useForm,
    type UseFormRegister,
    type Control,
    type UseFormSetValue,
    type FieldErrors,
    type DefaultValues,
} from 'react-hook-form'


// Shared types:
export type FieldKind = 'text' | 'markdown' | 'image'

export interface FieldConfig<T> {
    kind: FieldKind
    name: Extract<keyof T, string>
    label: string
    defaultValue?: T[keyof T]
}

// Props for your generic form:
interface EditFormProps<T extends Record<string, unknown>> {
    fields: FieldConfig<T>[]
    componentMap: Record<
        FieldKind,
        React.FC<{
            field: FieldConfig<T>
            register: UseFormRegister<T>
            control: Control<T>
            setValue: UseFormSetValue<T>
            errors: FieldErrors<T>
            colorMode: 'light' | 'dark'
        }>
    >
    initialData: DefaultValues<T>
    onSubmit: (values: T) => Promise<void>
    title?: string
}

export default function EditForm<T extends Record<string, unknown>>({
                                                                        fields,
                                                                        componentMap,
                                                                        initialData,
                                                                        onSubmit,
                                                                        title = 'Edit Entry'
                                                                    }: EditFormProps<T>) {
    const [colorMode] = React.useState<'light' | 'dark'>('dark')
    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: {errors, isSubmitting},
    } = useForm<T>({defaultValues: initialData})

    return (
        <Flex justify="center" className="w-full h-full">
            <Box
                className={`shadow-md rounded-lg p-8 w-full max-w-3xl ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-700'}`}>
                <Heading size="4" className="text-2xl font-semibold text-green-500 mb-4">
                    {title}
                </Heading>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {fields.map(field => {
                        const Component = componentMap[field.kind]
                        return (
                            <Component
                                key={field.name}
                                field={field}
                                register={register}
                                control={control}
                                setValue={setValue}
                                errors={errors}
                                colorMode={colorMode}
                            />
                        )
                    })}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-6 px-4 py-2 bg-primary text-white rounded"
                    >
                        {isSubmitting ? 'Saving…' : 'Save'}
                    </button>
                </form>
            </Box>
        </Flex>
    )
}
