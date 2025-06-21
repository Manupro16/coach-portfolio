import {prisma} from '@/lib/prisma';
import {type zodShowcaseInput} from "@/app/admin/edit/home/showcase/schema";
import React from "react";
import ShowcaseFormClient from "@/app/admin/edit/home/showcase/ShowcaseFormClient";




export async function onSubmitAction(raw: any) {
    'use server';
    console.log('Form submitted:', raw);

}


async function EditShowcaseSection() {
    const record = await prisma.showcaseVideo.findFirst()
    if (!record) throw new Error('No welcome section found')


    const initialData: zodShowcaseInput = {
        team: record.team,
        season: record.season,
        date: record.date,
        videoSrc: record.videoSrc,
        description: record.description,
        updatedAt: record.updatedAt,
    }

    if (!initialData) {
        return <p className="p-8 text-center">Loading…</p>
    }

    return (
        <ShowcaseFormClient initialData={initialData} onSubmitAction={onSubmitAction} />
    )



}


export default EditShowcaseSection

