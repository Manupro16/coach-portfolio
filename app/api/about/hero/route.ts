import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { cloudinary } from '@/lib/cloudinary'

// Schema for JSON payload creation (URLs only)
const AboutHeroCreateJsonSchema = z.object({
  title: z.string().trim().min(1, 'Title is required'),
  nickname: z.string().trim().optional().nullable(),
  tagline: z.string().trim().optional().nullable(),
  image1Src: z.string().url('image1Src must be a valid URL'),
  image2Src: z.string().url('image2Src must be a valid URL'),
  image3Src: z.string().url('image3Src must be a valid URL'),
})

// Allowed image mime types and size for uploads
const ALLOWED_MIME = ['image/jpeg', 'image/png', 'image/webp']
const MAX_IMAGE_SIZE = 5 * 1024 * 1024

export async function GET() {
  try {
    const hero = await prisma.aboutHero.findFirst({ where: { id: 1 } })
    if (!hero) return NextResponse.json('No Data Found!', { status: 204 })
    return NextResponse.json(hero, { status: 200 })
  } catch (error) {
    console.error('Error fetching about hero:', error)
    return new NextResponse('Failed to fetch about hero data', { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Do not allow creating more than one hero record
    const existing = await prisma.aboutHero.count()
    if (existing > 0) {
      return NextResponse.json({ error: 'About hero already exists. Use the admin editor to update.' }, { status: 409 })
    }

    const contentType = request.headers.get('content-type') || ''

    // JSON path: expects URLs for images
    if (contentType.includes('application/json')) {
      const body = await request.json()
      const parsed = AboutHeroCreateJsonSchema.safeParse(body)
      if (!parsed.success) {
        return NextResponse.json({ errors: parsed.error.errors }, { status: 400 })
      }
      const { title, nickname, tagline, image1Src, image2Src, image3Src } = parsed.data

      const created = await prisma.aboutHero.create({
        data: {
          title,
          nickname: nickname || undefined,
          tagline: tagline || undefined,
          image1Src,
          image2Src,
          image3Src,
        },
      })
      return NextResponse.json(created, { status: 201 })

      // multipart/form-data path: accepts files and/or fallback URLs
    } else if (contentType.includes('multipart/form-data')) {
      const form = await request.formData()
      const title = form.get('title')?.toString() || ''
      const nickname = form.get('nickname')?.toString() || undefined
      const tagline = form.get('tagline')?.toString() || undefined

      // Files
      const image1File = form.get('image1') instanceof File ? (form.get('image1') as File) : undefined
      const image2File = form.get('image2') instanceof File ? (form.get('image2') as File) : undefined
      const image3File = form.get('image3') instanceof File ? (form.get('image3') as File) : undefined

      // Optional fallback URLs if not sending files
      let image1Src = form.get('image1Src')?.toString()
      let image2Src = form.get('image2Src')?.toString()
      let image3Src = form.get('image3Src')?.toString()

      if (!title.trim()) return NextResponse.json({ error: 'Title is required' }, { status: 400 })

      // Helper to upload an image file if provided
      const uploadIfNeeded = async (file?: File): Promise<string | undefined> => {
        if (!file) return undefined
        if (!ALLOWED_MIME.includes(file.type)) {
          throw new Error('Invalid image format')
        }
        if (file.size > MAX_IMAGE_SIZE) {
          throw new Error('Image too large (max 5MB)')
        }
        const buffer = Buffer.from(await file.arrayBuffer())
        const base64 = buffer.toString('base64')
        const dataUri = `data:${file.type};base64,${base64}`
        const uploadRes = await cloudinary.uploader.upload(dataUri, {
          folder: 'about-hero',
          overwrite: true,
        })
        return uploadRes.secure_url
      }

      // Upload provided files
      const [u1, u2, u3] = await Promise.all([
        uploadIfNeeded(image1File),
        uploadIfNeeded(image2File),
        uploadIfNeeded(image3File),
      ])

      image1Src = u1 || image1Src
      image2Src = u2 || image2Src
      image3Src = u3 || image3Src

      // Ensure we have all three image sources one way or another
      if (!image1Src || !image2Src || !image3Src) {
        return NextResponse.json(
          { error: 'You must provide image1, image2, image3 files or their image1Src/image2Src/image3Src URLs.' },
          { status: 400 },
        )
      }

      const created = await prisma.aboutHero.create({
        data: {
          title: title.trim(),
          nickname,
          tagline,
          image1Src,
          image2Src,
          image3Src,
        },
      })

      return NextResponse.json(created, { status: 201 })
    }

    return NextResponse.json({ error: 'Unsupported content type' }, { status: 415 })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 })
    }
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
