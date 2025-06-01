import {prisma} from '@/lib/prisma';
import {NextResponse} from "next/server";
import { cloudinary } from '@/lib/cloudinary';

export async function GET() {
    try {
        const showcaseSectionData = await prisma.showcaseVideo.findMany()

        if (showcaseSectionData.length === 0) {
             return NextResponse.json({ message: "No data found." }, { status: 200 });
        }

        return NextResponse.json(showcaseSectionData, {status: 200})
    } catch (error) {
        console.error('Error fetching coaching stories:', error);
        return new NextResponse("Failed to fetch showcase data", {status: 500});
    }
}


export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const team = formData.get('team') as string;
        const season = formData.get('season') as string;
        const date =  new Date('2025-06-01T15:30:00Z');
        const videoSrc = formData.get('videoSrc') as File;

        if (!team || !season || !date || !videoSrc) {
             return new NextResponse("Missing required fields", { status: 400 });
        }

        const arrayBuffer = await videoSrc.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer);


        const uploadResult = await new Promise<{secure_url: string}>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'video', folder: 'coach-portfolio/showcase' },
                (error, result) => {
                     if (error || !result) return reject(error);
                    resolve(result);
                }
            ).end(buffer)
        })

        const newEntry = await prisma.showcaseVideo.create({
            data: {
                team, season, date, videoSrc: uploadResult.secure_url
            }
        })


        return NextResponse.json(newEntry, { status: 201 });
    } catch (error) {
        console.error('Error uploading video:', error);
        return new NextResponse("Video upload failed", { status: 500 });
    }
}
