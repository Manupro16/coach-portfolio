import {z} from 'zod';

/* ─────── video-specific constants ─────── */
const MAX_SIZE = 100 * 1024 * 1024;                    // 100 MB
const ALLOWED = ['video/mp4', 'video/webm', 'video/quicktime'] as const;


/* ------------  main showcase schema  ------------ */
export const showcaseSchema = z.object({
    id: z.number(),
    team: z.string().min(1, 'Team name is required'),
    season: z.string().min(1, 'Season name is required'),
    date: z.coerce.date({required_error: 'Date is required'}),
    description: z.string().min(1, 'Description is required').nullable(),

    /* ↓  same dual-field idea as welcomeSchema ↓ */
    videoFile: z
        .any()
        .refine(f => !f || (Array.isArray(f) && f.length === 1), 'Pick exactly one file')
        .refine(f => {
            if (!f || !Array.isArray(f) || f.length === 0) return true;   // nothing to check
            const file = f[0] as File;
            return (
                ALLOWED.includes(file.type as any) && file.size <= MAX_SIZE
            );
        }, `File must be MP4 / WebM / MOV and ≤ ${MAX_SIZE / 1024 / 1024} MB`)
        .optional(),

    videoSrc: z.string().url().optional(),
    updatedAt: z.coerce.date().optional(),// existing Cloudinary URL
})

export type zodShowcaseInput = z.infer<typeof showcaseSchema>