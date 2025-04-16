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


export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        // Retrieve form values
        const title = formData.get('title')?.toString().trim() || "";
        const subtitle = formData.get('subtitle')?.toString().trim() || "";
        const contentSubtitle = formData.get('contentSubtitle')?.toString().trim() || "";
        const contentTitle = formData.get('contentTitle')?.toString().trim() || "";


        // Basic validation
        if (!title || !subtitle || !contentSubtitle || !contentTitle) {
            return NextResponse.json(
                {error: 'All fields are required.'},
                {status: 400}
            );
        }

        // Retrieve the image file from the form. We assume the file input name is "image".
        const file = formData.get('image');
        if (!file || !(file instanceof Blob)) {
            return NextResponse.json({error: 'Image file is required.'}, {status: 400});
        }

        // Convert the Blob into a Buffer so it can be streamed.
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Use Cloudinary's upload_stream to handle file uploads via a stream.
        const streamUpload = (buffer: Buffer): Promise<CloudinaryUploadResponse> => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {folder: "/pic"}, // Optional: store in a specific folder.
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(buffer);
            });
        };

        const uploadResult = await streamUpload(buffer);
        if (!uploadResult || !uploadResult.secure_url) {
            return NextResponse.json({error: 'Image upload failed.'}, {status: 500});
        }

        const prismaData: Prisma.WelcomeContentCreateInput = {
            title: title,
            subtitle: subtitle,
            imageSrc: uploadResult.secure_url,
            contentSubtitle: contentSubtitle,
            contentTitle: contentTitle,
        };

        await prisma.welcomeContent.create({data: prismaData});

        return NextResponse.json(
            {message: 'Welcome content created successfully', imageUrl: uploadResult.secure_url},
            {status: 201}
        );

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json({error: `Internal Server Error: ${message}`}, {status: 500});
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
