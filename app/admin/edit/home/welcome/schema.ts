// app/admin/edit/home/welcome/schema.ts
import { z } from 'zod'

const urlOrPathOrEmpty = z
  .union([
    z.string().url(),
    z.string().regex(/^\/(?!\/).+/, {
      message: 'Use a valid URL or a site-relative path starting with /',
    }),
    z.literal(''),
    z.undefined(),
  ])
  .transform((v) => v ?? '')

export const welcomeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  contentTitle: z.string().min(1, 'Content title is required'),
  contentSubtitle: z.string().min(1, 'Content subtitle is required'),
  imageTitle: z.string().min(1, 'Image title is required'),
  imageFile: z
    .any()
    .refine((f) => !f || (Array.isArray(f) && f.length <= 1), 'Pick at most one file')
    .optional(),
  imageSrc: urlOrPathOrEmpty,
  updatedAt: z.coerce.date().optional(),
})

export type zodWelcomeInput = z.infer<typeof welcomeSchema>
