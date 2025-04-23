// app/api/homePage/welcomeSection/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { cloudinary } from '@/lib/cloudinary';
import { CloudinaryUploadResponse } from '@/lib/cloudinary';

// Validation schema including required imageTitle
const WelcomeSectionTextSchema = z
  .object({
    title:           z.string().trim().min(1).max(100).optional(),
    subtitle:        z.string().trim().max(200).optional(),
    contentTitle:    z.string().trim().min(1).max(100).optional(),
    contentSubtitle: z.string().trim().max(200).optional(),
    imageTitle:      z.string().trim().min(1, 'Image title is required').max(150),
  })
  .refine(
    (data) => Object.values(data).some((v) => v !== undefined),
    { message: 'At least one text field or imageTitle must be provided' }
  );

export async function PUT(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';
    let title: string | undefined;
    let subtitle: string | undefined;
    let contentTitle: string | undefined;
    let contentSubtitle: string | undefined;
    let imageTitle: string | undefined;
    let imageFile: File | undefined;

    // Handle JSON payloads
    if (contentType.includes('application/json')) {
      const body = await request.json();
      const result = WelcomeSectionTextSchema.safeParse(body);
      if (!result.success) {
        return NextResponse.json({ errors: result.error.errors }, { status: 400 });
      }
      ({ title, subtitle, contentTitle, contentSubtitle, imageTitle } = result.data);

    // Handle multipart/form-data for file uploads
    } else if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      title           = form.get('title')?.toString();
      subtitle        = form.get('subtitle')?.toString();
      contentTitle    = form.get('contentTitle')?.toString();
      contentSubtitle = form.get('contentSubtitle')?.toString();
      imageTitle      = form.get('imageTitle')?.toString();
      imageFile       = form.get('image') instanceof File ? (form.get('image') as File) : undefined;

      const result = WelcomeSectionTextSchema.safeParse({
        title,
        subtitle,
        contentTitle,
        contentSubtitle,
        imageTitle,
      });
      if (!result.success) {
        return NextResponse.json({ errors: result.error.errors }, { status: 400 });
      }
      ({ title, subtitle, contentTitle, contentSubtitle, imageTitle } = result.data);

    } else {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 });
    }

    // Image validation and upload
    let imageSrc: string | undefined;
    if (imageFile && imageFile.size > 0) {
      const allowed = ['image/jpeg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024;
      if (!allowed.includes(imageFile.type)) {
        return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
      }
      if (imageFile.size > maxSize) {
        return NextResponse.json({ error: 'Image too large (max 5MB)' }, { status: 400 });
      }
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const base64 = buffer.toString('base64');
      const dataUri = `data:${imageFile.type};base64,${base64}`;
      const uploadRes = (await cloudinary.uploader.upload(dataUri, {
        folder: 'welcome-section',
        overwrite: true,
      })) as CloudinaryUploadResponse;
      imageSrc = uploadRes.secure_url;
    }

    // Build update payload
    const updateData: Record<string, string | undefined> = {};
    if (title !== undefined)           updateData.title           = title;
    if (subtitle !== undefined)        updateData.subtitle        = subtitle;
    if (contentTitle !== undefined)    updateData.contentTitle    = contentTitle;
    if (contentSubtitle !== undefined) updateData.contentSubtitle = contentSubtitle;
    if (imageTitle !== undefined)      updateData.imageTitle      = imageTitle;
    if (imageSrc !== undefined)        updateData.imageSrc        = imageSrc;

    // Prevent empty updates
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'You must send at least one text field, an imageTitle, or an image to update.' },
        { status: 400 }
      );
    }

    const updated = await prisma.welcomeContent.updateMany({
      where: {},
      data: updateData,
    });
    if (updated.count === 0) {
      return NextResponse.json({ error: 'No welcome section found to update.' }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// npx @prisma/ppg-tunnel --host 127.0.0.1 --port 52604