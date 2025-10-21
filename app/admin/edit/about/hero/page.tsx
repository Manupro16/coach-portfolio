import {prisma} from '@/lib/prisma'






export async function onSubmitAction(raw: any) {
    'use server'
    console.log(raw)
}



async function EditHeroSection() {
    const record = await prisma.aboutHero.findFirst()

    const initialData = {


    }









}

export default EditHeroSection
