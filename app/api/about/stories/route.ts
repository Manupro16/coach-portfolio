import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const CreateStorySchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i, 'Slug must be URL friendly (letters, numbers, hyphens)'),
  title: z.string().trim().min(1, 'Title is required'),
  body: z.string().trim().min(1, 'Body is required'),
  order: z.number().int().min(0).optional().default(0),
})

export async function GET() {
  try {
    const stories = await prisma.aboutStory.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(stories, { status: 200 })
  } catch (error) {
    console.error('Error fetching about stories:', error)
    return new NextResponse('Failed to fetch about stories', { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ error: 'Only application/json is supported' }, { status: 415 })
    }

    const body = await request.json()
    const parsed = CreateStorySchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json({ errors: parsed.error.errors }, { status: 400 })
    }

    const { slug, title, body: storyBody, order } = parsed.data

    // Ensure unique slug
    const existing = await prisma.aboutStory.findUnique({ where: { slug } })
    if (existing) {
      return NextResponse.json({ error: 'A story with this slug already exists' }, { status: 409 })
    }

    const created = await prisma.aboutStory.create({
      data: {
        slug,
        title,
        body: storyBody,
        order: order ?? 0,
      },
    })

    return NextResponse.json(created, { status: 201 })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 })
    }
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
