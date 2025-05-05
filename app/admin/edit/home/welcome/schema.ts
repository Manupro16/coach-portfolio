// app/admin/edit/home/welcome/schema.ts
import { z } from 'zod'

export const welcomeSchema = z.object({
  title:           z.string().min(1, 'Title is required'),
  subtitle:        z.string().optional(),
  contentTitle:    z.string().optional(),
  contentSubtitle: z.string().min(1, 'Content is required'),
  imageSrc:        z.string().url().optional(),
  imageFile:       z
                      .any()
                      .refine(files => !files || files.length === 1, 'Pick exactly one file')
                      .optional(),
  imageTitle:      z.string().optional(),
  updatedAt:       z.date().optional(),  // if you keep it in the payload
})

// TypeScript type inferred automatically:
export type WelcomeInput = z.infer<typeof welcomeSchema>
