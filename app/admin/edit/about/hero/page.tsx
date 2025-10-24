import {prisma} from '@/lib/prisma'
import {HeroFormValues} from "@/app/admin/edit/about/hero/schema";


export async function onSubmitAction(raw: any) {
    'use server'
    console.log(raw)
}


async function EditHeroSection() {
    const record = await prisma.aboutHero.findUnique({
        where: {id: 1},                  // singleton
        include: {
            images: {orderBy: {order: "asc"}},
        },
    });

    const initialData: HeroFormValues = {
        fullName: record?.fullName ?? "",
        nickname: record?.nickname ?? "",
        headline: record?.headline ?? "",
        summary: record?.summary ?? "",
        images: record?.images ?? [],
    }


}

export default EditHeroSection
