// app/api/homePage/welcomeSection/route.ts

import {NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';
import {Prisma} from "@prisma/client";


export async function GET() {
  try {
    const welcomeSectionData = await prisma.welcomeContent.findFirst();

    if (!welcomeSectionData) {
      return new NextResponse("", { status: 204 });
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
    const title = formData.get('title')?.toString().trim() || "";
    const subtitle = formData.get('subtitle')?.toString().trim() || ""
    const imageSrc = formData.get('imageSrc')?.toString().trim() || "";
    const contentSubtitle = formData.get('contentSubtitle')?.toString().trim() || "";
    const contentTitle = formData.get('contentTitle')?.toString().trim() || "";

    // Basic validation
    if (!title || !imageSrc || !subtitle ||!contentSubtitle ||!contentTitle) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const prismaData: Prisma.WelcomeContentCreateInput = {
      title: title,
      subtitle: subtitle,
      imageSrc: imageSrc,
      contentSubtitle: contentSubtitle,
      contentTitle: contentTitle,
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
    const formData = await req.formData();
    // Extract form fields from the FormData object
    const id = formData.get('id')?.toString();
    const title = formData.get('title')?.toString();
    const subtitle = formData.get('subtitle')?.toString();
    const imageSrc = formData.get('imageSrc')?.toString();

    if (!id) {
      return NextResponse.json({ error: 'ID is required for updating.' }, { status: 400 });
    }

    const updatedRecord = await prisma.welcomeContent.update({
      where: { id: Number(id) }, // Convert the id to a number
      data: {
        title: title ?? undefined,
        subtitle: subtitle ?? undefined,
        imageSrc: imageSrc ?? undefined,
      },
    });

    return NextResponse.json(updatedRecord, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
