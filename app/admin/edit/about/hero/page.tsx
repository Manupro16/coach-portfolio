import { prisma } from '@/lib/prisma'
import HeroFormClient from '@/app/admin/edit/about/hero/HeroFormClient'
import { type HeroInput } from '@/app/admin/edit/about/hero/schema'

export async function onSubmitAction(raw: any) {
    'use server'
    console.log(raw)
}

async function EditHeroSection() {
    const record = await prisma.aboutHero.findUnique({
        where: { id: 1 }, // singleton
        include: {
            images: { orderBy: { order: 'asc' } },
        },
    })

    const initialData: HeroInput = {
        fullName: record?.fullName ?? '',
        nickname: record?.nickname ?? '',
        headline: record?.headline ?? '',
        summary: record?.summary ?? '',
        images: record?.images ?? [],
    }

    return (
        <HeroFormClient initialData={initialData} onSubmitAction={onSubmitAction} />
    )
}

export default EditHeroSection
