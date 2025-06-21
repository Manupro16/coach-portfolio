import {prisma} from '@/lib/prisma';
import {type zodShowcaseInput} from "@/app/admin/edit/home/showcase/schema";
import React from "react";
import ShowcaseFormClient from "@/app/admin/edit/home/showcase/ShowcaseFormClient";


export async function onSubmitAction(raw: any) {
    'use server';
    console.log('Form submitted:', raw);

}

interface PageProps {
    params: { id: string }
}


async function EditShowcaseSection({params}: PageProps) {
    const record = await prisma.showcaseVideo.findUnique({
        where: {id: parseInt(params.id)},
    });

    if (!record) throw new Error('Video not found');

    const initialData: zodShowcaseInput = {
        team: record.team,
        season: record.season,
        date: record.date,
        videoSrc: record.videoSrc,
        description: record.description,
        updatedAt: record.updatedAt,
    };

    return (
        <ShowcaseFormClient
            initialData={initialData}
            onSubmitAction={onSubmitAction}
        />
    );
}


export default EditShowcaseSection

