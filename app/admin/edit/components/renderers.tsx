'use client'
import type {FieldConfig} from './EditForm'
import {
    FieldValues,
    Path,
    FieldArrayPath,
    useWatch,
    Controller,
    useFormContext,
    type FieldErrors,
} from 'react-hook-form'

import TextField from './TextField'
import DynamicReactMDEditor from './DynamicReactMDEditor'
import ImageUpload from './imageUpload'
import ImagePreview from "@/app/admin/edit/components/imagePreview";
import VideoUpload from "@/app/admin/edit/components/VideoUpload";
import VideoPreview from "@/app/admin/edit/components/VideoPreview";
import ImageArray from './imageArray'

function getErrorMessage(errors: FieldErrors | undefined, path: string): string | null {
    if (!errors) return null
    const segs = path.split('.')
    let cur: unknown = errors
    for (const s of segs) {
        if (cur == null || typeof cur !== 'object') return null
        cur = (cur as Record<string, unknown>)[s]
    }
    const msg = (cur as { message?: unknown } | undefined)?.message
    return typeof msg === 'string' ? msg : msg ? String(msg) : null
}

export type RendererProps<T extends FieldValues> = {
    field: FieldConfig<T>
    colorMode: 'light' | 'dark'
}

// 1) Text fields…
export function TextFieldRenderer<T extends FieldValues>(props: RendererProps<T>) {
    const { field, colorMode } = props
    const { control, formState: { errors } } = useFormContext<T>()
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
                    errors={errors as FieldErrors}
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
    const { field, colorMode } = props
    const { control, formState: { errors } } = useFormContext<T>()

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
                    errors={errors as FieldErrors}
                    errorKey={field.name as string}
                />
            )}
        />
    )
}


// 3) Image upload…
export function ImageRenderer<T extends FieldValues>(props: RendererProps<T>) {
    const { field, colorMode } = props
    const { control, formState: { errors } } = useFormContext<T>()

    // watch the preview URL (stored in imageSrc)
    const imagePreviewUrl = useWatch({
        control,
        name: 'imageSrc' as Path<T>,  // must match your previewName
    }) as string | undefined

    const imageError = getErrorMessage(errors, String(field.name))


    return (
        <>
            <ImageUpload
                name={field.name as Path<T>}
                previewName={'imageSrc' as Path<T>}
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
    const { field, colorMode } = props;
    const { control, formState: { errors } } = useFormContext<T>()

    const videoPreviewUrl = useWatch({
        control,
        name: 'videoSrc' as Path<T>,
    }) as string | undefined;

    const videoError = getErrorMessage(errors, String(field.name));

    return (
        <>
            <VideoUpload
                name={"videoFile" as Path<T>}
                previewName={'videoSrc' as Path<T>}
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

function toInputValue(value: unknown): string {
    if (!value) return '';

    const d =
        typeof value === 'string' ? new Date(value) :
            value instanceof Date ? value :
                new Date(String(value));

    return Number.isNaN(d.valueOf())       // invalid date guard
        ? ''
        : d.toISOString().slice(0, 10);      // "YYYY-MM-DD"
}


export function DateRenderer<T extends FieldValues>({ field, colorMode }: RendererProps<T>) {
    const { control, formState: { errors } } = useFormContext<T>()
    return (
        <Controller<T, Path<T>>
            control={control}
            name={field.name as Path<T>}
            defaultValue={field.defaultValue}
            render={({field: controllerField}) => {

                return (
                    <TextField
                        {...controllerField}
                        id={field.name}
                        label={field.label}
                        fieldType="date"
                        placeHolder=""
                        errors={errors as FieldErrors}
                        colorMode={colorMode}
                        value={toInputValue(controllerField.value)}
                    />
                );
            }}
        />
    );
}


export function ImageArrayRenderer<T extends FieldValues>({ field, colorMode }: RendererProps<T>) {
  return (
    <ImageArray<T, FieldArrayPath<T>>
      name={field.name as FieldArrayPath<T>}
      colorMode={colorMode}
      label={field.label}
      count={field.count ?? 3}
    />
  )
}


