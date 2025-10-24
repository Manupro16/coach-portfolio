// app/admin/edit/about/hero/heroSchema.ts
import { z } from "zod";

const normalizeNullishToEmpty = z.preprocess(
  (v) => (v === null || v === undefined ? "" : v),
  z.string()
);

// Accept absolute URL or site-relative path starting with "/",
// or empty string/undefined (form placeholder)
const urlOrPathOrEmpty = z
  .union([
    z.string().url(),                    // https://...
    z.string().regex(/^\/(?!\/).+/, {    // /pic/file.jpg, /images/hero.png, etc.
      message: "Use a valid URL or a site-relative path starting with /",
    }),
    z.literal(""),
    z.undefined(),
  ])
  .transform((v) => v ?? "");

const nonEmpty = (min = 1) => z.string().trim().min(min);
const orderField = z.preprocess(
  (v) => (v === "" || v == null ? 0 : v),
  z.coerce.number().int().min(0)
);

export const heroImageRowSchema = z.object({
  id: z.coerce.number().optional(),
  order: orderField,              // 0,1,2
  src: urlOrPathOrEmpty,          // "" allowed in form
  alt: nonEmpty(2).max(120),      // see superRefine below
}).superRefine((val, ctx) => {
  const hasSrc = val.src.trim() !== "";
  // If src is empty, allow alt to be empty as well (empty slot).
  if (!hasSrc && val.alt.trim().length > 0) {
    // optional: normalize or warn. We'll let it pass silently.
  }
});

export const heroSchema = z.object({
  fullName: nonEmpty(2).max(120),
  nickname: normalizeNullishToEmpty,   // Prisma: String?
  headline: normalizeNullishToEmpty,   // Prisma: String?
  summary: normalizeNullishToEmpty,    // Prisma: String? (Text)
  images: z.array(heroImageRowSchema).min(3).max(3), // exactly 3 slots in UI
});

export type HeroFormValues = z.infer<typeof heroSchema>;
