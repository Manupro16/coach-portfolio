import {prisma} from '@/lib/prisma'
import React from "react";
import WelcomeFormClient from "@/app/admin/edit/home/welcome/WelcomeFormClient";
import {type zodWelcomeInput, welcomeSchema} from "@/app/admin/edit/home/welcome/schema";
import {cloudinary} from "@/lib/cloudinary";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";


// 1) Server Action
export async function onSubmitAction(raw: zodWelcomeInput) {
    'use server'

    // ① validate once
    const data = welcomeSchema.parse(raw)

    // ② handle optional image
    let imageSrc = data.imageSrc
    const file = data.imageFile?.[0]

    if (file) {
        const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']
        if (!ALLOWED.includes(file.type)) throw new Error('Invalid file type')
        if (file.size > 5 * 1024 * 1024) throw new Error('File exceeds 5 MB')

        const buffer = Buffer.from(await file.arrayBuffer())
        const base64 = buffer.toString('base64')
        const dataUri = `data:${file.type};base64,${base64}`
        const upload = await cloudinary.uploader.upload(dataUri, {
            folder: 'section-welcome',
            overwrite: true,
        })
        imageSrc = upload.secure_url
    }

    const imageSrcFinal = imageSrc ?? "";

    await prisma.welcomeContent.upsert({
        where: {id: 1},
        update: {
            title: data.title,
            subtitle: data.subtitle,
            contentTitle: data.contentTitle,
            contentSubtitle: data.contentSubtitle,
            imageTitle: data.imageTitle,
            imageSrc: imageSrcFinal,
        }, create: {
            title: data.title,
            subtitle: data.subtitle,
            contentTitle: data.contentTitle,
            contentSubtitle: data.contentSubtitle,
            imageTitle: data.imageTitle,
            imageSrc: imageSrcFinal,
        }
    })


    revalidatePath('/')
    redirect('/')
}


async function EditWelcomeSection() {
    const record = await prisma.welcomeContent.findFirst()

    const initialData: zodWelcomeInput = {
        title: record?.title ?? '',
        subtitle: record?.subtitle ?? '',
        contentTitle: record?.contentTitle ?? '',
        contentSubtitle: record?.contentSubtitle ?? '',
        imageSrc: record?.imageSrc ?? '',
        imageTitle: record?.imageTitle ?? '',
    }


    if (!initialData) {
        return <p className="p-8 text-center">Loading…</p>
    }


    return (
        <WelcomeFormClient initialData={initialData} onSubmitAction={onSubmitAction}/>
    )
}


export default EditWelcomeSection;

