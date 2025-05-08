// app/admin/edit/home/welcome/schema.ts
import {z} from 'zod'

export const welcomeSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    subtitle: z.string().min(1, 'Subtitle is required'),
    contentTitle: z.string().min(1, 'Content title is required'),
    contentSubtitle: z.string().min(1, 'Content subtitle is required'),
    imageTitle: z.string().min(1, 'Image title is required'),
    imageFile: z
        .any()
        .refine(f => !f || (Array.isArray(f) && f.length === 1), 'Pick exactly one file')
        .optional(),
    imageSrc: z.string().url().optional(),
    updatedAt:  z.coerce.date().optional(),
})

// The TypeScript type produced by that schema
export type zodWelcomeInput = z.infer<typeof welcomeSchema>
