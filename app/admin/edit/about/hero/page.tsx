import { prisma } from '@/lib/prisma'
import HeroFormClient from '@/app/admin/edit/about/hero/HeroFormClient'
import { heroSchema, type HeroInput, type HeroOutput } from '@/app/admin/edit/about/hero/schema'
import { cloudinary } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function onSubmitAction(raw: HeroOutput) {
    'use server'

    // Validate and normalize on the server
    const data = heroSchema.parse(raw) as HeroOutput

    // Prepare images: upload new files, ignore empty/blob src
    const processed = [] as { order: number; src: string; alt: string }[]

    for (let i = 0; i < data.images.length; i++) {
        const img = data.images[i]
        const order = typeof img.order === 'number' ? img.order : i
        let src: string = (img.src ?? '').trim()
        const alt: string = (img.alt ?? '').trim()

        const maybeFiles: unknown = (img as { file?: unknown }).file
        const files: File[] = Array.isArray(maybeFiles)
            ? (maybeFiles as unknown[]).filter((f): f is File => typeof File !== 'undefined' && f instanceof File)
            : []
        const file = files[0]

        if (file) {
            const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']
            if (!ALLOWED.includes(file.type)) throw new Error('Invalid file type')
            if (file.size > 5 * 1024 * 1024) throw new Error('File exceeds 5 MB')

            const buffer = Buffer.from(await file.arrayBuffer())
            const base64 = buffer.toString('base64')
            const dataUri = `data:${file.type};base64,${base64}`

            const upload = await cloudinary.uploader.upload(dataUri, {
                folder: 'coach-portfolio/about-hero',
            })
            src = upload.secure_url
        } else if (src.startsWith('blob:')) {
            // Do not persist blob preview URLs
            src = ''
        }

        if (src !== '') {
            processed.push({ order, src, alt })
        }
    }

    await prisma.$transaction(async (tx) => {
        // Ensure the singleton parent row exists and update text fields
        await tx.aboutHero.upsert({
            where: { id: 1 },
            update: {
                fullName: data.fullName,
                nickname: data.nickname || null,
                headline: data.headline || null,
                summary: data.summary || null,
            },
            create: {
                id: 1,
                fullName: data.fullName,
                nickname: data.nickname || null,
                headline: data.headline || null,
                summary: data.summary || null,
            },
        })

        // Sync images by order (0..2)
        const existing = await tx.aboutHeroImage.findMany({ where: { aboutHeroId: 1 } })
        const existingByOrder = new Map(existing.map((e) => [e.order, e]))
        const desiredByOrder = new Map(processed.map((d) => [d.order, d]))

        // Upsert desired
        for (const d of processed) {
            const ex = existingByOrder.get(d.order)
            if (ex) {
                if (ex.src !== d.src || ex.alt !== d.alt) {
                    await tx.aboutHeroImage.update({
                        where: { id: ex.id },
                        data: { src: d.src, alt: d.alt },
                    })
                }
            } else {
                await tx.aboutHeroImage.create({
                    data: { aboutHeroId: 1, order: d.order, src: d.src, alt: d.alt },
                })
            }
        }

        // Delete removed orders
        for (const ex of existing) {
            if (!desiredByOrder.has(ex.order)) {
                await tx.aboutHeroImage.delete({ where: { id: ex.id } })
            }
        }
    })

    // Revalidate About page and return/redirect
    revalidatePath('/about')
    redirect('/about')
}

async function EditHeroSection() {
    const record = await prisma.aboutHero.findUnique({
        where: { id: 1 }, // singleton
        include: {
            images: { orderBy: { order: 'asc' } },
        },
    })

    // Normalize images to exactly 3 slots (order 0..2) to match the editor count
    const rawImages = (record?.images ?? []).sort((a, b) => a.order - b.order)
    const images = Array.from({ length: 3 }, (_, i) => rawImages.find(x => x.order === i) ?? { order: i, src: '', alt: '' })

    const initialData: HeroInput = {
        fullName: record?.fullName ?? '',
        nickname: record?.nickname ?? '',
        headline: record?.headline ?? '',
        summary: record?.summary ?? '',
        images,
    }

    return (
        <HeroFormClient initialData={initialData} onSubmitAction={onSubmitAction} />
    )
}

export default EditHeroSection
