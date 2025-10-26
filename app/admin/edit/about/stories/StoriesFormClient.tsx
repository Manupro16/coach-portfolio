'use client'

import EditForm, {type FieldConfig, type FieldKind} from '@/app/admin/edit/components/EditForm'
import { TextFieldRenderer, MarkdownRenderer, type RendererProps } from '@/app/admin/edit/components/renderers'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { storySchema, type StoryInput, type StoryOutput } from './schema'

const fields: FieldConfig<StoryInput>[] = [
  { kind: 'text', name: 'title', label: 'Title' },
  { kind: 'text', name: 'subtitle', label: 'Subtitle' },
  { kind: 'text', name: 'slug', label: 'Slug (optional, auto from title if empty)' },
  { kind: 'text', name: 'order', label: 'Order (0..999)' },
  { kind: 'markdown', name: 'body', label: 'Story Body (Markdown supported)' },
]

type StoriesRenderer = React.FC<RendererProps<StoryInput>>

const COMPONENT_MAP: Record<FieldKind, StoriesRenderer> = {
  text: TextFieldRenderer,
  markdown: MarkdownRenderer,
  image: () => null,
  imageArray: () => null,
  video: () => null,
  date: () => null,
}

interface Props {
  initialData: StoryInput
  onSubmitAction: (values: StoryOutput) => Promise<void>
}

const resolver = zodResolver(storySchema)

export default function StoriesFormClient({ initialData, onSubmitAction }: Props) {
  return (
    <EditForm<StoryInput, StoryOutput>
      fields={fields}
      componentMap={COMPONENT_MAP}
      initialData={initialData}
      onSubmit={onSubmitAction}
      title="Edit About Story"
      resolver={resolver}
    />
  )
}
