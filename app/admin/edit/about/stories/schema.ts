// app/admin/edit/about/stories/schema.ts
import { z } from 'zod'

// Simple slugify for server-side safety as well
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // remove non-url-safe
    .replace(/\s+/g, '-') // spaces to hyphens
    .replace(/-+/g, '-') // collapse multiples
}

const nonEmpty = (min = 1) => z.string().trim().min(min)
const optionalString = z.preprocess((v) => (v == null ? '' : v), z.string())

export const storySchema = z
  .object({
    slug: z
      .string()
      .trim()
      .max(120)
      .optional()
      .transform((v) => (v ?? '').toLowerCase())
      .refine((v) => !v || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v), {
        message: 'Slug must contain only lowercase letters, numbers and hyphens',
      }),
    title: nonEmpty(2).max(160),
    subtitle: optionalString,
    body: nonEmpty(5),
    order: z.preprocess((v) => (v === '' || v == null ? 0 : v), z.coerce.number().int().min(0).max(999)),
  })
  .transform((val) => {
    // derive slug from title if missing
    const finalSlug = (val.slug && val.slug.length > 0) ? val.slug : slugify(val.title)
    return { ...val, slug: finalSlug }
  })

export type StoryInput = z.input<typeof storySchema>
export type StoryOutput = z.output<typeof storySchema>
