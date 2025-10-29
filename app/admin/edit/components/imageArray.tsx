'use client'

import * as React from 'react'
import {
  Controller,
  useFieldArray,
  useWatch,
  type FieldValues,
  type Path,
  useFormContext,
} from 'react-hook-form'
import { Box, Heading } from '@radix-ui/themes'
import TextField from './TextField'
import ImagePreview from './imagePreview'
import ImageUpload from './imageUpload'

export interface ImageArrayProps<T extends FieldValues> {
  name: Path<T>            // path to the images array (e.g. 'images')
  colorMode: 'light' | 'dark'
  label?: string
  count?: number // how many image slots to render
}

// Render a single image slot; hooks are called at the top-level of this component
function ImageSlot<T extends FieldValues>(props: {
  index: number
  name: Path<T>
  colorMode: 'light' | 'dark'
}) {
  const { index, name, colorMode } = props
  const { control, setValue, formState: { errors } } = useFormContext<T>()

  // watch the src for preview
  const previewUrl = useWatch({ control, name: `${String(name)}.${index}.src` as Path<T> }) as string | undefined

  // Helper to compute a safe error string
  const getError = React.useCallback((path: string): string | null => {
    const segs = path.split('.')
    let cur: any = errors
    for (const s of segs) {
      if (!cur) return null
      cur = cur[s as keyof typeof cur]
    }
    const msg = cur?.message
    return typeof msg === 'string' ? msg : msg ? String(msg) : null
  }, [errors])

  const srcError = getError(`${String(name)}.${index}.src`)
  const altError = getError(`${String(name)}.${index}.alt`)

  return (
    <Box className="rounded-md border border-gray-700 p-4 space-y-3">
      <Box className="mb-2 text-sm text-gray-400">Image slot {index + 1}</Box>

      {/* order (hidden) */}
      <Controller
        control={control}
        name={`${String(name)}.${index}.order` as Path<T>}
        defaultValue={index as any}
        render={({ field }) => <input type="hidden" {...field} value={index} />}
      />

      {/* file upload sets a blob URL into .src for preview */}
      <ImageUpload
        name={`${String(name)}.${index}.file` as Path<T>}
        previewName={`${String(name)}.${index}.src` as Path<T>}
        colorMode={colorMode}
      />

      {/* src as a text field (URL or /path) */}
      <Controller
        control={control}
        name={`${String(name)}.${index}.src` as Path<T>}
        defaultValue={'' as any}
        render={({ field }) => (
          <TextField
            id={`${String(name)}.${index}.src`}
            label="Image URL or /path"
            fieldType="text"
            placeHolder="https://… or /pic/file.jpg"
            errors={errors as any}
            colorMode={colorMode}
            errorKey={`${String(name)}.${index}.src`}
            {...field}
          />
        )}
      />

      {/* alt as a text field */}
      <Controller
        control={control}
        name={`${String(name)}.${index}.alt` as Path<T>}
        defaultValue={'' as any}
        render={({ field }) => (
          <TextField
            id={`${String(name)}.${index}.alt`}
            label="Alt text"
            fieldType="text"
            placeHolder="Describe the image"
            errors={errors as any}
            colorMode={colorMode}
            errorKey={`${String(name)}.${index}.alt`}
            {...field}
          />
        )}
      />

      {/* live preview from src */}
      <ImagePreview imagePreviewUrl={previewUrl} imageError={srcError || altError} colorMode={colorMode} />
    </Box>
  )
}

function ImageArray<T extends FieldValues>({ name, colorMode, label, count = 3 }: ImageArrayProps<T>) {
  const { control } = useFormContext<T>()
  // FieldArray to manipulate the images array
  const { fields, replace } = useFieldArray({
    control: control as any,
    name: name as any,
  })

  // Ensure exactly {count} slots (order 0..count-1)
  React.useEffect(() => {
    if (fields.length !== count) {
      const normalized = Array.from({ length: count }, (_, i) => fields[i] ?? { order: i, src: '', alt: '' })
      replace(normalized as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.length, count])

  return (
    <Box className="space-y-6">
      {label && (
        <Heading size="3" className="mb-2">
          {label}
        </Heading>
      )}

      {Array.from({ length: count }).map((_, i) => (
        <ImageSlot<T>
          key={`image-slot-${i}`}
          index={i}
          name={name}
          colorMode={colorMode}
        />
      ))}
    </Box>
  )
}

export default ImageArray