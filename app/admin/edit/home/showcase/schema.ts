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
    videoFile: z.array(z.instanceof(File)).max(1, 'pick exactly one file').optional(),
    videoSrc: z.string().url().optional(),
    updatedAt: z.coerce.date().optional(),// existing Cloudinary URL
})

export type zodShowcaseInput = z.infer<typeof showcaseSchema>