import {prisma} from '@/lib/prisma';


export async function onSubmitAction(raw: any) {
    'use server';
    console.log('Form submitted:', raw);

}


async function EditShowcaseSection() {
    const record = await prisma.showcaseVideo.findFirst()
    if (!record) throw new Error('No welcome section found')








}


export default EditShowcaseSection

