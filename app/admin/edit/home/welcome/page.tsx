import {prisma} from '@/lib/prisma'
import React from "react";
import {WelcomeContent} from "@prisma/client";
import WelcomeFormClient from "@/app/admin/edit/home/welcome/WelcomeFormClient";


// Pull in everything you need from the DB + any file‐upload field:
export type WelcomeInput = Pick<
  WelcomeContent,
  | 'title'
  | 'subtitle'
  | 'contentTitle'
  | 'contentSubtitle'
  | 'imageSrc'
  | 'imageTitle'    // new field
  | 'updatedAt'     // meta‐field
> & {
  imageFile?: FileList
}


// 1) Server Action
export async function onSubmitAction(values: WelcomeInput) {
    'use server'
    console.log('Received form data:', values)
}



async function EditWelcomeSection() {
    const record = await prisma.welcomeContent.findFirst()
    if (!record) throw new Error('No welcome section found')

    // Pick only the props your form needs
    const initialData: WelcomeInput = {
        title: record.title,
        subtitle: record.subtitle,
        contentTitle: record.contentTitle,
        contentSubtitle: record.contentSubtitle,
        imageSrc: record.imageSrc,
        imageTitle: record.imageTitle,
        updatedAt: record.updatedAt,
    }


    if (!initialData) {
        return <p className="p-8 text-center">Loading…</p>
    }


    return (
        <WelcomeFormClient initialData={initialData} onSubmitAction={onSubmitAction} />
    )
}


export default EditWelcomeSection;

