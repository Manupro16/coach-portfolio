'use client'

import React from 'react'
import {Box, Flex, Heading} from '@radix-ui/themes'
import {
    useForm,
    type DefaultValues,
    Path,
    FormProvider,
} from 'react-hook-form'
import type {Resolver, FieldValues} from 'react-hook-form'
import clsx from "clsx";


// Shared types:
export type FieldKind = 'text' | 'markdown' | 'image' | 'video' | 'date' | 'imageArray'

export interface FieldConfig<T extends FieldValues> {
    kind: FieldKind
    name: Path<T>
    label: string
    defaultValue?: T[keyof T]
    count?: number
}

// Props for your generic form:
interface EditFormProps<TFieldValues extends FieldValues, TOutput = TFieldValues, TContext = unknown> {
    fields: FieldConfig<TFieldValues>[]
    componentMap: Record<
        FieldKind,
        React.FC<{
            field: FieldConfig<TFieldValues>
            colorMode: 'light' | 'dark'
        }>
    >
    initialData: DefaultValues<TFieldValues>
    onSubmit: (values: TOutput) => Promise<void>
    title?: string
    resolver?: Resolver<TFieldValues, TContext, TOutput>
}

export default function EditForm<TFieldValues extends FieldValues, TOutput = TFieldValues, TContext = unknown>({
                                                                                                                 fields,
                                                                                                                 resolver,
                                                                                                                 componentMap,
                                                                                                                 initialData,
                                                                                                                 onSubmit,
                                                                                                                 title = 'Edit Entry'
                                                                                                             }: EditFormProps<TFieldValues, TOutput, TContext>) {
    const [colorMode] = React.useState<'light' | 'dark'>('dark')
    const methods = useForm<TFieldValues, TContext, TOutput>({
        defaultValues: initialData,
        resolver: resolver,
        mode: 'onChange',
        reValidateMode: 'onChange'
    })

    const { handleSubmit, formState: { isSubmitting, isValid } } = methods

    return (
        <Flex justify="center" align="center" className="relative z-10 px-4 py-12 sm:px-6 lg:px-8">
            <Box
                className={`shadow-md rounded-lg p-8 w-full max-w-3xl ${colorMode === 'dark' ? 'bg-gray-900' : 'bg-gray-700'}`}>
                <Heading size="4" className="text-2xl font-semibold text-green-500 mb-4">
                    {title}
                </Heading>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {fields.map((field, idx) => {
                            const Component = componentMap[field.kind]
                            return (
                                <Component
                                    key={`${String(field.name)}-${idx}`}
                                    field={field}
                                    colorMode={colorMode}
                                />
                            )
                        })}

                        <button
                            type="submit"
                            disabled={isSubmitting || !isValid}
                            className={clsx(
                                'mt-6 px-4 py-2 rounded text-white',
                                (isSubmitting || !isValid)
                                    ? 'bg-gray-500 cursor-not-allowed'
                                    : 'bg-primary hover:bg-primary/90',
                            )}
                        >
                            {isSubmitting ? 'Saving…' : 'Save'}
                        </button>
                    </form>
                </FormProvider>
            </Box>
        </Flex>

    )
}
