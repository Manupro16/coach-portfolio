'use client'
import type {FieldConfig} from './EditForm'
import {
    UseFormRegister,
    Control,
    UseFormSetValue,
    FieldErrors, FieldValues,
    Path, useWatch, Controller
} from 'react-hook-form'

import TextField from './TextField'
import DynamicReactMDEditor from './DynamicReactMDEditor'
import ImageUpload from './imageUpload'
import ImagePreview from "@/app/admin/edit/components/imagePreview";
import VideoUpload from "@/app/admin/edit/components/VideoUploud";
import VideoPreview from "@/app/admin/edit/components/VideoPreview";

export type RendererProps<T extends FieldValues> = {
    field: FieldConfig<T>
    register: UseFormRegister<T>
    control: Control<T>
    setValue: UseFormSetValue<T>
    errors: FieldErrors<T>
    colorMode: 'light' | 'dark'
}

// 1) Text fields…
export function TextFieldRenderer<T extends FieldValues>(props: RendererProps<T>) {
    const {field, errors, colorMode, control} = props
    return (
        <Controller
            control={control}
            name={field.name as Path<T>}
            defaultValue={field.defaultValue}
            render={({field: controllerField}) => (
                <TextField
                    id={field.name}
                    label={field.label}
                    fieldType="text"
                    placeHolder=""
                    errors={errors}
                    colorMode={colorMode}
                    errorKey={field.name as string}
                    {...controllerField}
                />
            )
            }
        />
    )
}

// 2) Markdown…
export function MarkdownRenderer<T extends FieldValues>(props: RendererProps<T>) {

    const {control, field, colorMode, errors} = props

    return (
        <Controller<T, Path<T>>
            control={control}
            name={field.name as Path<T>}
            defaultValue={field.defaultValue}
            render={({field: controllerField}) => (
                <DynamicReactMDEditor
                    value={controllerField.value}
                    onChange={controllerField.onChange}
                    colorMode={colorMode}
                    label={field.label}
                    errors={errors}
                    errorKey={field.name as string}
                />
            )}
        />
    )
}


// 3) Image upload…
export function ImageRenderer<T extends FieldValues>(props: RendererProps<T>) {
    const {control, setValue, errors, colorMode, field} = props

    // watch the preview URL (stored in imageSrc)
    const imagePreviewUrl = useWatch({
        control,
        name: 'imageSrc' as Path<T>,  // must match your previewName
    }) as string | undefined

    const rawError = errors[field.name]?.message
    const imageError =
        typeof rawError === 'string'
            ? rawError
            : rawError instanceof Array
                ? rawError.join(', ')
                : rawError
                    ? String(rawError)
                    : null


    return (
        <>
            <ImageUpload
                name={field.name as Path<T>}
                previewName={'imageSrc' as Path<T>}
                control={control}
                setValue={setValue}
                errors={errors}
                colorMode={colorMode}
            />
            <ImagePreview
                imagePreviewUrl={imagePreviewUrl}
                imageError={imageError}
                colorMode={colorMode}
            />
        </>
    )
}


export function VideoRenderer<T extends FieldValues>(props: RendererProps<T>) {
    const {control, setValue, errors, colorMode, field} = props;

    const videoPreviewUrl = useWatch({
        control,
        name: 'videoSrc' as Path<T>,
    }) as string | undefined;

    const rawError = errors[field.name]?.message;
    const videoError = typeof rawError === 'string' ? rawError : rawError ? String(rawError) : null;

    return (
        <>
            <VideoUpload
                name={"videoFile" as Path<T>}
                previewName={'videoSrc' as Path<T>}
                control={control}
                setValue={setValue}
                errors={errors}
                colorMode={colorMode}
            />
            <VideoPreview
                videoPreviewUrl={videoPreviewUrl}
                videoError={videoError}
                colorMode={colorMode}
            />
        </>
    );
}

export function DateRenderer<T extends FieldValues>({ field, control, errors, colorMode }: RendererProps<T>) {
    return (
        <Controller<T, Path<T>>
            control={control}
            name={field.name as Path<T>}
            defaultValue={field.defaultValue}
            render={({field: controllerField}) => (
                <TextField
                    {...controllerField}
                    id={field.name}
                    label={field.label}
                    fieldType="date"      // ← native date picker
                    placeHolder=""
                    errors={errors}
                    colorMode={colorMode}
                />
            )}
        />
    );
}

