// app/api/homePage/welcomeSection/route.ts

import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {Prisma} from "@prisma/client";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryUploadResponse  } from '@/lib/cloudinary';


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
        const id = formData.get('id')?.toString();
        const title = formData.get('title')?.toString();
        const subtitle = formData.get('subtitle')?.toString();
        const imageSrc = formData.get('imageSrc')?.toString();

        if (!id) {
            return NextResponse.json({error: 'ID is required for updating.'}, {status: 400});
        }

        const updatedRecord = await prisma.welcomeContent.update({
            where: {id: Number(id)}, // Convert the id to a number
            data: {
                title: title ?? undefined,
                subtitle: subtitle ?? undefined,
                imageSrc: imageSrc ?? undefined,
            },
        });

        return NextResponse.json(updatedRecord, {status: 200});
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json({error: message}, {status: 500});
    }
}

// npx @prisma/ppg-tunnel --host 127.0.0.1 --port 52604

