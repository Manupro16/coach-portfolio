import { prisma } from '@/lib/prisma'
import React from 'react'
import WelcomeFormClient from '@/app/admin/edit/home/welcome/WelcomeFormClient'
import { type zodWelcomeInput, welcomeSchema } from '@/app/admin/edit/home/welcome/schema'
import { cloudinary } from '@/lib/cloudinary'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

// 1) Server Action
export async function onSubmitAction(raw: zodWelcomeInput) {
  'use server'

  // Validate
  const data = welcomeSchema.parse(raw)

  // Handle optional image upload
  let imageSrc = (data.imageSrc ?? '').trim()
  const file = Array.isArray(data.imageFile) ? data.imageFile[0] : undefined

  if (file) {
    const ALLOWED = ['image/jpeg', 'image/png', 'image/webp']
    if (!ALLOWED.includes(file.type)) throw new Error('Invalid file type')
    if (file.size > 5 * 1024 * 1024) throw new Error('File exceeds 5 MB')

    const buffer = Buffer.from(await file.arrayBuffer())
    const base64 = buffer.toString('base64')
    const dataUri = `data:${file.type};base64,${base64}`
    const upload = await cloudinary.uploader.upload(dataUri, {
      folder: 'coach-portfolio/home-welcome',
      overwrite: true,
    })
    imageSrc = upload.secure_url
  } else if (imageSrc.startsWith('blob:')) {
    // Ignore blob preview URLs when no real upload occurred
    imageSrc = ''
  }

  await prisma.welcomeContent.upsert({
    where: { id: 1 },
    update: {
      title: data.title.trim(),
      subtitle: data.subtitle.trim(),
      contentTitle: data.contentTitle.trim(),
      contentSubtitle: data.contentSubtitle.trim(),
      imageTitle: data.imageTitle.trim(),
      imageSrc: imageSrc,
    },
    create: {
      id: 1, // enforce singleton id
      title: data.title.trim(),
      subtitle: data.subtitle.trim(),
      contentTitle: data.contentTitle.trim(),
      contentSubtitle: data.contentSubtitle.trim(),
      imageTitle: data.imageTitle.trim(),
      imageSrc: imageSrc,
    },
  })

  revalidatePath('/')
  redirect('/')
}

async function EditWelcomeSection() {
  const record = await prisma.welcomeContent.findUnique({ where: { id: 1 } })

  const initialData: zodWelcomeInput = {
    title: record?.title ?? '',
    subtitle: record?.subtitle ?? '',
    contentTitle: record?.contentTitle ?? '',
    contentSubtitle: record?.contentSubtitle ?? '',
    imageSrc: record?.imageSrc ?? '',
    imageTitle: record?.imageTitle ?? '',
  }

  return <WelcomeFormClient initialData={initialData} onSubmitAction={onSubmitAction} />
}

export default EditWelcomeSection

