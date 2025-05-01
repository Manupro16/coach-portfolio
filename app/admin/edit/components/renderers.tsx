'use client'
import type {FieldConfig} from './EditForm'
import type {
    UseFormRegister,
    Control,
    UseFormSetValue,
    FieldErrors, FieldValues, PathValue
} from 'react-hook-form'

import TextField from './TextField'
import DynamicReactMDEditor from './DynamicReactMDEditor'
import ImageUpload from './imageUpload'

type RendererProps<T extends FieldValues> = {
  field:     FieldConfig<T>
  register:  UseFormRegister<T>
  control:   Control<T>
  setValue:  UseFormSetValue<T>
  errors:    FieldErrors<T>
  colorMode: 'light'|'dark'
}

// 1) Text fields…
export function TextFieldRenderer<T extends FieldValues>(props: RendererProps<T>) {
  const { field, register, errors, colorMode } = props
  return (
    <TextField
      id={field.name}
      label={field.label}
      value={(field.defaultValue as string) || ''}
      fieldType="text"
      placeHolder=""
      colorMode={colorMode}
      errors={errors}
      {...register(field.name as any, { required: true })}
    />
  )
}

// 2) Markdown…
export function MarkdownRenderer<T extends FieldValues>(props: RendererProps<T>) {
  const { field, setValue, colorMode } = props
  return (
    <DynamicReactMDEditor
      value={(field.defaultValue as string) || ''}
      onChange={(newValue) => setValue(field.name, newValue as PathValue<T, typeof field.name>
)}
      colorMode={colorMode}
    />
  )
}


// 3) Image upload…
export function ImageRenderer<T extends FieldValues>(props: RendererProps<T>) {
  const { control, setValue, errors, colorMode } = props
  return (
    <ImageUpload
      control={control}
      setValue={setValue}
      errors={errors}
      colorMode={colorMode}
    />
  )
}