import {prisma} from '@/lib/prisma';
import {type zodShowcaseInput} from "@/app/admin/edit/home/showcase/schema";
import React from "react";
import ShowcaseFormClient from "@/app/admin/edit/home/showcase/ShowcaseFormClient";
import {zodWelcomeInput} from "@/app/admin/edit/home/welcome/schema";


export async function onSubmitAction(raw: any) {
    'use server';
    console.log('Form submitted:', raw);

}


async function EditShowcaseSection() {
    const records = await prisma.showcaseVideo.findMany()

    if (records.length === 0)
        throw new Error('No showcase videos found');

    const initialData: zodShowcaseInput[] = records.map((r) => ({
        team: r.team,
        season: r.season,
        date: r.date,
        videoSrc: r.videoSrc,
        description: r.description,
        updatedAt: r.updatedAt,
    }))

    return (
        <ShowcaseFormClient initialData={initialData} onSubmitAction={onSubmitAction} />
    )


}


export default EditShowcaseSection

