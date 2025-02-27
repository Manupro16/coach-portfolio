// app/api/homePage/welcomeSection/route.ts

import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {Prisma} from "@prisma/client";


export async function GET() {
  try {
    const welcomeSectionData = await prisma.welcomeContent.findFirst();

    if (!welcomeSectionData) {
      return new NextResponse(null, { status: 204 });
    }

    return NextResponse.json(welcomeSectionData, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return new NextResponse(JSON.stringify({ error: message }), { status: 500 });
  }
}



export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title')?.toString();
    const subtitle = formData.get('subtitle')?.toString() || null; // Store null if not provided
    const imageUrl = formData.get('imageUrl')?.toString();

    // Basic validation
    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and imageUrl are required.' },
        { status: 400 }
      );
    }

    const prismaData: Prisma.WelcomeContentCreateInput = {
      title,
      subtitle,
      imageUrl,
    };

    await prisma.welcomeContent.create({ data: prismaData });

    return new NextResponse(
      JSON.stringify({ message: 'Welcome content created successfully' }),
      { status: 201 }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: `Internal Server Error: ${message}` }, { status: 500 });
  }
}


export async function PUT(req: Request) {
  try {
    const body = await req.json();
    // Ensure the body includes an id and the fields to update.
    const { id, title, subtitle, imageUrl } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required for updating.' }, { status: 400 });
    }

    const updatedRecord = await prisma.welcomeContent.update({
      where: { id: Number(id) }, // Convert id to number if necessary
      data: {
        // Only update fields if provided; you can adjust validation as needed.
        title: title ?? undefined,
        subtitle: subtitle ?? undefined,
        imageUrl: imageUrl ?? undefined,
      },
    });

    return NextResponse.json(updatedRecord, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}