// app/api/homePage/welcomeSection/route.ts

import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import { z } from 'zod';
import {Prisma} from "@prisma/client";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryUploadResponse  } from '@/lib/cloudinary';

const welcomeSectionSchema = z.object({
    title: z.string().min(10),
    subtitle: z.string().min(10),
    contentTitle: z.string().min(10),
    contentSubtitle: z.string().min(10),
}).refine((obj) => Object.keys(obj).length === 0,{ message: 'At least one text field must be present to update' });;


export async function GET() {
    try {
        const welcomeSectionData = await prisma.welcomeContent.findFirst();

        if (!welcomeSectionData) {
            return new NextResponse("", {status: 204});
        }

        return NextResponse.json(welcomeSectionData, {status: 200});
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        return new NextResponse(JSON.stringify({error: message}), {status: 500});
    }
}


export async function PUT(req: Request) {
    try {
        const formData = await req.formData();
        // Extract form fields from the FormData object
        const title = formData.get('title')?.toString();
        const subtitle = formData.get('subtitle')?.toString();
        const imageSrc = formData.get('imageSrc')?.toString();
        const contentTitle = formData.get('contentTitle')?.toString();
        const contentSubtitle = formData.get('contentSubtitle')?.toString();



} catch (error: unknown) {
    const message = error instanceof Error? error.message : 'Unknown error occurred';
    return new NextResponse(JSON.stringify({error: message}), {status: 500});}
}

// npx @prisma/ppg-tunnel --host 127.0.0.1 --port 52604

