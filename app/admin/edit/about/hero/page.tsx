import {prisma} from '@/lib/prisma'
import {type AboutHero} from "@prisma/client"




export async function onSubmitAction(raw: any) {
    'use server'
    console.log(raw)
}



async function EditHeroSection() {
    const record = await prisma.aboutHero.findFirst()

    const initialData: AboutHero = {
        id: record?.id ?? 1,
        fullName: record?.fullName ?? '',
        nickname: record?.nickname ?? '',
        headline: record?.headline ?? '',
        summary: record?.summary ?? '',
        createdAt: record?.createdAt ?? new Date(),
        updatedAt: record?.updatedAt ?? new Date()

    }









}

export default EditHeroSection
