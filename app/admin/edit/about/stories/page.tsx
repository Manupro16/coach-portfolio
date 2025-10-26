import React from 'react'
import { prisma } from '@/lib/prisma'
import StoriesFormClient from './StoriesFormClient'
import { storySchema, type StoryInput, type StoryOutput } from './schema'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function onSubmitAction(raw: StoryOutput) {
  'use server'

  const data = storySchema.parse(raw) as StoryOutput

  await prisma.aboutStory.upsert({
    where: { slug: data.slug },
    update: {
      title: data.title.trim(),
      subtitle: data.subtitle.trim() || null,
      body: data.body,
      order: data.order,
      // published: keep current value
    },
    create: {
      slug: data.slug,
      title: data.title.trim(),
      subtitle: data.subtitle.trim() || null,
      body: data.body,
      order: data.order,
      published: true,
    },
  })

  revalidatePath('/about')
  redirect('/about')
}

interface PageProps {
  searchParams?: { slug?: string }
}

export default async function EditAboutStories({ searchParams }: PageProps) {
  const slug = searchParams?.slug?.toString()

  let initialData: StoryInput

  if (slug) {
    const story = await prisma.aboutStory.findUnique({ where: { slug } })
    if (story) {
      initialData = {
        slug: story.slug,
        title: story.title,
        subtitle: story.subtitle ?? '',
        body: story.body,
        order: story.order,
      }
    } else {
      // Pre-fill with provided slug if creating new
      initialData = {
        slug,
        title: '',
        subtitle: '',
        body: '',
        order: 0,
      }
    }
  } else {
    // New story defaults
    const agg = await prisma.aboutStory.aggregate({ _max: { order: true } })
    const nextOrder = (agg._max.order ?? -1) + 1
    initialData = {
      slug: '',
      title: '',
      subtitle: '',
      body: '',
      order: nextOrder,
    }
  }

  return <StoriesFormClient initialData={initialData} onSubmitAction={onSubmitAction} />
}
