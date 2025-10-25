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
const stringOrEmpty = z.preprocess(
  (v) => (v === null || v === undefined ? "" : v),
  z.string()
);
const orderField = z.preprocess(
  (v) => (v === "" || v == null ? 0 : v),
  z.coerce.number().int().min(0).max(99) // cap to 0–99 to support variable image counts
);

export const heroImageRowSchema = z
  .object({
    id: z.coerce.number().optional(),
    order: orderField,              // 0,1,2
    src: urlOrPathOrEmpty,          // "" allowed in form
    // transient file field for uploads/preview (form-only)
    file: z.any().optional(),
    // Allow empty by default; enforce constraints conditionally below
    alt: stringOrEmpty,
  })
  .superRefine((val, ctx) => {
    const hasSrc = val.src.trim() !== "";
    const altTrim = val.alt.trim();

    if (hasSrc) {
      if (altTrim.length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Alt text must be at least 2 characters when an image src is provided",
          path: ["alt"],
        });
      }
      if (altTrim.length > 120) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          type: "string",
          maximum: 120,
          inclusive: true,
          message: "Alt text must be at most 120 characters",
          path: ["alt"],
        });
      }
    }
  });

export const heroSchema = z.object({
  fullName: nonEmpty(2).max(120),
  nickname: normalizeNullishToEmpty,   // Prisma: String?
  headline: normalizeNullishToEmpty,   // Prisma: String?
  summary: normalizeNullishToEmpty,    // Prisma: String? (Text)
  images: z.array(heroImageRowSchema).min(1).max(12), // variable slots; editor controls count
});

export type HeroInput = z.input<typeof heroSchema>;
export type HeroOutput = z.output<typeof heroSchema>;
