// admin/edit/home/showcase/[id]/page.tsx

import {prisma} from '@/lib/prisma';
import {showcaseSchema, type zodShowcaseInput} from "@/app/admin/edit/home/showcase/schema";
import React from "react";
import ShowcaseFormClient from "@/app/admin/edit/home/showcase/ShowcaseFormClient";
import {cloudinary} from "@/lib/cloudinary";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

async function uploadVideo(file: File): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer());

    return new Promise<string>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {resource_type: 'video', folder: 'coach-portfolio/showcase'},
            (error, result) => {
                if (error || !result) return reject(error);
                resolve(result.secure_url);
            },
        ).end(buffer);
    });
}


export async function onSubmitAction(raw: zodShowcaseInput) {
    'use server';


    const data = showcaseSchema.parse(raw);

    let videoUrl = data.videoSrc; // keep existing by default

    if (data.videoFile && Array.isArray(data.videoFile) && data.videoFile.length > 0) {
        const file = data.videoFile[0];
        videoUrl = await uploadVideo(file)
    }

    await prisma.showcaseVideo.update({
        where: {id: data.id},
        data: {
            team: data.team,
            season: data.season,
            date: data.date,
            description: data.description,
            videoSrc: videoUrl,
            updatedAt: new Date()
        }
    })

    revalidatePath('/')
    redirect('/')

}

interface PageProps {
    params: Promise<{ id: string }>
}


async function EditShowcaseSection({params}: PageProps) {
    const {id} = await params
    const record = await prisma.showcaseVideo.findUnique({
        where: {id: Number(id)},
    });

    if (!record) throw new Error('Video not found');

    const initialData: zodShowcaseInput = {
        id: record.id,
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

